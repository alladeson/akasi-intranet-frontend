<template>
    <BackOfficePageContent nomPage="Editer une étape">
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
                    <form @submit.prevent="bdObjetSave">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label :for="'etape_base_id'">Etape de base</label>
                                    <v-select
                                        :name="'etape_base_id'" 
                                        :label="'titre'" 
                                        v-model="bdObjet.etape_base_id"
                                        :reduce="(option) => option.uuid"
                                        :options="selectOptionItemsEtapeBase"
                                        :multiple="false"
                                        :selectOptionRequired="true"
                                        />
                                </div>
                            </div>
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
    import DataService from "@/services/BackOffice/Etape/Etape/EtapeDataService";
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import { useRoute } from 'vue-router';
    import AgBaseFormTitleComponent from "@/components/Form/Title/AgBaseFormTitleComponent.vue";
    import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
    import AgBaseTextareaComponent from "@/components/Form/Field/AgBaseTextareaComponent.vue";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

    export default {
        name: "EtapeEdit",
        components: {
            AlertMessageComponent,
            BackOfficePageContent,
            AgBaseFormTitleComponent,
            AgBaseInputTextComponent,
            AgBaseTextareaComponent,
            AgBaseButtonSubmitComponent,
            BreadcrumbClusterComponent,
        },
        data() {
            return {
                bdObjet: {},
                uuid: null,
                loading: false,
                selectOptionItemsEtapeBase: [],
                listeBreadcrumbs: [
                    {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                    {texte: "Étapes", nomRoute: "etape.etapes.list", parametres: {}},
                    {texte: "Editer une étape", nomRoute: "", parametres: {}},
                ],
            };
        },
        methods: {
            bdObjetGet(uuid) {
                DataService.get(uuid)
                        .then(response => {
                            this.bdObjet = response.data.data;
                            this.bdObjet.etape_base_id =  this.bdObjet.etape_base.uuid;
                            this.uuid = uuid;
                        })
                        .catch(e => {
                        });
            },
            bdObjetSave() {
                this.loading = true;
                DataService.update(this.uuid, this.bdObjet)
                        .then(response => {
                            this.$router.push({name: "etape.etapes.list", query: {alertSucces: 'Item mis à jour avec succès'}});
                            this.loading = false;
                        })
                        .catch(e => {
                            this.loading = false;
                            this.$refs.refAlerteMessage.setAlerteMessageErreur("Erreur lors de la mise à jour de l'item!");
                        });
            },
            obtenirEtapeBases() {
                DataService.getAllEtapeBase()
                    .then(response => {
                        this.selectOptionItemsEtapeBase = response.data.data;
                    })
                    .catch(e => {
                    });
            },
        },
        mounted() {
            const route = useRoute();
            this.obtenirEtapeBases();
            this.bdObjetGet(route.params.uuid);
        }
    };
</script>
