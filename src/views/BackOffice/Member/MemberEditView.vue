<template>
  <BackOfficePageContent nomPage="Editer un membre">
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
                    label="Utilisateur"
                    :required="true"
                    v-model="bdObjet.name"
                    disabled
                  />
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
import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";

import MemberDataService from "@/services/BackOffice/Member/MemberDataService";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import { useRoute } from "vue-router";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

export default {
  name: "MemberEdit",
  components: {
    AgBaseInputTextComponent,
    AlertMessageComponent,
    BackOfficePageContent,
    AgBaseButtonSubmitComponent,
    BreadcrumbClusterComponent,
  },
  data() {
    return {
      bdObjet: {},
      users: [],
      members: [],
      id: null,
      loading: false,
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Membre", nomRoute: "team.list", parametres: {} },
        { texte: "Editer un membre", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    bdObjetGet(id) {
      MemberDataService.show(id)
        .then((response) => {
          this.bdObjet = response.data.member;
          this.bdObjet.name =
            response.data.member.user.firstname + ' ' +
            response.data.member.user.lastname;
          this.id = id;
        })
        .catch((e) => {
        });
    },
    bdObjetSave() {
      this.loading = true;
      MemberDataService.update(this.id, this.bdObjet)
        .then((response) => {
          this.$router.push({
            name: "team.list",
            query: { alertSucces: "Membre mis à jour avec succès" },
          });
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de la mise à jour!"
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
