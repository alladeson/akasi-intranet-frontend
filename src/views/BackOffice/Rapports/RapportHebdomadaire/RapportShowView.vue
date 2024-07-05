<template>
  <BackOfficePageContent nomPage="Détails du rapport">
    <template v-slot:Breadcrumb>
      <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs" />
    </template>
    <template v-slot:MainContent>
      <div class="card p-3">
        <!-- <div class="card-header border-transparent">
          <h3 class="card-title">Voir tous les détails de mon rapport hebdomadaire</h3>
        </div>    -->
        <div class="card-body" v-if="bdObjet.goals">
          <div class="d-flex align-items-center justify-content-between mb-5">
            <div class="d-flex align-items-center">
              <span v-if="bdObjet.status == 0" class="badge bg-danger p-2"
                >En retard</span
              >
              <span v-else-if="bdObjet.status == 1" class="badge bg-warning p-2"
                >En cours</span
              >
              <span v-else class="badge bg-success p-2">Terminer</span>
            </div>
            <div class="d-flex align-items-center">
              <div class="fw-bold pr-2">Auteur :</div>
              <div class="">
                {{ bdObjet.user ? bdObjet.user.firstname : "" }}
                {{ bdObjet.user ? bdObjet.user.lastname : "" }}
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="fw-bold pr-2">Date du rapport :</div>
              <div class="text-justify">
                {{ bdObjet.created_at ? moment(bdObjet.created_at) : "" }}
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div class="post">
              <div class="fw-bold pr-2 text-primary">
                Objectif(s) de la semaine
              </div>
              <div class="text-justify">
                <li v-for="(goal, index) in bdObjet.goals" :key="index">
                  {{ goal }}
                </li>
                <!-- {{ bdObjet.goals ? bdObjet.goals : "" }} -->
              </div>
            </div>

            <div class="post">
              <h6 class="form-label fw-bold text-primary">Réalisations</h6>
              <div class="text-justify">
                <li
                  v-for="(achievement, index) in bdObjet.achievements"
                  :key="index"
                >
                  {{ achievement }}
                </li>
                <!-- {{ bdObjet.goals ? bdObjet.goals : "" }} -->
              </div>
            </div>

            <div class="post">
              <h6 class="form-label fw-bold text-primary">
                Problème (s) et Commentaire (s)
              </h6>
              <div class="text-justify">
                <li
                  v-for="(observation, index) in bdObjet.observations"
                  :key="index"
                >
                  {{ observation }}
                </li>
              </div>
            </div>

            <div class="post">
              <h6 class="form-label fw-bold text-primary">
                Objectifs de la semaine prochaine
              </h6>
              <div class="text-justify">
                <li
                  v-for="(next_goal, index) in bdObjet.next_goals"
                  :key="index"
                >
                  {{ next_goal }}
                </li>
              </div>
            </div>
            <div class="">
              <a :href="`${myBaseLink}` + bdObjet.pdf" download target="_blank">
                <span
                  class="btn btn-primary animated slideInLeft btn-sm me-1 mb-1 mb-md-0 p-2"
                  title="Télécharger pdf"
                >
                  Télécharger le rapport
                  <font-awesome-icon icon="download" class="nav-icon pl-1" />
                </span>
              </a>
            </div>
          </div>
        </div>
        <div
        v-else
        style="height: 300px"
        class="w-100 d-flex align-items-center justify-content-center"
      >
        <div class="spinner-border" role="status"></div>
      </div>
      </div>
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>

<script>
import RapportDataService from "@/services/BackOffice/Rapport/RapportDataService";
import { useRoute } from "vue-router";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import moment from "moment";

export default {
  name: "RapportDetails",
  components: {
    BackOfficePageContent,
    BreadcrumbClusterComponent,
  },
  data() {
    return {
      myBaseLink: import.meta.env.VITE_FILE_BASE_URL,
      isLoadingTable: true,
      loading: false,
      currentUser: [],
      isLoadingSpinner: true,
      bdObjet: {},
      id: null,
      selectOptionItemsEtapeBase: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Rapport", nomRoute: "report.list", parametres: {} },
        { texte: "Détails", nomRoute: "", parametres: {} },
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
    bdObjetGet(id) {
      RapportDataService.show(id)
        .then((response) => {
          this.bdObjet = response.data.report;
          this.id = id;
        })
        .catch((e) => {
          if (e.response.data.message == "Unauthenticated.") {
            this.$store.dispatch("auth/logout");
            this.$router.push({ name: "auth.login" });
          }
        });
    },
    bdObjetSave() {
      this.loading = true;
      RapportDataService.update(this.id, this.bdObjet)
        .then((response) => {
          this.$router.push({
            name: "report.list",
            query: { alertSucces: "Rapport mis à jour avec succès" },
          });
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de la mise à jour du rapport !"
          );
        });
    },
  },
  mounted() {
    const route = useRoute();
    this.bdObjetGet(route.params.id);
  },
};
</script>
