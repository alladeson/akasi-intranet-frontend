<template>
  <BackOfficePageContent nomPage="Editer une demande">
    <template v-slot:Breadcrumb>
      <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs" />
    </template>
    <template v-slot:MainContent>
      <div class="row">
        <div class="col-12">
          <AlertMessageComponent ref="refAlerteMessage" />
        </div>
      </div>

      <div class="card">
        <div class="card-header border-transparent">
          <h3 class="card-title"></h3>
        </div>

        <div class="card-body">
          <form @submit.prevent="bdObjetSave">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseInputTextComponent
                    nom="name"
                    label="Nom de l'équipe"
                    :required="true"
                    v-model="bdObjet.name"
                  />
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label for="project_id"
                    >Projet <span class="text-danger">*</span>
                  </label>
                  <select
                    required
                    name="project_id"
                    id=""
                    class="form-control"
                    v-model="bdObjet.project_id"
                  >
                    <option
                      v-for="(project, index) in projects"
                      :key="index"
                      :value="project.id"
                    >
                      {{ project.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <AgBaseButtonSubmitComponent
              buttonText="Enregistrer"
              :loading="loading"
            />

            <router-link
              :to="{
                name: 'team.list',
              }"
            >
              <div class="btn btn-danger ml-2 mt-3 p-2">Annuler</div>
            </router-link>
          </form>
        </div>
      </div>
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>

<script>
import ProjectDataService from "@/services/BackOffice/Project/ProjectDataService";
import TeamDataService from "@/services/BackOffice/Team/TeamDataService";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import { useRoute } from "vue-router";
import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

export default {
  name: "TeamsEdit",
  components: {
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseInputTextComponent,
    AgBaseButtonSubmitComponent,
    BreadcrumbClusterComponent,
  },
  data() {
    return {
      bdObjet: {},
      projects: [],
      id: null,
      loading: false,
      selectOptionItemsEtapeBase: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Équipes", nomRoute: "team.list", parametres: {} },
        { texte: "Editer une équipe", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    bdObjetGet(id) {
      TeamDataService.show(id)
        .then((response) => {
          this.bdObjet = response.data.team;
          this.bdObjet.project_id = response.data.team.project.id;
          this.id = id;

          ProjectDataService.getAll()
            .then((response) => {
              this.projects = response.data.projects;
            })
            .catch((e) => {});
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
      TeamDataService.update(this.id, this.bdObjet)
        .then((response) => {
          this.$router.push({
            name: "team.list",
            query: { alertSucces: "Équipe mise à jour avec succès" },
          });
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de la mise à jour de l'équipe !"
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
