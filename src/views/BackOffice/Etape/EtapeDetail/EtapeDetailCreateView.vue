<template>
    <BackOfficePageContent nomPage="Ajouter un détail d'étape">
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
                                    <label :for="'etape_id'">Etape</label>
                                    <v-select
                                        :name="'etape_id'" 
                                        :label="'titre'" 
                                        v-model="bdObjet.etape_id"
                                        :reduce="(option) => option.uuid"
                                        :options="selectOptionItems"
                                        :multiple="false"
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
    import DataService from "@/services/BackOffice/Etape/EtapeDetail/EtapeDetailDataService";
    import EtapeDataService from "@/services/BackOffice/Etape/Etape/EtapeDataService";
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import AgBaseFormTitleComponent from "@/components/Form/Title/AgBaseFormTitleComponent.vue";
    import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
    import AgBaseTextareaComponent from "@/components/Form/Field/AgBaseTextareaComponent.vue";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

    export default {
        name: "EtapeDetailCreate",
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
                loading: false,
                selectOptionItems: [],
                listeBreadcrumbs: [
                    {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                    {texte: "Détails d'étape", nomRoute: "etape.etape-details.list", parametres: {}},
                    {texte: "Ajouter", nomRoute: "", parametres: {}},
                ],
            };
        },
        methods: {
            bdObjetSave() {
                this.loading = true;
                DataService.create(this.bdObjet)
                        .then(response => {
                            this.bdObjet.uuid = response.data.data.uuid;
                            this.loading = false;
                            this.$router.push({name: "etape.etape-details.list", query: {alertSucces: 'Item créé avec succès'}});
                        })
                        .catch(e => {
                            this.loading = false;
                            this.$refs.refAlerteMessage.setAlerteMessageErreur("Erreur lors de la création de l'item!");
                        });
            },
            obtenirEtapes() {
                EtapeDataService.getAll()
                    .then(response => {
                        this.selectOptionItems = response.data.data;
                    })
                    .catch(e => {
                    });
            },
        },
        mounted() {
            this.obtenirEtapes();
        },
    };
</script>