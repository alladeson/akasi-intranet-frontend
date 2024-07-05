<template>
    <BackOfficePageContent nomPage="Editer un département">
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
                                    <label :for="'pay_id'">
                                        Pays <span class="text-danger">*</span>
                                    </label>
                                    <v-select :options="pays" :reduce="(option) => option.uuid"
                                              label="titre" v-model="bdObjet.pay_id" id="pay_id">
                                        <template #search="{attributes, events}">
                                            <input
                                                class="vs__search"
                                                :required="!bdObjet.pay_id"
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
    import DataService from "@/services/BackOffice/Parametrage/Departement/DepartementDataService";
    import ValidationDonneesServeurService from "@/services/Validation/ValidationDonneesServeurService";
    import 'vue-select/dist/vue-select.css';
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import { useRoute } from 'vue-router';
    import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

    export default {
        name: "DepartementEditView",
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
                    pay: "",
                },
                uuid: null,
                pays: [],
                loading: false,
                listeBreadcrumbs: [
                    {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                    {texte: "Départements", nomRoute: "parametrage.departements.list", parametres: {}},
                    {texte: "Éditer un département", nomRoute: "", parametres: {}},
                ],
            };
        },
        methods: {
            bdObjetGet(uuid) {
                DataService.get(uuid)
                        .then(response => {
                            this.bdObjet = response.data.data;
                            this.uuid = uuid;
                            this.bdObjet.pay_id = this.bdObjet.pay.uuid
                        })
                        .catch(e => {
                        });
            },
            bdObjetSave() {
                this.loading = true;
                DataService.update(this.uuid, this.bdObjet)
                        .then(response => {
                            this.$router.push({name: "parametrage.departements.list", query: {alertSucces: 'Item mis à jour avec succès'}});
                            this.loading = false;
                        })
                        .catch(e => {
                            ValidationDonneesServeurService.reInitListeChampsFormulaire();
                            let erreurMessage = ValidationDonneesServeurService.traiterStatutErreurEtRetournerMessage(e);
                            this.$refs.refAlerteMessage.setAlerteMessageErreur(erreurMessage);
                            this.loading = false;
                        });
            },
            obtenirPays() {
                DataService.getPays()
                        .then(response => {
                            this.pays = response.data.data;
                        })
                        .catch(e => {
                        });
            },
        },
        mounted() {
            const route = useRoute();
            this.obtenirPays();
            this.bdObjetGet(route.params.uuid);
        }
    };
</script>
