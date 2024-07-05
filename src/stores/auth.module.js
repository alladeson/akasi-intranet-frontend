/**
 ******* LIEN ENTRE SERVICES ET LES COMPONENTS *******
 * Authentication module
 */
import AuthService from '../services/auth.service';
const dataToken = JSON.parse(localStorage.getItem('data_token'));
const initialState = dataToken
        ? {status: {loggedIn: true}, dataToken}
: {status: {loggedIn: false}, dataToken: null};
export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login( { commit }, formulaireLogin) {
            return AuthService.login(formulaireLogin).then(
                    dataToken => {
                        commit('loginSuccess', dataToken);   //Mets à jour l'état
                        //La méthode Promise.resolve(valeur) renvoie un objet Promise qui est résolu avec la valeur donnée. 
                        //Si cette valeur est une promesse, la promesse est renvoyée, si la valeur possède une méthode then, 
                        //la promesse renvoyée « suivra » cette méthode et prendra son état ; sinon, la promesse renvoyée 
                        //sera tenue avec la valeur.
                        return Promise.resolve(dataToken);
                    },
                    error => {
                        commit('loginFailure');
                        return Promise.reject(error);
                    }
            );
        },
        logout( { commit }) {
            AuthService.logout();
            commit('logout');
        },
        register( { commit }, user) {
            return AuthService.register(user).then(
                    response => {
                        commit('registerSuccess');
                        return Promise.resolve(response.data);
                    },
                    error => {
                        commit('registerFailure');
                        return Promise.reject(error);
                    }
            );
        },
        currentUserRemote( { commit }, user) {
            return AuthService.currentUserRemote(user).then(
                    user_current => {
                        commit('currentUserSuccess', user_current);
                        return Promise.resolve(user_current);
                    },
                    error => {
                        commit('currentUserFailure');
                        return Promise.reject(error);
                    }
            );
        }
    },
    mutations: {
        loginSuccess(state, dataToken) {
            state.status.loggedIn = true;
            state.data_token = dataToken;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.data_token = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.data_token = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        currentUserSuccess(state, user) {
            state.user = user;
        },
        currentUserFailure(state) {
            state.user = null;
        },
    }
};