import DataService from "@/services/BackOffice/Acl/Permission/PermissionDataService";
import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import AgBaseTableComponent from '@/components/Table/AgBaseTableComponent.vue'
import AgBaseBlocRechercheComponent from "@/components/Form/Field/AgBaseBlocRechercheComponent.vue";
import AgBaseButtonAddComponent from "@/components/Form/Button/AgBaseButtonAddComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

import { useRoute } from 'vue-router';

export default {
    components: { 
        ConfirmerSuppressionComponent,
        AlertMessageComponent,
        BackOfficePageContent,
        AgBaseTableComponent,
        AgBaseBlocRechercheComponent,
        AgBaseButtonAddComponent,
        BreadcrumbClusterComponent,
    },
    name: "PermissionListe",
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
            titre: "",      //Pour le champ de recherche. Ne pas changer
            uuid: "",
            boutonsAction: [],
            listeBreadcrumbs: [
                {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                {texte: "Liste des permissions", nomRoute: "", parametres: {}},
            ],
        };
    },
    methods: {
        obtenirListe() {
            DataService.getAll()
                    .then(response => {
                        this.bdObjets = response.data.data;
                        this.isLoadingTable = false;
                        this.colonnesTable = response.data.colonnesTableAffichable
                    })
                    .catch(e => {
                    });
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
                    .catch(e => {
                    });
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
            this.$router.replace({'alertErreur': null});
            this.$router.replace({'alertSucces': null});
            this.$router.replace({'alerteInfo': null});
            this.$router.replace({'alerteAvertissement': null});
        },
        rechercheObjets() {
            alert(1);
            return;
            DataService.recherche(this.titre)
                    .then(response => {
                        this.bdObjets = response.data.data;
                    })
                    .catch(e => {
                    });
        },
        searchTitre() {
            DataService.findByTitre(this.titre)
                    .then(response => {
                        this.bdObjets = response.data.data;
                    })
                    .catch(e => {
                    });
        }
    },
    mounted() {
        this.setAlertesMessage();
        
        this.refreshList();
    },
};

