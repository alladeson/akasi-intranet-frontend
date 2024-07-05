import axios from "axios";
import AuthService from "@/services/auth.service";

//https://forum.vuejs.org/t/add-header-token-to-axios-requests-after-login-action-in-vuex/38834
const ajax = axios.create({
  baseURL: import.meta.env.VITE_API_URL_TENANT,
});

ajax.CancelToken = axios.CancelToken;
ajax.isCancel = axios.isCancel;

/*
 * The interceptor here ensures that we check for the token in local storage every time an ajax request is made
 */
ajax.interceptors.request.use(
  (config) => {
    let access_token = null;
    if (localStorage.getItem("data_token")) {
      let dataToken = JSON.parse(localStorage.getItem("data_token"));
      access_token = dataToken.access_token;
    }

    config.headers["Authorization"] = `Bearer ${access_token}`;

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
ajax.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error


    //Voir le token a expiré du côté du backend : Begin
    if (error.response && error.response.status == "401") {
      if (
        error.response &&
        error.response.data &&
        error.response.data.data &&
        error.response.data.data.code == "TOKEN_EXPIRE"
      ) {
        AuthService.logout(false);
        location.reload(); //@TODO ; Il faut faire un router vers login sans reload. Le router testé avant semble créer un bug intermittent
      }
    }
    //Voir le token a expiré du côté du backend : End

    return Promise.reject(error);
  }
);
export default ajax;
