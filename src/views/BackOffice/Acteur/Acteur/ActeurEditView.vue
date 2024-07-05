<template>
    <BackOfficePageContent nomPage="Editer un acteur">
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
                                    <label :for="'acteur_type_id'">Type d'acteur</label>
                                    <v-select
                                        :name="'acteur_type_id'" 
                                        :label="'titre'" 
                                        v-model="bdObjet.acteur_type_id"
                                        :reduce="(option) => option.uuid"
                                        :options="selectOptionItemsActeurType"
                                        :multiple="false"
                                        :selectOptionRequired="true"
                                        />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label :for="'acteur_groupe_id'">Groupe d'acteur</label>
                                    <v-select
                                        :name="'acteur_groupe_id'" 
                                        :label="'titre'" 
                                        v-model="bdObjet.acteur_groupe_id"
                                        :reduce="(option) => option.uuid"
                                        :options="selectOptionItemsActeurGroupe"
                                        :multiple="false"
                                        :selectOptionRequired="true"
                                        />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label :for="'filiere_variete_id'">Variété Filière</label>
                                    <v-select
                                        :name="'filiere_variete_id'" 
                                        :label="'titre'" 
                                        v-model="bdObjet.filiere_variete_id"
                                        :reduce="(option) => option.uuid"
                                        :options="selectOptionItemsFiliereVariete"
                                        :multiple="false"
                                        :selectOptionRequired="true"
                                        />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label :for="'acces_portail'">Accès Portail</label>
                                    <v-select
                                        :name="'acces_portail'" 
                                        :label="'titre'" 
                                        v-model="bdObjet.acces_portail"
                                        :reduce="(option) => option.uuid"
                                        :options="selectOptionItemsAccesPortail"
                                        :multiple="false"
                                        :selectOptionRequired="true"
                                        />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputTextComponent nom="nom" label="Nom" v-model="bdObjet.nom" :required="true" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputTextComponent nom="prenom" label="Prénom" v-model="bdObjet.prenom" :required="true" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label :for="'sexe'">Sexe</label>
                                    <v-select
                                        :name="'sexe'" 
                                        :label="'titre'" 
                                        v-model="bdObjet.sexe"
                                        :reduce="(option) => option.uuid"
                                        :options="selectOptionItemsSexe"
                                        :multiple="false"
                                        :selectOptionRequired="true"
                                        />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputTextComponent nom="age" label="Âge" v-model="bdObjet.age" :required="false" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputTextComponent nom="nom_entreprise" label="Nom d'entreprise" v-model="bdObjet.nom_entreprise" :required="false" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputEmailComponent nom="email" label="E-mail" v-model="bdObjet.email" :required="true" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputTextComponent nom="tel" label="Tél. Fixe" v-model="bdObjet.tel" :required="false" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputTextComponent nom="tel_mobile" label="Tél. Mobile" v-model="bdObjet.tel_mobile" :required="false" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputTextComponent nom="whatsapp" label="N° WhatsApp" v-model="bdObjet.whatsapp" :required="false" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseTextareaComponent nom="adresse" label="Adresse" rows="1" v-model="bdObjet.adresse" :required="false" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseTextareaComponent nom="caracteristique" label="Caractéristique" v-model="bdObjet.caracteristique" :required="false" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseTextareaComponent nom="localisation" label="Localisation" v-model="bdObjet.localisation" :required="false" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputPasswordComponent nom="password" label="Mot de passe" v-model="bdObjet.password" :required="false" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <AgBaseInputPasswordComponent nom="password_confirmation" label="Confirmer Mot de passe" v-model="bdObjet.password_confirmation" :required="false" />
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
    import DataService from "@/services/BackOffice/Acteur/Acteur/ActeurDataService";
    import ActeurGroupeDataService from "@/services/BackOffice/Acteur/ActeurGroupe/ActeurGroupeDataService";
    import ActeurTypeDataService from "@/services/BackOffice/Acteur/ActeurType/ActeurTypeDataService";
    import FiliereVarieteDataService from "@/services/BackOffice/Filiere/FiliereVariete/FiliereVarieteDataService";
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import AgBaseFormTitleComponent from "@/components/Form/Title/AgBaseFormTitleComponent.vue";
    import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
    import AgBaseInputEmailComponent from "@/components/Form/Field/AgBaseInputEmailComponent.vue";
    import AgBaseInputPasswordComponent from "@/components/Form/Field/AgBaseInputPasswordComponent.vue";
    import AgBaseTextareaComponent from "@/components/Form/Field/AgBaseTextareaComponent.vue";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
    import { useRoute } from 'vue-router';

    export default {
        name: "ActeurEdit",
        components: {
            AlertMessageComponent,
            BackOfficePageContent,
            AgBaseFormTitleComponent,
            AgBaseInputTextComponent,
            AgBaseInputEmailComponent,
            AgBaseInputPasswordComponent,
            AgBaseTextareaComponent,
            AgBaseButtonSubmitComponent,
            BreadcrumbClusterComponent,
        },
        data() {
            return {
                bdObjet: {},
                loading: false,
                selectOptionItems: [],
                selectOptionItemsActeurType: [],
                selectOptionItemsActeurGroupe: [],
                selectOptionItemsFiliereVariete: [],
                selectOptionItemsSexe: [
                    {titre: 'Masculin', uuid: 'Masculin'},
                    {titre: 'Féminin', uuid: 'Féminin'},
                ],
                selectOptionItemsAccesPortail: [
                    {titre: 'Pas d\'accès', uuid: 0},
                    {titre: 'Accès', uuid: 1},
                ],
                listeBreadcrumbs: [
                    {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                    {texte: "Acteurs", nomRoute: "acteur.acteurs.list", parametres: {}},
                    {texte: "Editer", nomRoute: "", parametres: {}},
                ],
            };
        },
        methods: {
            bdObjetGet(uuid) {
                DataService.get(uuid)
                        .then(response => {
                            this.bdObjet = response.data.data;
                            this.bdObjet.acteur_type_id = this.bdObjet.acteur_type.uuid
                            this.bdObjet.acteur_groupe_id = this.bdObjet.acteur_groupe.uuid
                            this.bdObjet.filiere_variete_id = this.bdObjet.filiere_variete.uuid
                            // this.bdObjet.acces_portail = this.bdObjet.acces_portail
                            this.bdObjet.sexe = this.bdObjet.sexe
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
                            this.$router.push({name: "acteur.acteurs.list", query: { alertSucces: 'Item mis à jour avec succès' }});
                            this.loading = false;
                        })
                        .catch(e => {
                            this.loading = false;
                            this.$refs.refAlerteMessage.setAlerteMessageErreur("Erreur lors de la mise à jour de l'item!");
                        });
            },
            obtenirActeurTypes() {
                ActeurTypeDataService.getAll()
                    .then(response => {
                        this.selectOptionItemsActeurType = response.data.data;
                    })
                    .catch(e => {
                    });
            },
            obtenirActeurGroupes() {
                ActeurGroupeDataService.getAll()
                    .then(response => {
                        this.selectOptionItemsActeurGroupe = response.data.data;
                    })
                    .catch(e => {
                    });
            },
            obtenirFiliereVarietes() {
                FiliereVarieteDataService.getAll()
                    .then(response => {
                        this.selectOptionItemsFiliereVariete = response.data.data;
                    })
                    .catch(e => {
                    });
            },
        },
        mounted() {
            const route = useRoute();
            this.obtenirActeurTypes();
            this.obtenirActeurGroupes();
            this.obtenirFiliereVarietes();
            this.bdObjetGet(route.params.uuid);
        }
    };
</script>
