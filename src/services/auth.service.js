/**
 ******* LOGIQUE VERS LE BACKEND API *******
 * Authentication service
 * The service provides three important methods with the help of axios for HTTP requests & reponses: login, logout, register
 */
import axios from 'axios';
import ajaxHeaders from './ajax-headers';
class AuthService {
    apiUrlLogin = import.meta.env.VITE_API_URL_TENANT+'/auth/login';
    apiUrlLogout = import.meta.env.VITE_API_URL_TENANT+'/auth/logout';
    apiUrlRegister = import.meta.env.VITE_API_URL_TENANT+'/tenants';
    apiUrlCurrentUser = import.meta.env.VITE_API_URL_TENANT+'/auth/user_current';
    
    login(user) {
        return axios
                .post(this.apiUrlLogin, {
                    email: user.email,
                    password: user.password,
                    /* grant_type: "password",
                    client_id: import.meta.env.VITE_API_CLIENT_ID,
                    client_secret: import.meta.env.VITE_API_CLIENT_SECRET,
                    scope:"*",  */                   
                }, 
                {
                    headers: ajaxHeaders()
                })
                .then(response => {
                    if (response.data.access_token) {
                        localStorage.setItem('data_token', JSON.stringify(response.data));
                    }
                    return response.data;
                });
    }
    
    logout(serveur=true) {
        localStorage.removeItem('user');
        //Déconnexion serveur
        const reponse = null;
        if(serveur){
            const reponse = axios.post(this.apiUrlLogout, {}, {headers: ajaxHeaders()});
        }
        localStorage.removeItem('data_token');
        return reponse;
    }
    
    register(user) {
        return axios.post(this.apiUrlRegister, {
            username: user.username,
            email: user.email,
            password: user.password
        }, 
        {
            headers: ajaxHeaders()
        });
    }
    
    currentUserRemote(user) {
        return axios.get(this.apiUrlCurrentUser, {
            headers: ajaxHeaders()
        })
        .then(response => {
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }
}
export default new AuthService();