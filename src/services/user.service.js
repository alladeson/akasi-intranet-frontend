/**
 * Data service
 * We define a service for accessing data
 */

import axios from "axios";
import ajaxHeaders from "./ajax-headers";

class UserService {
  apiUrlUpdateProfile =
    import.meta.env.VITE_API_URL_TENANT + "/auth/update_profil";

  currentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  updateProfil(uuid, data) {
    return axios.post(this.apiUrlUpdateProfile, data, {
      headers: ajaxHeaders(),
    });
  }
}
export default new UserService();
