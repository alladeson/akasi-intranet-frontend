/**
 * Vuex Store that contains all modules
 * @type Store
 */
import { createStore } from "vuex";
import { auth } from "./auth.module";
const store = createStore({
    modules: {
        auth,
    },
});
export default store;