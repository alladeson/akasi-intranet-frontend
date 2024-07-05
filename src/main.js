import { createApp } from "vue";
import { createPinia } from "pinia";

//CSS plus haut que les autres
import "./assets/css/base.css";

//Plugins CSS bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { Tooltip } from "bootstrap";
import { FontAwesomeIcon } from "./plugins/font-awesome";

//Plugins vue-select
import vSelect from "vue-select";

//Custom assets : C'est dans ce fichier qu'on va redéfinir les css du template
import "./assets/css/main.css";
import "./assets/csss/style.css";

//Custom assets: C'est dans ce fichier qu'on va redéfinir les js du template

// import "./assets/js/mainanim.js";
// import "./assets/lib/wow/wow.min.js";
// import "./assets/lib/easing/easing.min.js";
// import "./assets/lib/waypoints/waypoints.min.js";
// import "./assets/lib/owlcarousel/owl.carousel.min.js";
// import "./assets/lib/isotope/isotope.pkgd.min.js";
// import "./assets/lib/lightbox/js/lightbox.min.js";

//i18N
import { createI18n } from "vue-i18n";
import { messages } from "./plugins/lang/langue.js";

//Framework7Vue.use(createI18n);
//Create the VueI18n instance:
const i18n = new createI18n({
  locale: "fr", // set locale
  fallbackLocale: "fr",
  messages, // set locale messages
});
new Tooltip(document.body, {
  selector: "[data-bs-toggle='tooltip']",
});

import Paginate from "vuejs-paginate-next";
import App from "./App.vue";
import router from "./router";
import store from "./stores";

import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

const app = createApp(App);
// Use i18n
app.use(i18n);

app.component("EasyDataTable", Vue3EasyDataTable);

app.use(createPinia());
app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("v-select", vSelect);
app.use(Paginate);

//Begin : variable globales
//app.config.globalProperties.urlApiRacineTenant = import.meta.env.VITE_API_URL_TENANT;
//app.config.globalProperties.apiClientId = import.meta.env.VITE_API_CLIENT_ID;
//app.config.globalProperties.apiClientSecret = import.meta.env.VITE_API_CLIENT_SECRET;
//End : variable globales

app.mount("#app");
