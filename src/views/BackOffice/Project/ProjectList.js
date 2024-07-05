import ProjectDataService from "@/services/BackOffice/Project/ProjectDataService";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
import ConfirmerRejetComponent from "@/components/Modale/ConfirmerRejetModaleComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import AgBaseTableComponent from "@/components/Table/AgBaseTableComponent.vue";
import AgBaseBlocRechercheComponent from "@/components/Form/Field/AgBaseBlocRechercheComponent.vue";
import AgBaseButtonAddComponent from "@/components/Form/Button/AgBaseButtonAddComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import moment from "moment";
import { useRoute } from "vue-router";
import TeamDataService from "@/services/BackOffice/Team/TeamDataService";
import UserService from "@/services/user.service";

export default {
  components: {
    BackOfficePageContent,
    ConfirmerSuppressionComponent,
    ConfirmerRejetComponent,
    AlertMessageComponent,
    AgBaseTableComponent,
    AgBaseBlocRechercheComponent,
    AgBaseButtonAddComponent,
    BreadcrumbClusterComponent,
  },
  name: "ProjectList",
  data() {
    return {
      role: UserService.currentUser().user.title,
      alert: {
        alertErreur: "",
        alertSucces: "",
        alerteInfo: "",
        alerteAvertissement: "",
      },
      currentEl: "",
      headers: [
        { text: "Nom du projet", value: "name" },
        { text: "Description", value: "description" },
        { text: "Date de début", value: "starting_date" },
        { text: "Durée estimée", value: "estimated_time" },
        { text: "Outils à utiliser", value: "tools" },
        { text: "Actions", value: "actions" },
      ],
      bdObjets: [], //Ne pas changer le nom
      items: [],
      isLoadingTable: true,
      uuid: "",
      rechercheVmodel: "",
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Projets", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    moment: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    obtenirListe() {
      ProjectDataService.getAll()
        .then((response) => {
          this.bdObjets = response.data.projects.slice().reverse();
          this.items = response.data.projects.slice().reverse();
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].starting_date = this.moment(
              this.items[i].starting_date
            );
          }
          for (let i = 0; i < this.items.length; i++) {
            ProjectDataService.showTeams(this.items[i].id).then((res) => {
              this.items[i].teams = res.data.teams;
            });
          }
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
    setUuid(id, name) {
      this.id = id;
      this.currentEl = name;
    },
    deleteTeam() {
      TeamDataService.delete(this.id)
        .then((response) => {
          this.$refs.refAfficherRejetModale.fermerModale();
          this.refreshList();
        })
        .catch((e) => {});
    },
    deleteDonnee() {
      ProjectDataService.delete(this.id)
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
          item.name
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.description
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.starting_date
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.estimated_time
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.tools.toUpperCase().includes(this.rechercheVmodel.toUpperCase())
      );
    },
  },
  mounted() {
    this.setAlertesMessage();

    this.refreshList();
  },
};
