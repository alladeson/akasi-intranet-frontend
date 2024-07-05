<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">eAgroTrace</router-link>
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
            <router-link to="/exemples" class="nav-link">Exemples</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/add" class="nav-link">Add</router-link>
            </li>
        </div>
    </nav>

    <div class="submit-form">
        <AgBaseSelectComponent ref="refAgBaseSelectComponent"
                      :label="'Label qui saffiche en haut du select'"
                      :selectName="'nomBaseDeDonneeDuSelect'"
                      :selectOptionText="'titreAffichePourUtilisateurChampBD'"
                      :selectOptionItems="selectOptionItems"
                      :selectOptionMultiple="false"
                      :selectOptionRequired="true"
                      />
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Code</label>
                <input
                    type="text"
                    class="form-control"
                    id="code"
                    required
                    v-model="exemple.code"
                    name="code"
                    />
            </div>
            <div class="form-group">
                <label for="title">Titre</label>
                <input
                    type="text"
                    class="form-control"
                    id="titre"
                    required
                    v-model="exemple.titre"
                    name="titre"
                    />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input
                    class="form-control"
                    id="description"
                    required
                    v-model="exemple.description"
                    name="description"
                    />
            </div>
            <button @click="saveExemple" class="btn btn-success" :disabled="loading">
                <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                    ></span>
                <span>Enregister</span>
            </button>
        </div>
        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newExemple">Add</button>
        </div>
    </div>
</template>
<script>
    import AgBaseSelectComponent from "@/components/Form/Field/AgBaseSelectComponent.vue";
    import ExempleDataService from "@/services/BackOffice/Exemple/ExempleDataService";
    export default {
        name: "add-exemple",
        components: {
            AgBaseSelectComponent,
        },
        data() {
            return {
                exemple: {
                    uuid: null,
                    code: "",
                    titre: "",
                    description: "",
                    published: false
                },
                loading: false,
                submitted: false,
                selectOptionItems: [
                    {titreAffichePourUtilisateurChampBD: 'One', uuid: 1},
                    {titreAffichePourUtilisateurChampBD: 'Two', uuid: 2},
                ],

            };
        },
        methods: {
            saveExemple() {
                this.loading = true;
                var data = {
                    code: this.exemple.code,
                    titre: this.exemple.titre,
                    description: this.exemple.description
                };
                ExempleDataService.create(data)
                        .then(response => {
                            this.exemple.uuid = response.data.data.uuid;
                            this.submitted = true;
                            this.loading = false;
                        })
                        .catch(e => {
                            this.loading = false;
                        });
            },

            newExemple() {
                this.submitted = false;
                this.exemple = {};
            }
        }
    };
</script>
<style>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
</style>