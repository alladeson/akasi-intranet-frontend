/**
 * Classe qui recapitules toutes les rquêtews vers le serveur
 * 
 * @type type
 */
import http from "@/http-common";
class UserDataService {
    nomRoute = "users";
    
    /**
     * Liste
     * @returns {unresolved}
     */
    getAll() {
        return http.get("/"+this.nomRoute);
    }
    /**
     * Show
     * @param {type} uuid
     * @returns {unresolved}
     */
    get(uuid) {
        return http.get(`/`+this.nomRoute+`/${uuid}`);
    }
    /**
     * Liste des rôles
     * @returns {unresolved}
     */
      getRoles() {
        return http.get("/roles");
    }
    /**
     * Store
     * @param {type} data
     * @returns {unresolved}
     */
    create(data) {
        return http.post("/"+this.nomRoute, data);
    }
    /**
     * Update
     * @param {type} uuid
     * @param {type} data
     * @returns {unresolved}
     */
    update(uuid, data) {
        return http.put(`/`+this.nomRoute+`/${uuid}`, data);
    }
    /**
     * Delete
     * @param {type} uuid
     * @returns {unresolved}
     */
    delete(uuid) {
        return http.delete(`/`+this.nomRoute+`/${uuid}`);
    }
    /**
     * Recherche
     * @param {type} email
     * @returns {unresolved}
     */
    findByEmail(email) {
        return http.get(`/`+this.nomRoute+`?email=${email}`);
    }
}
export default new UserDataService();