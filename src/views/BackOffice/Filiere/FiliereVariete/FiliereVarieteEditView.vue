<template>
    <BackOfficePageContent nomPage="Editer un variété de filière">
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
                                    <label :for="'filiere_id'">Filière</label>
                                    <v-select
                                        :name="'filiere_id'" 
                                        :label="'titre'" 
                                        v-model="bdObjet.filiere_id"
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
    import DataService from "@/services/BackOffice/Filiere/FiliereVariete/FiliereVarieteDataService";
    import FiliereDataService from "@/services/BackOffice/Filiere/Filiere/FiliereDataService";
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import AgBaseFormTitleComponent from "@/components/Form/Title/AgBaseFormTitleComponent.vue";
    import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
    import AgBaseTextareaComponent from "@/components/Form/Field/AgBaseTextareaComponent.vue";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
    import { useRoute } from 'vue-router';

    export default {
        name: "FiliereVarieteEdit",
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
                    {texte: "Variétés de filière", nomRoute: "filiere.filiere-varietes.list", parametres: {}},
                    {texte: "Editer", nomRoute: "", parametres: {}},
                ],
            };
        },
        methods: {
            bdObjetGet(uuid) {
                DataService.get(uuid)
                        .then(response => {
                            this.bdObjet = response.data.data;
                            this.bdObjet.filiere_id = this.bdObjet.filiere.uuid
                        })
                        .catch(e => {
                        });
            },
            bdObjetSave(e) {
                e.preventDefault();                
                this.loading = true;
                DataService.update(this.bdObjet.uuid, this.bdObjet)
                        .then(response => {
                            //this.$refs.refAlerteMessage.setAlerteMessageSucces('Item a été mis à jour avec succès');
                            this.$router.push({name: "filiere.filiere-varietes.list", query: { alertSucces: 'Item mis à jour avec succès' }});
                            this.loading = false;
                        })
                        .catch(e => {
                            this.loading = false;
                            this.$refs.refAlerteMessage.setAlerteMessageErreur("Erreur lors de la mise à jour de l'item!");
                        });
            },
            obtenirFilieres() {
                FiliereDataService.getAll()
                    .then(response => {
                        this.selectOptionItems = response.data.data;
                    })
                    .catch(e => {
                    });
            },
        },
        mounted() {
            const route = useRoute();
            this.bdObjetGet(route.params.uuid);
            //
            this.obtenirFilieres();
        }
    };
</script>
