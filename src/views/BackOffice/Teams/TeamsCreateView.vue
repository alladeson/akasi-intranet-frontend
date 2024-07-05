<template>
  <BackOfficePageContent nomPage="Ajouter une équipe">
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
import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

export default {
  name: "TeamsCreate",
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
      loading: false,
      selectOptionItemsEtapeBase: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "  Équipes", nomRoute: "etape.etapes.list", parametres: {} },
        { texte: "Ajouter", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    obtenirListe() {
      ProjectDataService.getAll()
        .then((response) => {
          this.projects = response.data.projects;
          this.bdObjet.project_id = this.projects[0].id;
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

      TeamDataService.create(this.bdObjet)
        .then((response) => {
          // this.bdObjet.id = response.data.data.id;
          this.loading = false;
          this.$router.push({
            name: "team.list",
            query: { alertSucces: "Équipe ajoutée avec succès" },
          });
        })
        .catch((err) => {
          this.loading = false;

          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de l'ajout l'équipe !"
          );
        });
    },
  },
  mounted() {
    this.obtenirListe();
  },
};
</script>
