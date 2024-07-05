import DataService from "@/services/BackOffice/Filiere/ChaineValeurEtape/ChaineValeurEtapeDataService";
import BackOfficeLayoutClusterSlot from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import AgBaseBlocRechercheComponent from "@/components/Form/Field/AgBaseBlocRechercheComponent.vue";
import AgBaseButtonAddComponent from "@/components/Form/Button/AgBaseButtonAddComponent.vue";
import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import AgBaseTableButtonShowComponent from '@/components/Table/AgBaseTableButtonShowComponent.vue'

import { useRoute } from 'vue-router';

export default {
    name: "ChaineValeurEtapeListView",
    components: {
        BackOfficeLayoutClusterSlot,
        BreadcrumbClusterComponent,
        AgBaseBlocRechercheComponent,
        AgBaseButtonAddComponent,
        ConfirmerSuppressionComponent,
        AlertMessageComponent,
        AgBaseTableButtonShowComponent,
    },
    data() {
        return {
            confirmationSuppressionMessage: "Êtes-vous sûr de vouloir supprimer l'item ?",
            //
            alert: {
                alertErreur: "",
                alertSucces: "",
                alerteInfo: "",
                alerteAvertissement: "",
            },
            bdObjets: [],
            colonnesTable: {},
            isLoadingTable: true,
            uuid: "",
            chaine_valeurs: [],
            chaine_valeur_id: null,
            boutonsAction: [],
            listeBreadcrumbs: [
                { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
                { texte: "Chaînes de valeur", nomRoute: "filiere.chaine_valeurs.list", parametres: {} },
                { texte: "Étapes", nomRoute: "", parametres: {} },
            ],
        };
    },
    methods: {
        obtenirListe() {
            DataService.getAll(this.chaine_valeur_id)
                .then(response => {
                    this.bdObjets = response.data.data;
                    this.isLoadingTable = false;
                    this.colonnesTable = response.data.colonnesTableAffichable
                })
                .catch(e => {});
        },
        setUuid(uuid) {
            this.uuid = uuid;
        },
        deleteDonnee() {
            DataService.delete(this.uuid)
                .then(response => {
                    this.$refs.refAfficherSuppressionModale.fermerModale();
                    this.refreshList();
                })
                .catch(e => {});
        },
        refreshList() {
            this.obtenirListe();
        },
        setAlertesMessage() {
            const route = useRoute();
            this.alert.alertErreur = (route.query.alertErreur ? route.query.alertErreur : "");
            this.alert.alertSucces = (route.query.alertSucces ? route.query.alertSucces : "");
            this.alert.alerteInfo = (route.query.alerteInfo ? route.query.alerteInfo : "");
            this.alert.alerteAvertissement = (route.query.alerteAvertissement ? route.query.alerteAvertissement : "");

            this.$refs.refAlerteMessage.setAlerteMessageErreur(this.alert.alertErreur);
            this.$refs.refAlerteMessage.setAlerteMessageSucces(this.alert.alertSucces);
            this.$refs.refAlerteMessage.setAlerteMessageInfo(this.alert.alerteInfo);
            this.$refs.refAlerteMessage.setAlerteMessageAvertissement(this.alert.alerteAvertissement);

            //this.nettoyerAlertesMessageUrl();
        },
        nettoyerAlertesMessageUrl() {
            this.$router.replace({ 'alertErreur': null });
            this.$router.replace({ 'alertSucces': null });
            this.$router.replace({ 'alerteInfo': null });
            this.$router.replace({ 'alerteAvertissement': null });
        },
        obtenirChaineValeurs() {
            DataService.getChaineValeurs()
                .then(response => {
                    this.chaine_valeurs = response.data.data;
                })
                .catch(e => {});
        },
        chaineValeurOnChange() {
            this.$router.replace({ name: 'filiere.chaine_valeur_etapes.list', query: { chaine_valeur_id: this.chaine_valeur_id } });
            this.isLoadingTable = true;
            this.bdObjets = [];
            this.refreshList();
        },
        rechercheObjets() {
            return;
            DataService.recherche("")
                .then(response => {
                    this.bdObjets = response.data.data;
                })
                .catch(e => {});
        },
    },
    mounted() {
        const route = useRoute();
        this.chaine_valeur_id = route.query.chaine_valeur_id
        this.setAlertesMessage();

        this.obtenirChaineValeurs();
        this.refreshList();
    },
};