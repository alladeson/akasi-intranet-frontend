import DataService from "@/services/BackOffice/Filiere/ChaineValeur/ChaineValeurDataService";
import BackOfficeLayoutClusterSlot from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import AgBaseBlocRechercheComponent from "@/components/Form/Field/AgBaseBlocRechercheComponent.vue";
import AgBaseButtonAddComponent from "@/components/Form/Button/AgBaseButtonAddComponent.vue";
import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import AgBaseTableButtonEditComponent from '@/components/Table/AgBaseTableButtonEditComponent.vue'
import AgBaseTableButtonShowComponent from '@/components/Table/AgBaseTableButtonShowComponent.vue'
import AgBaseTableButtonDeleteComponent from '@/components/Table/AgBaseTableButtonDeleteComponent.vue'
import ChaineValeurProgressionComponent from '@/components/App/ChaineValeurProgressionComponent.vue'
import Paginate from 'vuejs-paginate-next';

import { useRoute } from 'vue-router';

export default {
    name: "ChaineValeurListView",
    components: {
        BackOfficeLayoutClusterSlot,
        BreadcrumbClusterComponent,
        AgBaseBlocRechercheComponent,
        AgBaseButtonAddComponent,
        ConfirmerSuppressionComponent,
        AlertMessageComponent,
        AgBaseTableButtonEditComponent,
        AgBaseTableButtonShowComponent,
        AgBaseTableButtonDeleteComponent,
        ChaineValeurProgressionComponent,
        Paginate,
    },
    data() {
        return {
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
            boutonsAction: [
                { nom: "show", nomRoute: "filiere.chaine_valeur_etapes.list", classe: "" },
                { nom: "edit", nomRoute: "filiere.chaine_valeurs.edit", classe: "" },
                { nom: "delete", nomRoute: "", classe: "" },
            ],
            listeBreadcrumbs: [
                { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
                { texte: "Chaine de valeur", nomRoute: "", parametres: {} },
            ],
            paginationMetaData: [],
            pageCourante: 1,
            queryParameterServer: "?page=1",
            pagination: { 
                parametres: {
                    pageRange: 3,
                    marginPages: 2,
                    prevText: "< Précédent",
                    nextText: "Suivant >",
                    containerClass: "pagination",
                    pageClass: "page-item",
                }
            },
        };
    },
    methods: {
        setNumeroPageOnClick(pageNum) {
            this.pageCourante = pageNum;
            this.setQueryParameters();
            this.bdObjets = [];
            this.isLoadingTable = true;
            this.refreshList();
        },
        setQueryParameters() {
            this.queryParameterServer = "?page="+this.pageCourante;
        },
        obtenirListe() {
            DataService.getAll(this.queryParameterServer)
                .then(response => {
                    this.bdObjets = response.data.data;
                    this.paginationMetaData = response.data.meta;
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

            this.nettoyerAlertesMessageUrl();
        },
        nettoyerAlertesMessageUrl() {
            this.$router.replace({ 'alertErreur': null });
            this.$router.replace({ 'alertSucces': null });
            this.$router.replace({ 'alerteInfo': null });
            this.$router.replace({ 'alerteAvertissement': null });
        },
        rechercheObjets() {
            return;
            DataService.recherche("")
                .then(response => {
                    this.bdObjets = response.data.data;
                })
                .catch(e => {});
        }
    },
    mounted() {
        document.getElementsByClassName("pagination")[0].classList.add('justify-content-end');
        this.setAlertesMessage();

        this.refreshList();
    },
};