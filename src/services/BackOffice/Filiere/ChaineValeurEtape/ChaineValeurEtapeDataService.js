/**
 * Classe qui recapitules toutes les rquêtews vers le serveur
 * 
 * @type type
 */
import http from "@/http-common";
class ChaineValeurEtapeDataService {
    nomRoute = "chaine_valeur_etapes";
    
    /**
     * Liste
     * @returns {unresolved}
     */
    getAll(chaine_valeur_id=null) {
        let lienRoute = this.nomRoute
        if(chaine_valeur_id){
            lienRoute = this.nomRoute+"?chaine_valeur_id="+chaine_valeur_id;
        }
        return http.get("/"+lienRoute);
    }
    /**
     * Liste des étapes d'une chaîne de valeur
     * @returns {unresolved}
     */
    getChaineValeurs() {
        return http.get("/chaine_valeurs");
    }
    /**
     * Liste des sous étapes des étapes d'une chaîne de valeur
     * @returns {unresolved}
     */
    getChaineValeurEtapeDetails(chaine_valeur_etape_id) {
        return http.get("/chaine_valeur_etape_details?chaine_valeur_etape_id="+chaine_valeur_etape_id);
    }
    /**
     * Liste des attributs des sous étapes des étapes d'une chaîne de valeur
     * @returns {unresolved}
     */
    getChaineValeurEtapeDetailAttributs(chaine_valeur_etape_detail_id) {
        return http.get("/chaine_valeur_etape_detail_attrs?chaine_valeur_etape_detail_id="+chaine_valeur_etape_detail_id);
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
    updateChaineValeurEtapeDetailAttribut(uuid, data) {
        return http.put(`/chaine_valeur_etape_detail_attrs/${uuid}`, data);
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
     * @param {type} requete
     * @returns {unresolved}
     */
    recherche(requete) {
        return http.get(`/`+this.nomRoute+`?requete=${requete}`);
    }
}
export default new ChaineValeurEtapeDataService();