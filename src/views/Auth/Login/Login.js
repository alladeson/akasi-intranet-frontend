import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }
      return this.$store.state.auth.user;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: "dashboard" });
    }
  },
  methods: {
    //In the handleLogin() function, we dispatch 'auth/login' Action to Vuex Store.
    //If the login is successful, go to Profile Page, otherwise, show error message.
    handleLogin(formulaireLogin) {
      this.loading = true;
      this.$store.dispatch("auth/login", formulaireLogin).then(
        //auth.login du module (auth.module.js) est attaché ici
        () => {
          //Obtenir le user courant
          let user = null;
          this.$store.dispatch("auth/currentUserRemote", user).then(
            //auth.login du module (auth.module.js) est attaché ici
            () => {
              /*               this.$router.push({ name: "dashboard" });
               */ window.location.replace("/dashboard");
            },
            (error) => {
              this.loading = false;
              this.message = "Mauvaise combinaison, veuillez réessayer !";
              this.$store.dispatch("auth/logout"); //Déconnecter si le current user n'est pas récupérable
            }
          );
        },
        (error) => {
          this.loading = false;
          if (error.toString().includes("Network Error")) {
            this.message = "Mauvaise combinaison, veuillez réessayer !";
          } else {
            //backend retourne erreur 400 lorsque les credentials ne sont pas corrects. OAuthServerException/invalidCredentials
            if (
              (error.response && error.response.status == "400") ||
              (error.response.data &&
                error.response.data.error == "invalid_grant")
            ) {
              this.message =
                "Votre courriel ou votre mot de passe est incorrect. veuillez réessayer !";
            } else {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            }
          }
        }
      );
    },
  },
};
