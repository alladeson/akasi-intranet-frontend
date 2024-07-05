import UserDataService from "@/services/BackOffice/User/UserDataService";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import AgBaseTableComponent from "@/components/Table/AgBaseTableComponent.vue";
import AgBaseBlocRechercheComponent from "@/components/Form/Field/AgBaseBlocRechercheComponent.vue";
import AgBaseButtonAddComponent from "@/components/Form/Button/AgBaseButtonAddComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

import { useRoute } from "vue-router";

export default {
  components: {
    BackOfficePageContent,
    ConfirmerSuppressionComponent,
    AlertMessageComponent,
    AgBaseTableComponent,
    AgBaseBlocRechercheComponent,
    AgBaseButtonAddComponent,
    BreadcrumbClusterComponent,
  },
  name: "UserList",
  data() {
    return {
      //
      alert: {
        alertErreur: "",
        alertSucces: "",
        alerteInfo: "",
        alerteAvertissement: "",
      },
      headers: [
        { text: "Nom", value: "lastname" },
        { text: "Prénom(s)", value: "firstname" },
        { text: "Titre", value: "title" },
        {
          text: "Email",
          value: "email",
        },
        { text: "Action", value: "actions" },
      ],
      items: [],
      bdObjets: [], //Ne pas changer le nom
      rechercheVmodel: "",
      isLoadingTable: true,
      uuid: "",
      currentEl: "",
      boutonsAction: [
        //{nom: "show", nomRoute: "etape.etapes.edit", classe: "btn btn-secondary btn-sm"},
        { nom: "edit", nomRoute: "etape.etapes.edit", classe: "" },
        { nom: "delete", nomRoute: "", classe: "" },
      ],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Utitlisateurs", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    obtenirListe() {
      UserDataService.getAll()
        .then((response) => {
          this.bdObjets = response.data.users.slice().reverse();
          this.items = response.data.users.slice().reverse();
          this.isLoadingTable = false;
          // this.colonnesTable = response.data.colonnesTableAffichable
        })
        .catch((e) => {
          if (e.response.data.message == "Unauthenticated.") {
            this.$store.dispatch("auth/logout");
            this.$router.push({ name: "auth.login" });
          }
        });
    },
    setUuid(id, firstname, lastname) {
      this.id = id;
      this.currentEl = firstname + " " + lastname;
    },
    deleteDonnee() {
      UserDataService.delete(this.id)
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
      this.items = this.bdObjets.filter(
        (item) =>
          item.title
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.firstname
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.lastname
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.email.toUpperCase().includes(this.rechercheVmodel.toUpperCase())
      );
    },
  },
  mounted() {
    this.setAlertesMessage();

    this.refreshList();
  },
};
