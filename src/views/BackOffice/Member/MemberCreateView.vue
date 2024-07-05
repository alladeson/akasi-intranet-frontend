<template>
  <BackOfficePageContent nomPage="Ajouter un utilisateur à cette équipe">
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
                  <label for="user_id"
                    >Utilisateur <span class="text-danger">*</span>
                  </label>
                  <select
                    required
                    name="user_id"
                    id=""
                    class="form-control"
                    v-model="bdObjet.user_id"
                  >
                    <option
                      v-for="(user, index) in users"
                      :key="index"
                      :value="user.id"
                    >
                      {{ user.firstname }} {{ user.lastname }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="role"
                    >Role <span class="text-danger">*</span>
                  </label>
                  <select
                    name="role"
                    id=""
                    class="form-control"
                    v-model="bdObjet.role"
                    required
                  >
                    <option value="0">Membre</option>
                    <option value="1">Team Lead</option>
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
import UserDataService from "@/services/BackOffice/User/UserDataService";
import MemberDataService from "@/services/BackOffice/Member/MemberDataService";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import { useRoute } from "vue-router";

export default {
  name: "MemberCreate",
  components: {
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseButtonSubmitComponent,
    BreadcrumbClusterComponent,
  },
  data() {
    return {
      bdObjet: {
        role: "0",
      },
      users: [],
      members: [],
      loading: false,
      selectOptionItemsEtapeBase: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Membres", nomRoute: "etape.etapes.list", parametres: {} },
        { texte: "Ajouter", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    obtenirListe(teamId) {
      UserDataService.getAll()
        .then((response) => {
          this.users = response.data.users;
          /* MemberDataService.getAll()
            .then((res) => {
              this.members = res.data.members;
              for (let i = 0; i < this.members.length; i++) {
                for (let j = 0; j < this.users.length; j++) {
                  if (this.users[j].id === this.members[i].user.id) {
                    this.users.splice(j, 1);
                  }
                }
              }
              this.bdObjet.user_id = this.users[0].id;
            })
            .catch((e) => {}); */

          MemberDataService.showTeamMember(teamId)
            .then((res) => {
              this.members = res.data.members;

              for (let i = 0; i < this.members.length; i++) {
                for (let j = 0; j < this.users.length; j++) {
                  if (this.users[j].id === this.members[i].user.id) {
                    this.users.splice(j, 1);
                  }
                }
              }
              this.bdObjet.user_id = this.users[0].id;
            })
            .catch((e) => {});
        })
        .catch((e) => {});
    },
    bdObjetSave() {
      this.loading = true;
      MemberDataService.create(this.bdObjet)
        .then((response) => {
          // this.bdObjet.id = response.data.data.id;
          this.loading = false;
          this.$router.push({
            name: "team.list",
            query: { alertSucces: "Membre ajouté avec succès" },
          });
        })
        .catch((err) => {
          this.loading = false;

          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de l'ajout du membre !"
          );
        });
    },
  },
  mounted() {
    const route = useRoute();
    this.bdObjet.team_id = route.params.id;
    this.obtenirListe(route.params.id);
  },
};
</script>
