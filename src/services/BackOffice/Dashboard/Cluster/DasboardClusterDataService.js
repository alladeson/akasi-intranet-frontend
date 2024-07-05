/**
 * Classe qui recapitules toutes les rquêtews vers le serveur
 * 
 * @type type
 */
import http from "@/http-common";
class DasboardClusterDataService {
    
    /**
     * Liste
     * @returns {unresolved}
     */
    getAll() {
        return http.get("/dashboard/cluster");
    }
    
}
export default new DasboardClusterDataService();