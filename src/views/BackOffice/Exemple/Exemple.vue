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

    <div v-if="currentExemple" class="edit-form">
        <h4>Exemple</h4>
        <form>
            <div class="form-group">
                <label for="titre">Titre</label>
                <input type="text" class="form-control" id="titre"
                       v-model="currentExemple.titre"
                       />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description"
                       v-model="currentExemple.description"
                       />
            </div>
            <div class="form-group">
                <label><strong>Status:</strong></label>
                {{ currentExemple.published ? "Published" : "Pending" }}
            </div>
        </form>
        <button class="btn btn-primary mr-2"
                v-if="currentExemple.published"
                @click="updatePublished(false)"
                >
            UnPublish
        </button>
        <button v-else class="btn btn-primary mr-2" @click="updatePublished(true)">
            Publish
        </button>
        <button class="btn btn-danger mr-2" data-bs-toggle="modal" data-bs-target="#confirmerSuppressionModale">
            Delete
        </button>
        <button type="submit" class="btn btn-primary" @click="updateExemple" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Soumettre</span>
        </button>
        <p>{{ message }}</p>
    </div>
    <div v-else>
        <br />
        <p>Please click on a Exemple...</p>
    </div>
    
    <ConfirmerSuppressionComponent 
        :vConfirmationSuppressionMessage="confirmationSuppressionMessage"
        :deleteExemple="deleteExemple"
        :vAfficherSuppressionModale="vAfficherSuppressionModale"
    />
</template>
<script>
    import ExempleDataService from "@/services/BackOffice/Exemple/ExempleDataService";
    import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
    import { useRoute } from 'vue-router';
    
    export default {
        name: "exemple",
        components: { 
            ConfirmerSuppressionComponent 
        },
        data() {
            return {
                confirmationSuppressionMessage: "Êtes-vous sûr de vouloir supprimer l'item ?",
                vAfficherSuppressionModale: true,
                uuid: null,
                currentExemple: null,
                message: '',
                loading: false,
            };
        },
        methods: {
            getExemple(uuid) {
                ExempleDataService.get(uuid)
                        .then(response => {
                            this.currentExemple = response.data.data;
                        })
                        .catch(e => {
                        });
            },
            updatePublished(status) {
                var data = {
                    uuid: this.currentExemple.uuid,
                    titre: this.currentExemple.titre,
                    description: this.currentExemple.description,
                    published: status
                };
                ExempleDataService.update(this.currentExemple.uuid, data)
                        .then(response => {
                            this.currentExemple.published = status;
                            this.message = 'The status was updated successfully!';
                        })
                        .catch(e => {
                        });
            },
            updateExemple() {
                this.loading = true;
                ExempleDataService.update(this.currentExemple.uuid, this.currentExemple)
                        .then(response => {
                            this.message = 'The exemple was updated successfully!';
                            this.loading = false;
                        })
                        .catch(e => {
                            this.loading = false;
                        });
            },
            deleteExemple() {
                ExempleDataService.delete(this.currentExemple.uuid)
                        .then(response => {
                            this.vAfficherSuppressionModale = false;
                            this.$router.push({name: "exemples"});
                        })
                        .catch(e => {
                            this.vAfficherSuppressionModale = false;
                        });
            }
        },
        mounted() {
            this.message = '';
            const route = useRoute();
            this.getExemple(route.params.uuid);
        }
    };
</script>
<style>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
</style>