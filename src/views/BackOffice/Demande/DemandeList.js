import DemandeDataService from "@/services/BackOffice/Demande/DemandeDataService";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
import ConfirmerAnnulationComponent from "@/components/Modale/ConfirmerAnnulationModaleComponent.vue";
import ConfirmerRejetComponent from "@/components/Modale/ConfirmerRejetModaleComponent.vue";
import ConfirmerValidationComponent from "@/components/Modale/ConfirmerValidationModaleComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import AgBaseTableComponent from "@/components/Table/AgBaseTableComponent.vue";
import AgBaseBlocRechercheComponent from "@/components/Form/Field/AgBaseBlocRechercheComponent.vue";
import AgBaseButtonAddComponent from "@/components/Form/Button/AgBaseButtonAddComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import moment from "moment";
import UserService from "@/services/user.service";

import { useRoute } from "vue-router";

export default {
  components: {
    BackOfficePageContent,
    ConfirmerSuppressionComponent,
    ConfirmerAnnulationComponent,
    ConfirmerValidationComponent,
    ConfirmerRejetComponent,
    AlertMessageComponent,
    AgBaseTableComponent,
    AgBaseBlocRechercheComponent,
    AgBaseButtonAddComponent,
    BreadcrumbClusterComponent,
  },
  name: "DemandeList",
  data() {
    return {
      role: UserService.currentUser().user.title,
      alert: {
        alertErreur: "",
        alertSucces: "",
        alerteInfo: "",
        alerteAvertissement: "",
      },
      headers: [
        { text: "Date de la demande", value: "created_at" },
        { text: "Objet", value: "object" },
        { text: "Raisons", value: "reasons" },
        {
          text: "Date de début",
          value: "starting_date",
        },
        { text: "Durée", value: "duration", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "Action", value: "actions" },
      ],
      items: [],
      bdObjets: [], //Ne pas changer le nom
      rechercheVmodel: "",
      isLoadingTable: true,
      uuid: "",
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Demandes", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    momentD: function (date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    moment: function (date) {
      return moment(
        date.slice(0, date.length - 1),
        "YYYY-MM-DDTHH:mm:ss.SSS"
      ).format("DD-MM-YYYY à HH:mm:ss"); /* MMMM Do YYYY, h:mm:ss */
    },
    obtenirListe() {
      this.isLoadingTable = true;
      DemandeDataService.getAll()
        .then((response) => {
          this.bdObjets = response.data.requests.slice().reverse();
          this.items = response.data.requests.slice().reverse();

          for (let i = 0; i < this.items.length; i++) {
            this.items[i].actions = this.items[i].status;
            this.items[i].created_at = this.moment(this.items[i].created_at);
            this.items[i].starting_date = this.momentD(
              this.items[i].starting_date
            );
            this.items[i].ending_date = this.momentD(this.items[i].ending_date);
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
    setUuid(id) {
      this.id = id;
    },
    deleteDonnee() {
      DemandeDataService.cancel(this.id)
        .then((response) => {
          this.$refs.refAfficherAnnulationModale.fermerModale();
          this.$refs.refAlerteMessage.setAlerteMessageSucces(
            "Demande annulée !"
          );
          this.refreshList();
        })
        .catch((e) => {
          this.$refs.refAfficherAnnulationModale.fermerModale();
        });
    },
    validateRequest() {
      let formData = new FormData();
      formData.append("status", 3);
      formData.append("_method", "put");

      DemandeDataService.update(this.id, formData)
        .then((response) => {
          this.$refs.refAfficherValidationModale.fermerModale();
          this.$refs.refAlerteMessage.setAlerteMessageSucces(
            "Demande acceptée !"
          );
          this.refreshList();
        })
        .catch((e) => {
          this.$refs.refAfficherValidationModale.fermerModale();
        });
    },
    rejectRequest() {
      let formData = new FormData();
      formData.append("status", 0);
      formData.append("_method", "put");

      DemandeDataService.update(this.id, formData)
        .then((response) => {
          this.$refs.refAfficherRejetModale.fermerModale();
          this.$refs.refAlerteMessage.setAlerteMessageSucces(
            "Demande rejetée !"
          );
          this.refreshList();
        })
        .catch((e) => {
          this.$refs.refAfficherRejetModale.fermerModale();
        });
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
          item.object
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.reasons
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.starting_date
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.ending_date
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.duration
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.created_at
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase())
      );
    },
  },
  mounted() {
    this.setAlertesMessage();
    this.refreshList();
  },
};
