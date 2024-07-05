<template>
    <BackOfficePageContent nomPage="Ajouter une commune">
        <template v-slot:Breadcrumb>
            <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs"/>
        </template>
        <template v-slot:MainContent>
            <div class="row">
                <div class="col-12">            
                    <AlertMessageComponent ref="refAlerteMessage"/>
                </div>
            </div>

            <div class="card">
                <div class="card-header border-transparent">
                    <h3 class="card-title"></h3>
                </div>

                <div class="card-body">
                    <form @submit.prevent="bdObjetSave" id="form-premier">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputTextComponent nom="titre" label="Titre" v-model="bdObjet.titre" :required="true" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label :for="'departement_id'">
                                        Département <span class="text-danger">*</span>
                                    </label>
                                    <v-select :options="departements" :reduce="(option) => option.uuid"
                                              label="titre" v-model="bdObjet.departement_id" id="departement_id">
                                        <template #search="{attributes, events}">
                                          <input
                                            class="vs__search"
                                            :required="!bdObjet.departement_id"
                                            v-bind="attributes"
                                            v-on="events"
                                          />
                                        </template>
                                      </v-select>
                                </div>
                            </div>
                        </div>
                        <AgBaseButtonSubmitComponent buttonText="Enregistrer" :loading="loading" />
                    </form>

                </div>   
            </div> 
        </template>
        <template v-slot:ControlSidebar>

        </template>
    </BackOfficePageContent>
</template>
<script>
    import DataService from "@/services/BackOffice/Parametrage/Commune/CommuneDataService";
    import ValidationDonneesServeurService from "@/services/Validation/ValidationDonneesServeurService";
    import 'vue-select/dist/vue-select.css';
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import { useRoute } from 'vue-router';
    import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

    export default {
        name: "CommuneCreateView",
        components: {
            AlertMessageComponent,
            BackOfficePageContent,
            AgBaseInputTextComponent,
            AgBaseButtonSubmitComponent,
            BreadcrumbClusterComponent,
        },
        data() {
            return {
                bdObjet: {
                    titre: "",
                    departement: "",
                },
                departements: [],
                loading: false,
                listeBreadcrumbs: [
                    {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                    {texte: "Communes", nomRoute: "parametrage.communes.list", parametres: {}},
                    {texte: "Créer une commune", nomRoute: "", parametres: {}},
                ],
            };
        },
        methods: {
            bdObjetSave() {
                this.loading = true;
                DataService.create(this.bdObjet)
                        .then(response => {
                            this.loading = false;
                            this.$router.push({name: "parametrage.communes.list", query: {alertSucces: 'Item créé avec succès'}});
                        })
                        .catch(e => {                            
                            ValidationDonneesServeurService.reInitListeChampsFormulaire();
                            let erreurMessage = ValidationDonneesServeurService.traiterStatutErreurEtRetournerMessage(e);
                            this.$refs.refAlerteMessage.setAlerteMessageErreur(erreurMessage);
                            this.loading = false;
                        });
            },
            obtenirDepartements() {
                DataService.getDepartements()
                        .then(response => {
                            this.departements = response.data.data;
                        })
                        .catch(e => {
                        });
            },
        },
        mounted() {
            this.obtenirDepartements();
        },
    };
</script>
