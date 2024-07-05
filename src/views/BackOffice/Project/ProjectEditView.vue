<template>
  <BackOfficePageContent nomPage="Editer un projet">
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
                    label="Nom du projet"
                    :required="true"
                    v-model="bdObjet.name"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseTextareaComponent
                    nom="description"
                    label="Description"
                    :required="true"
                    v-model="bdObjet.description"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                   <AgBaseInputDateComponent
                    nom="starting_date"
                    label="Date de début"
                    :required="true"
                    v-model="bdObjet.starting_date"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseInputTextComponent
                    nom="estimated_time"
                    label="Durée estimée"
                    :required="true"
                    v-model="bdObjet.estimated_time"
                  />
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseTextareaComponent
                    nom="tools"
                    label="Outils et Technologies"
                    :required="true"
                    v-model="bdObjet.tools"
                  />
                </div>
              </div>
            </div>
            <AgBaseButtonSubmitComponent
              buttonText="Enregistrer"
              :loading="loading"
            />
            <router-link
              :to="{
                name: 'project.list',
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
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import { useRoute } from "vue-router";
import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
import AgBaseTextareaComponent from "@/components/Form/Field/AgBaseTextareaComponent.vue";
import AgBaseInputDateComponent from "@/components/Form/Field/AgBaseInputDateComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

export default {
  name: "ProjectEdit",
  components: {
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseInputTextComponent,
    AgBaseTextareaComponent,
    AgBaseInputDateComponent,
    AgBaseButtonSubmitComponent,
    BreadcrumbClusterComponent,
  },
  data() {
    return {
      bdObjet: {
        piece: "",
      },
      id: null,
      loading: false,
      selectOptionItemsEtapeBase: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Projet", nomRoute: "team.list", parametres: {} },
        { texte: "Editer un projet", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    bdObjetGet(id) {
      ProjectDataService.show(id)
        .then((response) => {
          this.bdObjet = response.data.project;
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
      ProjectDataService.update(this.id, this.bdObjet)
        .then((response) => {
          this.$router.push({
            name: "project.list",
            query: { alertSucces: "Projet mis à jour avec succès" },
          });
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de la mise à jour du projet !"
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
