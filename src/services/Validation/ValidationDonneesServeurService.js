/**
 * Classe qui recapitules toutes les rquêtews vers le serveur
 * 
 * @type type
 */
class ValidationDonneesServeurService {

    reInitListeChampsFormulaire(formulaireId="form-premier") {
        var formPremier = document.getElementById(formulaireId);
        var arrayInput = formPremier.getElementsByTagName("input");
        var arrayTextarea = formPremier.getElementsByTagName("textarea");
        var arraySelect = formPremier.getElementsByTagName("select");
        this.#reInitChampsFormulaire(arrayInput);
        this.#reInitChampsFormulaire(arrayTextarea);
        this.#reInitChampsFormulaire(arraySelect);
    }

    traiterStatutErreurEtRetournerMessage(e) {
        let erreurMessage = null;
        if(e.response && e.response.status && e.response.status == "422"){
            erreurMessage = this.formatMessageErreur(e);
        }else{
            erreurMessage = "Erreur lors de l'édition de l'item!";
        }
        return erreurMessage
    }
    
    formatMessageErreur(e) {
        let erreurMessage = e.response.data.message;
        if (e.response.data.errors) {
            let erreurs = e.response.data.errors;
            erreurMessage += "<ul>"
            for (var prop in erreurs) {
                erreurMessage += "<li>" + erreurs[prop] + "</li>";
                let htmlElement = document.getElementById(prop)
                if (htmlElement) {
                    htmlElement.classList.add("border", "border-danger");
                }
            }
            erreurMessage += "</ul>"
        }
        return erreurMessage;
    }

    /**
     * Fonction privée pour réutiliser dans d'autres fonctions
     */
    #reInitChampsFormulaire(arrayElements) {
        for (var cle in arrayElements) {
            let htmlElement = arrayElements[cle];
            if (htmlElement.classList) {    //Pour une raison, il y d'autres éléments qui n'ont pas de ClassList
                htmlElement.classList.remove("border", "border-danger");
            }
        }
    }
}
export default new ValidationDonneesServeurService();