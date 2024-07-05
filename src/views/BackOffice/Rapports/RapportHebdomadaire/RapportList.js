import RapportDataService from "@/services/BackOffice/Rapport/RapportDataService";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
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
    ConfirmerValidationComponent,
    AlertMessageComponent,
    AgBaseTableComponent,
    AgBaseBlocRechercheComponent,
    AgBaseButtonAddComponent,
    BreadcrumbClusterComponent,
  },
  name: "RapportList",
  data() {
    return {
      role: UserService.currentUser().user.title,
      myBaseLink: import.meta.env.VITE_FILE_BASE_URL,
      headers: [
        { text: "Date du rapport", value: "created_at" },
        { text: "Objectifs de la semaine", value: "goals" },
        /*  { text: "Réalisations", value: "achievements" },
        {
          text: "Problèmes/Commentaires",
          value: "observations",
        }, */
        {
          text: "Objectifs de la semaine prochaine",
          value: "next_goals",
          sortable: true,
        },
        { text: "Mes Status", value: "status", sortable: true },
        { text: "Action", value: "actions" },
      ],
      items: [],
      //
      rechercheVmodel: "",
      alert: {
        alertErreur: "",
        alertSucces: "",
        alerteInfo: "",
        alerteAvertissement: "",
      },
      bdObjets: [], //Ne pas changer le nom
      // colonnesTable: {

      // },

      isLoadingTable: true,
      uuid: "",
      boutonsAction: [
        //{nom: "show", nomRoute: "etape.etapes.edit", classe: "btn btn-secondary btn-sm"},
        { nom: "edit", nomRoute: "etape.etapes.edit", classe: "" },
        { nom: "delete", nomRoute: "", classe: "" },
      ],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Rapports", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    obtenirListe() {
      RapportDataService.getAll()
        .then((response) => {
          this.bdObjets = response.data.reports.slice().reverse();
          this.items = response.data.reports.slice().reverse();
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].created_at = this.moment(this.items[i].created_at);
            this.items[i].actions = this.items[i].status;
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
    /*     deleteDonnee() {
      RapportDataService.delete(this.id)
        .then((response) => {
          this.$refs.refAfficherSuppressionModale.fermerModale();
          this.refreshList();
        })
        .catch((e) => {});
    }, */
    validateItem() {
      RapportDataService.validate(this.id)
        .then(() => {
          this.$refs.refAfficherValidationModale.fermerModale();
          this.$refs.refAlerteMessage.setAlerteMessageSucces(
            "Rapport envoyé avec succès"
          );
          this.refreshList();
        })
        .catch(() => {
          this.$refs.refAfficherValidationModale.fermerModale();
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
          item.achievements
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.goals
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.created_at
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.next_goals
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.status
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.observations
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase())
      );
    },
    moment: function (date) {
      return moment(
        date.slice(0, date.length - 1),
        "YYYY-MM-DDTHH:mm:ss.SSS"
      ).format("DD-MM-YYYY à HH:mm:ss");
    },
  },
  mounted() {
    this.setAlertesMessage();
    this.refreshList();
  },
};
