import DataService from "@/services/BackOffice/Acl/User/UserDataService";
import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import AgBaseTableComponent from "@/components/Table/AgBaseTableComponent.vue";
import AgBaseBlocRechercheComponent from "@/components/Form/Field/AgBaseBlocRechercheComponent.vue";
import AgBaseButtonAddComponent from "@/components/Form/Button/AgBaseButtonAddComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import { useRoute } from "vue-router";
import UserTableComponent from "@/views/BackOffice/Acl/User/UserComponents/UserTableComponent.vue";
import ShowUserInfosComponent from "@/views/BackOffice/Acl/User/UserComponents/ShowUserInfosComponent.vue";

export default {
  components: {
    ConfirmerSuppressionComponent,
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseTableComponent,
    AgBaseBlocRechercheComponent,
    AgBaseButtonAddComponent,
    BreadcrumbClusterComponent,
    UserTableComponent,
    ShowUserInfosComponent,
  },
  name: "UserListe",
  data() {
    return {
      confirmationSuppressionMessage:
        "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      //
      alert: {
        alertErreur: "",
        alertSucces: "",
        alerteInfo: "",
        alerteAvertissement: "",
      },
      bdObjets: [],
      userInfos: [],
      colonnesTable: {},
      isLoadingTable: true,
      isLoadingSpinner: true,
      titre: "", //Pour le champ de recherche. Ne pas changer
      uuid: "",
      boutonsAction: [
        { nom: "show" },
        { nom: "edit", nomRoute: "acl.users.edit", classe: "" },
        { nom: "delete", nomRoute: "", classe: "" },
      ],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Intervenants", nomRoute: "", parametres: {} },
      ],
      paginationMetaData: [],
      pageCourante: 1,
      queryParameterServer: "?page=1",
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
      this.queryParameterServer = "?page=" + this.pageCourante;
    },
    obtenirListe() {
      DataService.getAll()
        .then((response) => {
          this.bdObjets = response.data.data;
          this.paginationMetaData = response.data.meta;
          this.isLoadingTable = false;
          this.colonnesTable = response.data.colonnesTableAffichable;
        })
        .catch((e) => {});
    },
    showUserInfos(uuid) {
      this.userInfos = [];
      this.isLoadingSpinner = true;
      DataService.get(uuid)
        .then((response) => {
          this.userInfos = response.data.data;
          this.isLoadingSpinner = false;
        })
        .catch((e) => {});
    },
    setUuid(uuid) {
      this.uuid = uuid;
    },
    deleteDonnee() {
      DataService.delete(this.uuid)
        .then((response) => {
          this.$refs.refAfficherSuppressionModale.fermerModale();
          this.refreshList();
        })
        .catch((e) => {});
    },
    refreshList() {
      this.obtenirListe();
    },
    setAlertesMessage() {
      const route = useRoute();
      this.alert.alertErreur = route.query.alertErreur
        ? route.query.alertErreur
        : "";
      this.alert.alertSucces = route.query.alertSucces
        ? route.query.alertSucces
        : "";
      this.alert.alerteInfo = route.query.alerteInfo
        ? route.query.alerteInfo
        : "";
      this.alert.alerteAvertissement = route.query.alerteAvertissement
        ? route.query.alerteAvertissement
        : "";

      this.$refs.refAlerteMessage.setAlerteMessageErreur(
        this.alert.alertErreur
      );
      this.$refs.refAlerteMessage.setAlerteMessageSucces(
        this.alert.alertSucces
      );
      this.$refs.refAlerteMessage.setAlerteMessageInfo(this.alert.alerteInfo);
      this.$refs.refAlerteMessage.setAlerteMessageAvertissement(
        this.alert.alerteAvertissement
      );

      this.nettoyerAlertesMessageUrl();
    },
    nettoyerAlertesMessageUrl() {
      this.$router.replace({ alertErreur: null });
      this.$router.replace({ alertSucces: null });
      this.$router.replace({ alerteInfo: null });
      this.$router.replace({ alerteAvertissement: null });
    },
    rechercheObjets() {
      alert(1);
      return;
      DataService.recherche(this.titre)
        .then((response) => {
          this.bdObjets = response.data.data;
        })
        .catch((e) => {});
    },
    searchTitre() {
      DataService.findByTitre(this.titre)
        .then((response) => {
          this.bdObjets = response.data.data;
        })
        .catch((e) => {});
    },
  },
  mounted() {
    const route = useRoute();
    this.setAlertesMessage();
    this.refreshList();
  },
};
