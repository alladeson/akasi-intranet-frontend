<template>
    <BackOfficePageContent nomPage="Editer un intervenant">
        <template v-slot:Breadcrumb>
            <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs"/>
        </template>
        <template v-slot:MainContent>
            <div class="row">
                <div class="col-12">            
                    <AlertMessageComponent ref="refAlerteMessage"/>
                </div>
            </div>
                <!-- {{ bdObjet.password }} -->
            <div class="card">
                <div class="card-header border-transparent">
                    <h3 class="card-title"></h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 col-md-12">
                            <form @submit.prevent="bdObjetSave" class="row col-lg-12 col-md-12" id="form-premier">
                                <div class="col col-lg-6 col-md-6">
                                    <fieldset>
                                        <legend>Informations de connexion</legend>
                                        <div class="form-group">
                                            <AgBaseInputTextComponent nom="name" label="Nom" :required="true" v-model="bdObjet.name" minlength="3" maxlength="125" />  
                                        </div>
                                        <div class="form-group">
                                            <AgBaseInputTextComponent nom="prenom" label="Prénom" :required="true" v-model="bdObjet.prenom" minlength="3" maxlength="125"/>
                                        </div>
                                        <div class="form-group">
                                            <AgBaseInputEmailComponent nom="email" label="Email" :required="true" v-model="bdObjet.email" minlength="5" maxlength="125" />
                                        </div>
                                        <div class="form-group">
                                            <AgBaseInputNumberComponent nom="tel_mobile" label="Téléphone mobile" :required="true" v-model="bdObjet.tel_mobile" minlength="7" maxlength="15" />  
                                        </div>
                                        <div class="form-group">
                                            <AgBaseInputNumberComponent nom="tel" label="Téléphone" v-model="bdObjet.tel" :required="true" minlength="7" maxlength="15" />  
                                        </div>
                                        <!-- <div class="form-group">
                                            <AgBaseInputPasswordComponent nom="password" label="Mot de passe" v-model="bdObjet.password" minlength="8" autocomplete="off" />
                                        </div> -->
                                        <div class="form-group">
                                            <label :for="'role_id'">
                                                Rôle <span class="text-danger">*</span> 
                                            </label>
                                            <v-select :options="roles" :reduce="(option) => option.uuid"
                                                    label="display_name" v-model="bdObjet.role_id" id="role_id" required >
                                                <template #search="{attributes, events}">
                                                <input
                                                    class="vs__search"
                                                    :required="!bdObjet.role_id"
                                                    v-bind="attributes"
                                                    v-on="events"
                                                />
                                                </template>
                                            </v-select>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="col col-lg-6 col-md-6">
                                    <fieldset>
                                        <legend>Autres informations</legend>
                                        <div class="form-group">
                                            <AgBaseInputTextComponent nom="adresse_code_civic" label="Adresse Code Civic" v-model="bdObjet.adresse_code_civic" minlength="3" maxlength="10" />  
                                        </div>
                                        <div class="form-group">
                                            <AgBaseInputTextComponent nom="adresse_rue" label="Adresse Rue" v-model="bdObjet.adresse_rue" minlength="3" maxlength="125" />  
                                        </div>
                                        <div class="form-group">
                                            <AgBaseInputTextComponent nom="adresse_apt" label="Adresse Appartement" v-model="bdObjet.adresse_apt" minlength="3" maxlength="10" />  
                                        </div>
                                        <div class="form-group">
                                            <AgBaseInputTextComponent nom="adresse_code_postal" label="Adresse Code Postal" v-model="bdObjet.adresse_code_postal"  minlength="3" maxlength="10" />  
                                        </div>
                                        <div class="form-group">
                                            <AgBaseInputNumberComponent nom="fax" label="Fax" v-model="bdObjet.fax" :required="true" minlength="7" maxlength="15" />  
                                        </div>
                                        <!-- <div class="form-group">
                                            <AgBaseInputPasswordComponent nom="confirm_password" label="Confirmez le mot de passe" v-model="bdObjet.confirm_password" minlength="8" autocomplete="off" />
                                        </div> -->
                                    </fieldset>
                                </div>
                                 <div class="form-group">
                                    <AgBaseButtonSubmitComponent buttonText="Enregistrer" class="float-start" :loading="loading" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:ControlSidebar>

        </template>
    </BackOfficePageContent>
</template>
<script>
    import DataService from "@/services/BackOffice/Acl/User/UserDataService";
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import 'vue-select/dist/vue-select.css';
    import ValidationDonneesServeurService from "@/services/Validation/ValidationDonneesServeurService";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import { useRoute } from 'vue-router';
    import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
    import AgBaseInputEmailComponent from "@/components/Form/Field/AgBaseInputEmailComponent.vue";
    import AgBaseInputPasswordComponent from "@/components/Form/Field/AgBaseInputPasswordComponent.vue";
    import AgBaseInputNumberComponent from "@/components/Form/Field/AgBaseInputNumberComponent.vue";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

    export default {
        name: "UserEdit",
        components: {
            AlertMessageComponent,
            BackOfficePageContent,
            AgBaseInputTextComponent,
            AgBaseInputEmailComponent,
            AgBaseInputPasswordComponent,
            AgBaseInputNumberComponent,
            AgBaseButtonSubmitComponent,
            BreadcrumbClusterComponent,
        },
        data() {
            return {
                bdObjet: {
                    role_id: "",
                },
                uuid: null,
                loading: false,
                roles: [],
                listeBreadcrumbs: [
                    {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                    {texte: "Intervenants", nomRoute: "acl.users.list", parametres: {}},
                    {texte: "Editer un intervenant", nomRoute: "", parametres: {}},
                ],
            };
        },
        methods: {
            bdObjetGet(uuid) {
                DataService.get(uuid)
                        .then(response => {
                            this.bdObjet = response.data.data;
                            this.uuid = uuid;
                            this.bdObjet.role_id = response.data.data.roles[0].uuid;
                        })
                        .catch(e => {
                        });
            },
            bdObjetSave() {
                this.loading = true;
                DataService.update(this.bdObjet.uuid, this.bdObjet)
                        .then(response => {
                            this.$router.push({name: "acl.users.list", query: { alertSucces: 'Intervenant mis à jour avec succès' }});
                            this.loading = false;
                        })
                        .catch(e => {
                            ValidationDonneesServeurService.reInitListeChampsFormulaire();
                            let erreurMessage = ValidationDonneesServeurService.traiterStatutErreurEtRetournerMessage(e);
                            this.$refs.refAlerteMessage.setAlerteMessageErreur(erreurMessage);
                            this.loading = false;
                        });
            },
            obtenirRoles() {
                DataService.getRoles()
                        .then(response => {
                            this.roles = response.data.data;
                        })
                        .catch(e => {
                        });
            },
        },
        mounted() {
            const route = useRoute();
            this.bdObjetGet(route.params.uuid);
            this.obtenirRoles();
        }
    };
</script>
