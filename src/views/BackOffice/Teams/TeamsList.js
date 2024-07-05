import TeamDataService from "@/services/BackOffice/Team/TeamDataService";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
import ConfirmerRejetComponent from "@/components/Modale/ConfirmerRejetModaleComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import AgBaseTableComponent from "@/components/Table/AgBaseTableComponent.vue";
import AgBaseBlocRechercheComponent from "@/components/Form/Field/AgBaseBlocRechercheComponent.vue";
import AgBaseButtonAddComponent from "@/components/Form/Button/AgBaseButtonAddComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import MemberDataService from "@/services/BackOffice/Member/MemberDataService";
import { useRoute } from "vue-router";
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
  name: "TeamsList",
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
      rechercheVmodel: "",
      headers: [
        { text: "Nom de l'équipe", value: "name" },
        { text: "Projet", value: "project.name" },
        { text: "Outils et Technologies", value: "project.tools" },
        { text: "Actions", value: "actions" },
      ],
      bdObjets: [], //Ne pas changer le nom
      items: [],
      isLoadingTable: true,
      uuid: "",
      boutonsAction: [
        //{nom: "show", nomRoute: "etape.etapes.edit", classe: "btn btn-secondary btn-sm"},
        { nom: "edit", nomRoute: "etape.etapes.edit", classe: "" },
        { nom: "delete", nomRoute: "", classe: "" },
      ],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Équipes", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    obtenirListe() {
      TeamDataService.getAll()
        .then((response) => {
          console.log(response)
          this.bdObjets = response.data.teams.slice().reverse();
          this.items = response.data.teams.slice().reverse();
          for (let i = 0; i < this.items.length; i++) {
            TeamDataService.showTeamMember(this.items[i].id).then((res) => {
              this.items[i].members = res.data.members;
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
    deleteMember() {
      MemberDataService.delete(this.id)
        .then((response) => {
          this.$refs.refAfficherRejetModale.fermerModale();
          this.refreshList();
        })
        .catch((e) => {});
    },
    deleteDonnee() {
      TeamDataService.delete(this.id)
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
          item.project.tools
            .toUpperCase()
            .includes(this.rechercheVmodel.toUpperCase()) ||
          item.project.name
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
