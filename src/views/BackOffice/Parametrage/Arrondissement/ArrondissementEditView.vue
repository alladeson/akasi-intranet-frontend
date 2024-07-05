<template>
    <BackOfficePageContent nomPage="Editer un arrondissement">
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
                                    <label :for="'commune_id'">
                                        Commune <span class="text-danger">*</span>
                                    </label>
                                    <v-select :options="communes" :reduce="(option) => option.uuid"
                                              label="titre" v-model="bdObjet.commune_id" id="commune_id">
                                        <template #search="{attributes, events}">
                                            <input
                                                class="vs__search"
                                                :required="!bdObjet.commune_id"
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
    import DataService from "@/services/BackOffice/Parametrage/Arrondissement/ArrondissementDataService";
    import ValidationDonneesServeurService from "@/services/Validation/ValidationDonneesServeurService";
    import 'vue-select/dist/vue-select.css';
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import { useRoute } from 'vue-router';
    import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

    export default {
        name: "ArrondissementEditView",
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
                    commune: "",
                },
                uuid: null,
                communes: [],
                loading: false,
                listeBreadcrumbs: [
                    {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                    {texte: "Arrondissements", nomRoute: "parametrage.arrondissements.list", parametres: {}},
                    {texte: "Éditer un arrondissement", nomRoute: "", parametres: {}},
                ],
            };
        },
        methods: {
            bdObjetGet(uuid) {
                DataService.get(uuid)
                        .then(response => {
                            this.bdObjet = response.data.data;
                            this.uuid = uuid;
                            this.bdObjet.commune_id = this.bdObjet.commune.uuid
                        })
                        .catch(e => {
                        });
            },
            bdObjetSave() {
                this.loading = true;
                DataService.update(this.uuid, this.bdObjet)
                        .then(response => {
                            this.$router.push({name: "parametrage.arrondissements.list", query: {alertSucces: 'Item mis à jour avec succès'}});
                            this.loading = false;
                        })
                        .catch(e => {
                            ValidationDonneesServeurService.reInitListeChampsFormulaire();
                            let erreurMessage = ValidationDonneesServeurService.traiterStatutErreurEtRetournerMessage(e);
                            this.$refs.refAlerteMessage.setAlerteMessageErreur(erreurMessage);
                            this.loading = false;
                        });
            },
            obtenirCommunes() {
                DataService.getCommunes()
                        .then(response => {
                            this.communes = response.data.data;
                        })
                        .catch(e => {
                        });
            },
        },
        mounted() {
            const route = useRoute();
            this.obtenirCommunes();
            this.bdObjetGet(route.params.uuid);
        }
    };
</script>
