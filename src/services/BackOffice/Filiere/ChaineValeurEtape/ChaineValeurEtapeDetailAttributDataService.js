/**
 * Classe qui recapitules toutes les rquêtews vers le serveur
 * 
 * @type type
 */
import http from "@/http-common";
class ChaineValeurEtapeDetailAttributDataService {
    nomRoute = "chaine_valeur_etape_detail_attrs";
    
    
    /**
     * Delete
     * @param {type} uuid
     * @returns {unresolved}
     */
    delete(uuid) {
        return http.delete(`/`+this.nomRoute+`/${uuid}`);
    }
    
}
export default new ChaineValeurEtapeDetailAttributDataService();