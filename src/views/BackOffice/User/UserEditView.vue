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
                    nom="lastname"
                    label="Nom de l'utilisateur"
                    :required="true"
                    v-model="bdObjet.lastname"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseInputTextComponent
                    nom="firstname"
                    label="Prénom de l'utilisateur"
                    :required="true"
                    v-model="bdObjet.firstname"
                    disabled
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseInputTextComponent
                    nom="title"
                    label="Titre"
                    :required="true"
                    v-model="bdObjet.title"
                  />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseInputEmailComponent
                    nom="email"
                    label="Email"
                    :required="true"
                    v-model="bdObjet.email"
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
                name: 'user.list',
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
import UserDataService from "@/services/BackOffice/User/UserDataService";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import { useRoute } from "vue-router";
import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
import AgBaseInputEmailComponent from "@/components/Form/Field/AgBaseInputEmailComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

export default {
  name: "UserEdit",
  components: {
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseInputTextComponent,
    AgBaseButtonSubmitComponent,
    BreadcrumbClusterComponent,
    AgBaseInputEmailComponent,
  },
  data() {
    return {
      bdObjet: {},
      id: null,
      loading: false,
      selectOptionItemsEtapeBase: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Utilisateurs", nomRoute: "user.list", parametres: {} },
        { texte: "Editer un utilisateur", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    bdObjetGet(id) {
      UserDataService.show(id)
        .then((response) => {
          this.bdObjet = response.data.user;
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

      UserDataService.update(this.id, this.bdObjet)
        .then((response) => {
          this.$router.push({
            name: "user.list",
            query: { alertSucces: "Utilisateur mis à jour avec succès" },
          });
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de la mise à jour de l'utilisateur!"
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
