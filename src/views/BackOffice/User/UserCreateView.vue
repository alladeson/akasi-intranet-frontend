<template>
  <BackOfficePageContent nomPage="Ajouter un utilisateur">
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
              <div class="col-md-12">
                <div class="form-group">
                  <AgBaseInputPasswordComponent
                    nom="password"
                    label="Mot de passe"
                    :required="true"
                    v-model="bdObjet.password"
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
import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
import AgBaseInputPasswordComponent from "@/components/Form/Field/AgBaseInputPasswordComponent.vue";
import AgBaseInputEmailComponent from "@/components/Form/Field/AgBaseInputEmailComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

export default {
  name: "UserCreate",
  components: {
    AgBaseInputEmailComponent,
    AgBaseInputPasswordComponent,
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseInputTextComponent,
    AgBaseButtonSubmitComponent,
    BreadcrumbClusterComponent,
  },
  data() {
    return {
      bdObjet: {},
      loading: false,
      selectOptionItemsEtapeBase: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Utilisateurs", nomRoute: "user.list", parametres: {} },
        { texte: "Ajouter", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    onFileSelected(event) {
      let file = event.target.files[0];
      this.bdObjet.piece = file;
    },
    bdObjetSave() {
      this.loading = true;
      this.bdObjet.title = this.bdObjet.title.toUpperCase()

      UserDataService.create(this.bdObjet)
        .then((response) => {
          this.loading = false;

          if (response.data.error) {
            this.$refs.refAlerteMessage.setAlerteMessageErreur(
              "Erreur lors de la création de l'utilisateur. Vérifiez si le mot de passe contient au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chifre et un symbole"
            );
          } else {
            this.$router.push({
              name: "user.list",
              query: { alertSucces: "Utilisateur ajouté avec succès" },
            });
          }
        })
        .catch((err) => {
          this.loading = false;
          if (err.response.data.message == "Unauthenticated.") {
              this.$store.dispatch("auth/logout");
              this.$router.push({ name: "auth.login" });
            }
          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de la création de l'utilisateur' !"
          );
        });
    },
  },
  mounted() {},
};
</script>
