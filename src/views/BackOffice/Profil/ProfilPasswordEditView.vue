<template>
  <BackOfficeLayoutClusterSlot nomPage="Editer mon mot de passe">
    <template v-slot:Breadcrumb>
      <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs" />
    </template>
    <template v-slot:MainContent>
      <div class="row">
        <div class="col-12">
          <AlertMessageComponent ref="refAlerteMessage" />
        </div>
      </div>
      <!-- {{ bdObjet }} -->
      <div class="card">
        <div class="card-header border-transparent">
          <h3 class="card-title"></h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 col-md-12">
              <form
                @submit.prevent="bdObjetSave"
                class="row col-lg-12 col-md-12"
                id="form-premier"
              >
                <div class="col col-lg-12 col-md-6">
                  <fieldset>
                    <legend>Modifier mon mot de passe</legend>
                    <div class="form-group">
                      <AgBaseInputPasswordComponent
                        nom="lastpassword"
                        label="Ancien Mot de passe"
                        :required="true"
                        v-model="bdObjet.oldPassword"
                      />
                    </div>
                    <div class="form-group">
                      <AgBaseInputPasswordComponent
                        nom="lastpassword"
                        label="Nouveau Mot de passe"
                        :required="true"
                        v-model="bdObjet.newPassword"
                      />
                    </div>
                    <div class="form-group">
                      <AgBaseInputPasswordComponent
                        nom="lastpassword"
                        label="Confirmer Nouveau Mot de passe"
                        :required="true"
                        v-model="bdObjet.confirmNewPassword"
                      />
                    </div>
                  </fieldset>
                </div>
                <div class="form-group">
                  <AgBaseButtonSubmitComponent
                    buttonText="Enregistrer"
                    class="float-start"
                    :loading="loading"
                  />
                  <router-link
                    :to="{
                      name: 'profil.show',
                    }"
                  >
                    <div class="btn btn-danger ml-2 mt-3 p-2">Annuler</div>
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficeLayoutClusterSlot>
</template>

<script>
import UserDataService from "@/services/BackOffice/User/UserDataService";
import BackOfficeLayoutClusterSlot from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import AgBaseInputPasswordComponent from "@/components/Form/Field/AgBaseInputPasswordComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import { useRoute } from "vue-router";
import "vue-select/dist/vue-select.css";

export default {
  name: "ProfilEditView",
  components: {
    BackOfficeLayoutClusterSlot,
    BreadcrumbClusterComponent,
    AlertMessageComponent,
    AgBaseInputPasswordComponent,
    AgBaseButtonSubmitComponent,
  },
  data() {
    return {
      bdObjet: {},
      id: null,
      loading: false,
      roles: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        {
          texte: "Informations de profil",
          nomRoute: "profil.show",
          parametres: {},
        },
        { texte: "Editer mon mot de passe", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    bdObjetSave() {
      this.loading = true;

      if (this.bdObjet.newPassword != this.bdObjet.confirmNewPassword) {
        this.$refs.refAlerteMessage.setAlerteMessageErreur(
          "Les nouveaux mots de passe entrés ne sont pas les mêmes. Vérifiez et reprennez svp. Merci !"
        );
        this.loading = false;
      } else {
        UserDataService.updatePassword(this.id, this.bdObjet)
          .then((response) => {
            if (response.data.message == "Validation Error") {
              this.$refs.refAlerteMessage.setAlerteMessageErreur(
                "Erreur de validation. Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chifre et un symbole"
              );
            } else if (response.data.error == "Bad old password") {
              this.$refs.refAlerteMessage.setAlerteMessageErreur(
                "L'ancien mot de passe est incorrect"
              );
            } else {
              this.$router.push({
                name: "profil.show",
                query: { alertSucces: "Mot de passe mis à jour avec succès" },
              });
            }
            this.loading = false;
          })
          .catch((e) => {
            if (e.response.data.message == "Unauthenticated.") {
              this.$store.dispatch("auth/logout");
              this.$router.push({ name: "auth.login" });
            }
            this.$refs.refAlerteMessage.setAlerteMessageErreur(
              "Erreur lors de la mise à jour du mot de passe!"
            );
            this.loading = false;
          });
      }
    },
  },
  computed: {},
  mounted() {
    const route = useRoute();
    this.id = route.params.id;
  },
};
</script>
