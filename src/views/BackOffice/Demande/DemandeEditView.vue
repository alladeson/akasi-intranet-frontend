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
          <form @submit.prevent="bdObjetSave" enctype="multipart/form-data">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseInputTextComponent
                    nom="object"
                    label="Objet de la demande"
                    :required="true"
                    v-model="bdObjet.object"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseTextareaComponent
                    nom="reasons"
                    label="Raison (s) de la demande"
                    :required="true"
                    v-model="bdObjet.reasons"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="piece"> Piece justificative </label>
                  <input
                    id="piece"
                    class="form-control"
                    type="file"
                    @change="onFileSelected"
                    accept="image/*, .pdf"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="starting_date">
                    Date de début
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    class="form-control"
                    type="date"
                    name="starting_date"
                    id="starting_date"
                    required
                    v-model="bdObjet.starting_date"
                    :min="today"
                    placeholder="Date de début"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="ending_date">
                    Date de fin
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Date de fin"
                    class="form-control"
                    type="date"
                    name="ending_date"
                    id="ending_date"
                    required
                    :min="bdObjet.starting_date"
                    v-model="bdObjet.ending_date"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseInputTextComponent
                    nom="duration"
                    label="Durée de l'absence"
                    v-model="bdObjet.duration"
                    :required="true"
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
                name: 'request.list',
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
import DemandeDataService from "@/services/BackOffice/Demande/DemandeDataService";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import { useRoute } from "vue-router";
import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
import AgBaseTextareaComponent from "@/components/Form/Field/AgBaseTextareaComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import AgBaseInputDateComponent from "@/components/Form/Field/AgBaseInputDateComponent.vue";

export default {
  name: "DemandeEdit",
  components: {
    AgBaseInputDateComponent,
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseInputTextComponent,
    AgBaseTextareaComponent,
    AgBaseButtonSubmitComponent,
    BreadcrumbClusterComponent,
  },
  data() {
    return {
      today: new Date().toISOString().split("T")[0],
      bdObjet: {
        piece: "",
      },
      id: null,
      loading: false,
      selectOptionItemsEtapeBase: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Demandes", nomRoute: "request.list", parametres: {} },
        { texte: "Editer une demande", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    onFileSelected(event) {
      let file = event.target.files[0];
      this.bdObjet.piece = file;
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
    bdObjetSave() {
      this.loading = true;
      let formData = new FormData();

      formData.append("piece", this.bdObjet.piece);
      formData.append("object", this.bdObjet.object);
      formData.append("reasons", this.bdObjet.reasons);
      formData.append("starting_date", this.bdObjet.starting_date);
      formData.append("ending_date", this.bdObjet.ending_date);
      formData.append("duration", this.bdObjet.duration);
      formData.append("_method", "put");

      DemandeDataService.update(this.id, formData)
        .then((response) => {
          this.$router.push({
            name: "request.list",
            query: { alertSucces: "Demande mise à jour avec succès" },
          });
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de la mise à jour de la demande!"
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
