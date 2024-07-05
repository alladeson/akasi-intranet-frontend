import BackOfficeLayoutClusterSlot from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import UserService from "@/services/user.service";
import UserDataService from "@/services/BackOffice/Acl/User/UserDataService";
import DemandeDataService from "@/services/BackOffice/Demande/DemandeDataService";
import RapportDataService from "@/services/BackOffice/Rapport/RapportDataService";

export default {
  name: "ProfilShowView",
  components: {
    BackOfficeLayoutClusterSlot,
    BreadcrumbClusterComponent,
    AlertMessageComponent,
  },
  data() {
    return {
      myBaseLink: import.meta.env.VITE_FILE_BASE_URL,
      isLoadingTable: true,
      loading: false,
      uuid: UserService.currentUser().user.id,
      currentUser: [],
      nombre_demande: 0,
      nombre_rapport: 0,
      isLoadingSpinner: true,
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Informations de profil", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    bdObjetGet(uuid) {
      UserDataService.get(uuid)
        .then((response) => {
          this.currentUser = response.data.user;
          this.isLoadingSpinner = false;
        })
        .catch((e) => {
          if (e.response.data.message == "Unauthenticated.") {
            this.$store.dispatch("auth/logout");
            this.$router.push({ name: "auth.login" });
          }
        });
    },
    obtenirListe() {
      RapportDataService.getAll()
        .then((response) => {
          this.isLoadingTable = false;
          this.nombre_rapport = response.data.reports.length;
        })
        .catch((e) => {});

      DemandeDataService.getAll()
        .then((response) => {
          this.isLoadingTable = false;
          this.nombre_demande = response.data.requests.length;
        })
        .catch((e) => {});
    },
  },
  computed: {},
  mounted() {
    this.bdObjetGet(this.uuid);
    this.obtenirListe();
  },
};
