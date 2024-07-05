<template>
    <BackOfficePageContent nomPage="Editer la chaîne de valeur">
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
                                    <AgBaseInputTextComponent nom="code" label="Code" :required="true" v-model="bdObjet.code"/>  
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputTextComponent nom="titre" label="Titre" v-model="bdObjet.titre" :required="true" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label :for="'filiere_variete_id'">
                                        Variété d'ananas <span class="text-danger">*</span>
                                    </label>
                                    <v-select :options="filiere_varietes" :reduce="(option) => option.uuid"
                                              label="titre" v-model="bdObjet.filiere_variete_id" id="filiere_variete_id">
                                        <template #search="{attributes, events}">
                                          <input
                                            class="vs__search"
                                            :required="!bdObjet.filiere_variete_id"
                                            v-bind="attributes"
                                            v-on="events"
                                          />
                                        </template>
                                    </v-select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputDateComponent nom="date_debut" label="Date de début" v-model="bdObjet.date_debut" :required="true" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputDateComponent nom="date_fin" label="Date de fin" v-model="bdObjet.date_fin" :required="false" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseTextareaComponent nom="description" label="Description" :required="false" v-model="bdObjet.description" />
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
    import DataService from "@/services/BackOffice/Filiere/ChaineValeur/ChaineValeurDataService";
    import ValidationDonneesServeurService from "@/services/Validation/ValidationDonneesServeurService";
    import 'vue-select/dist/vue-select.css';
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import { useRoute } from 'vue-router';
    import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
    import AgBaseTextareaComponent from "@/components/Form/Field/AgBaseTextareaComponent.vue";
    import AgBaseInputDateComponent from "@/components/Form/Field/AgBaseInputDateComponent.vue";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

    export default {
        name: "ChaineValeurEdit",
        components: {
            AlertMessageComponent,
            BackOfficePageContent,
            AgBaseInputTextComponent,
            AgBaseTextareaComponent,
            AgBaseButtonSubmitComponent,
            BreadcrumbClusterComponent,
            AgBaseInputDateComponent,
        },
        data() {
            return {
                bdObjet: {
                    code: "",
                    titre: "",
                    description: "",
                },
                uuid: null,
                filiere_varietes: [],
                loading: false,
                listeBreadcrumbs: [
                    {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                    {texte: "Chaînes de valeur", nomRoute: "filiere.chaine_valeurs.list", parametres: {}},
                    {texte: "Editer une chaîne de valeur", nomRoute: "", parametres: {}},
                ],
            };
        },
        methods: {
            bdObjetGet(uuid) {
                DataService.get(uuid)
                        .then(response => {
                            this.bdObjet = response.data.data;
                            this.uuid = uuid;
                            this.bdObjet.filiere_variete_id = this.bdObjet.filiere_variete.uuid
                        })
                        .catch(e => {
                        });
            },
            bdObjetSave() {
                this.loading = true;
                DataService.update(this.uuid, this.bdObjet)
                        .then(response => {
                            this.$router.push({name: "filiere.chaine_valeurs.list", query: {alertSucces: 'Item mis à jour avec succès'}});
                            this.loading = false;
                        })
                        .catch(e => {                            
                            ValidationDonneesServeurService.reInitListeChampsFormulaire();                            
                            let erreurMessage = ValidationDonneesServeurService.traiterStatutErreurEtRetournerMessage(e);                            
                            this.$refs.refAlerteMessage.setAlerteMessageErreur(erreurMessage);
                            this.loading = false;
                        });
            },
            obtenirFiliereVarietes() {
                DataService.getFiliereVarietes()
                        .then(response => {
                            this.filiere_varietes = response.data.data;
                        })
                        .catch(e => {
                        });
            },
        },
        mounted() {
            const route = useRoute();
            this.obtenirFiliereVarietes();
            this.bdObjetGet(route.params.uuid);
        }
    };
</script>
