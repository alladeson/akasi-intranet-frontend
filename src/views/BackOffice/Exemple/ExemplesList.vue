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


    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by title"
                       v-model="titre"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="searchTitle"
                            >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Exemples List</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(exemple, index) in exemples"
                    :key="index"
                    @click="setActiveExemple(exemple, index)"
                    >
                    {{ exemple.code }} <br>
                    {{ exemple.titre }} <br>
                    {{ exemple.description }}                    
                </li>
            </ul>
            <button class="m-3 btn btn-sm btn-danger" @click="removeAllExemples">
                Remove All
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentExemple">
                <h4>Exemple</h4>
                <div>
                    <label><strong>Titre:</strong></label> {{ currentExemple.titre }}
                </div>
                <div>
                    <label><strong>Description:</strong></label> {{ currentExemple.description }}
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ currentExemple.published ? "Published" : "Pending" }}
                </div>
                <router-link :to="{name: 'exemple-details', params: {uuid: currentExemple.uuid}}" class="btn btn-warning btn-sm">Edit</router-link>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Exemple...</p>
            </div>
        </div>
    </div>
</template>
<script>
    import ExempleDataService from "@/services/BackOffice/Exemple/ExempleDataService";
    export default {
        name: "exemples-list",
        data() {
            return {
                exemples: [],
                currentExemple: null,
                currentIndex: -1,
                titre: ""
            };
        },
        methods: {
            retrieveExemples() {
                ExempleDataService.getAll()
                        .then(response => {
                            this.exemples = response.data.data;
                        })
                        .catch(e => {
                        });
            },
            refreshList() {
                this.retrieveExemples();
                this.currentExemple = null;
                this.currentIndex = -1;
            },
            setActiveExemple(exemple, index) {
                this.currentExemple = exemple;
                this.currentIndex = exemple ? index : -1;
            },
            removeAllExemples() {
                ExempleDataService.deleteAll()
                        .then(response => {
                            this.refreshList();
                        })
                        .catch(e => {
                        });
            },

            searchTitle() {
                ExempleDataService.findByTitle(this.titre)
                        .then(response => {
                            this.exemples = response.data.data;
                            this.setActiveExemple(null);
                        })
                        .catch(e => {
                        });
            }
        },
        mounted() {
            this.retrieveExemples();
        }
    };
</script>
<style>
    .list {
        text-align: left;
        max-width: 750px;
        margin: auto;
    }
</style>