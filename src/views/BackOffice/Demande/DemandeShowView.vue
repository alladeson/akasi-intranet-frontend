<template>
  <BackOfficePageContent nomPage="Détails d'une demande">
    <template v-slot:Breadcrumb>
      <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs" />
    </template>
    <template v-slot:MainContent>
      <div class="card p-2" v-if="bdObjet.object">
        <div
          class="card-header border-transparent ml-2 d-flex justify-content-between align-items-center"
        >
          <div
            v-if="bdObjet.status == 1"
            class="badge p-2 bg-info d-flex justify-content-center align-items-center"
          >
            En cours
          </div>
          <div
            v-else-if="bdObjet.status == 2"
            class="badge p-2 bg-warning d-flex justify-content-center align-items-center"
          >
            Annuler
          </div>
          <div
            v-else-if="bdObjet.status == 3"
            class="badge p-2 bg-success d-flex justify-content-center align-items-center"
          >
            Accepter
          </div>
          <div
            v-else
            class="badge p-2 bg-danger d-flex justify-content-center align-items-center"
          >
            Rejeter
          </div>

          <div class="d-flex align-items-center mb-2 mt-3">
            <span class="card-title fw-bold pr-2 text-primary"
              >Demande émise le :
            </span>
            <span class="text-gray">{{
              bdObjet.created_at ? moment(bdObjet.created_at) : ""
            }}</span>
          </div>

          <div class="d-flex align-items-center">
            <span class="card-title fw-bold pr-2 text-primary">Par : </span>
            <span class="text-gray">
              {{ bdObjet.user ? bdObjet.user.firstname : "" }}
              {{ bdObjet.user ? bdObjet.user.lastname : "" }}</span
            >
          </div>
        </div>

        <div class="card-body">
          <div class="col-md-12">
            <div class="tab-content">
              <div class="post">
                <div class="fw-bold text-primary">Objet de la demande :</div>

                <p>
                  {{ bdObjet.object ? bdObjet.object : "Non disponible" }}
                </p>
              </div>
              <div class="post">
                <div class="text-primary fw-bold">
                  Raison (s) de la demande :
                </div>

                <p>
                  {{ bdObjet.reasons ? bdObjet.reasons : "Non disponible" }}
                </p>
              </div>
              <div class="post">
                <div class="text-primary fw-bold">Pièce justificative :</div>

                <a
                  :href="`${myBaseLink}` + bdObjet.piece"
                  download
                  v-if="bdObjet.piece !== null"
                  class="btn btn-primary mt-2"
                >
                  Voir la pièce
                </a>
                <p v-else>Non disponible</p>
              </div>
              <div class="row post">
                <div class="mb-2 mt-2 col-md-4">
                  <p class="card-title w-100 fw-bold pr-2 text-primary">
                    Date de début :
                  </p>
                  <p class="text-gray">
                    {{
                      bdObjet.starting_date
                        ? moment(bdObjet.starting_date)
                        : "Non disponible"
                    }}
                  </p>
                </div>
                <div class="mb-2 mt-2 col-md-4">
                  <p class="w-100 card-title fw-bold pr-2 text-primary">
                    Date de fin :
                  </p>
                  <div class="text-gray">
                    {{ bdObjet.ending_date ? moment(bdObjet.ending_date) : "" }}
                  </div>
                </div>
                <div class="mb-2 mt-2 col-md-4">
                  <p class="w-100 card-title fw-bold pr-2 text-primary">
                    Durée de la demande :
                  </p>
                  <p class="text-gray">
                    {{ bdObjet.duration ? bdObjet.duration : "Non disponible" }}
                  </p>
                </div>
              </div>
            </div>
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
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>

<script>
import DemandeDataService from "@/services/BackOffice/Demande/DemandeDataService";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import { useRoute } from "vue-router";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import moment from "moment";

export default {
  name: "DemandeDetails",
  components: {
    BackOfficePageContent,
    BreadcrumbClusterComponent,
  },
  data() {
    return {
      myBaseLink: import.meta.env.VITE_FILE_BASE_URL,
      bdObjet: {},
      id: null,
      loading: false,
      selectOptionItemsEtapeBase: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Demandes", nomRoute: "request.list", parametres: {} },
        { texte: "Détails d'une demande", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    moment: function (date) {
      return moment(date, "YYYY-MM-DDTHH:mm:ss.SSS").format(
        "DD-MM-YYYY à HH:mm:ss"
      );
    },
    bdObjetGet(id) {
      DemandeDataService.get(id)
        .then((response) => {
          this.bdObjet = response.data.request;
          /*           this.bdObjet.etape_base_id = this.bdObjet.etape_base.uuid;
           */ this.id = id;
        })
        .catch((e) => {
          if (e.response.data.message == "Unauthenticated.") {
              this.$store.dispatch("auth/logout");
              this.$router.push({ name: "auth.login" });
            }
        });
    },
  },
  mounted() {
    const route = useRoute();
    this.bdObjetGet(route.params.id);
  },
};
</script>

<style scoped>
.post {
}
</style>
