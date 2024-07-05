import BackOfficeLayoutClusterSlot from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import AgBaseTableButtonShowComponent from "@/components/Table/AgBaseTableButtonShowComponent.vue";
import ChaineValeurProgressionComponent from "@/components/App/ChaineValeurProgressionComponent.vue";
import DemandeDataService from "@/services/BackOffice/Demande/DemandeDataService";
import RapportDataService from "@/services/BackOffice/Rapport/RapportDataService";
import UserService from "@/services/user.service";
import ProjectDataService from "@/services/BackOffice/Project/ProjectDataService";
import TeamDataService from "@/services/BackOffice/Team/TeamDataService";

import moment from "moment";

export default {
  name: "DasboardClusterView",
  components: {
    BackOfficeLayoutClusterSlot,
    BreadcrumbClusterComponent,
    AgBaseTableButtonShowComponent,
    ChaineValeurProgressionComponent,
  },
  data() {
    return {
      myBaseLink: import.meta.env.VITE_FILE_BASE_URL,
      isLoadingTable: true,
      role: UserService.currentUser().user.title,
      bdObjets: {
        nombre_rapport: '<div class="spinner-border" role="status"></div>',
        nombre_absence: '<div class="spinner-border" role="status"></div>',
        nombre_demande: '<div class="spinner-border" role="status"></div>',
        nombre_timesheet: '<div class="spinner-border" role="status"></div>',
        nombre_project: '<div class="spinner-border" role="status"></div>',
        nombre_team: '<div class="spinner-border" role="status"></div>',
      },
      chaine_valeur_encours: [],
      activitie_logs: [],
      reports: [],
      requests: [],

      listeBreadcrumbs: [
        { texte: "Accueil", nomRoute: "pages.accueil", parametres: {} },
        { texte: "Tableau de bord", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    moment: function (date) {
      return moment(
        date.slice(0, date.length - 1),
        "YYYY-MM-DDTHH:mm:ss.SSS"
      ).format("DD-MM-YYYY à HH:mm:ss");
    },
    obtenirListe() {
      RapportDataService.getAll()
        .then((response) => {
          this.reports = response.data.reports.slice(-10).reverse();
          this.isLoadingTable = false;
          this.bdObjets.nombre_rapport = response.data.reports.length;
          // this.colonnesTable = response.data.colonnesTableAffichable
        })
        .catch((e) => {
          if (e.response.data.message == "Unauthenticated.") {
            this.$store.dispatch("auth/logout");
            this.$router.push({ name: "auth.login" });
          }
        });

      DemandeDataService.getAll()
        .then((response) => {
          this.requests = response.data.requests;
          this.isLoadingTable = false;
          this.bdObjets.nombre_demande = response.data.requests.length;
          this.bdObjets.nombre_absence = 0;
          this.bdObjets.nombre_timesheet = "00h00";
          // this.colonnesTable = response.data.colonnesTableAffichable
        })
        .catch((e) => {});

      ProjectDataService.getAll()
        .then((response) => {
          this.bdObjets.nombre_project = response.data.projects.length;
          // this.colonnesTable = response.data.colonnesTableAffichable
        })
        .catch((e) => {});

      TeamDataService.getAll()
        .then((response) => {
          this.bdObjets.nombre_team = response.data.teams.length;
          // this.colonnesTable = response.data.colonnesTableAffichable
        })
        .catch((e) => {});
    },
  },
  computed: {},
  mounted() {
    this.obtenirListe();
  },
};
