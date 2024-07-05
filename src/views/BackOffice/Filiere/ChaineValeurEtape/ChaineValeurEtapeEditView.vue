<template>
    <BackOfficePageContent nomPage="Informations sur l'étape">
        <template v-slot:Breadcrumb>
            <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs"/>
        </template>
        <template v-slot:MainContent>
            <div class="row">
                <div class="col-12">            
                    <AlertMessageComponent ref="refAlerteMessage"/>
                </div>
            </div>

            <div class="row g-4 mb-4">

                <div class="col-xxl-12">
                    <div class="card shadow h-100">
                        <div class="card-header">
                            <h4 class="text-center">Chaîne de valeur</h4>
                            <div class="row">
                                <div class="col-md-3">
                                    <label class="form-label">Numéro</label>
                                    <p>{{ bdObjet.chaine_valeur.code }}</p>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label">Titre</label>
                                    <p>{{ bdObjet.chaine_valeur.titre }}</p>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label">Description</label>
                                    <p>{{ !bdObjet.chaine_valeur.description ? bdObjet.chaine_valeur.description : bdObjet.chaine_valeur.description.substring(0,50)+"..." }}</p>
                                </div>
                                <div class="col-md-12 text-center" v-show="loading">
                                    <div class="spinner-border" role="status" v-show="loading"></div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">

                            <div class="row">
                                <div class="col-md-4 d-grid"> 
                                    <label class="form-label">Étape</label>
                                    <p>
                                        {{ bdObjet.etape.titre }} <br> 
                                        {{ !bdObjet.etape.description ? bdObjet.etape.description : bdObjet.etape.description.substring(0,50)+"..." }}
                                    </p>
                                </div>
                                <div class="col-md-4 d-grid"> 
                                    <label class="form-label">Acteurs</label>
                                    <p v-for="acteur in acteurs.data" :key='acteur'>
                                        {{ acteur.prenom }} {{ acteur.nom }}, <br>
                                        {{ acteur.filiere_variete.titre }}, <br>
                                    </p>
                                </div>
                                <div class="col-md-4 d-grid"> 
                                    <label class="form-label">Complété?</label>
                                    <p>{{ bdObjet.complete ? 'Oui' : 'Non' }}</p>
                                    <p>{{ bdObjet.complete_date }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-xxl-12">
                    <div class="card shadow h-100">
                        <div class="card-body">

                            <div class="accordion" id="accordionChaineValeurEtapes">
                                <div class="col-md-12 text-center" v-show="loadingCVED">
                                    <div class="spinner-border" role="status" v-show="loadingCVED"></div>
                                </div>
                                <!-- Item -->
                                <div class="accordion-item mb-3" v-for="item in chaine_valeur_etape_details" :key='item'>
                                    <h6 class="accordion-header" :id="'heading-'+item.uuid">
                                        <button class="accordion-button fw-bold rounded" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-'+item.uuid" aria-expanded="true" :aria-controls="'collapse-'+item.uuid">
                                            {{ item.etape_detail.titre }}
                                        </button>
                                    </h6>
                                    <!-- Body -->
                                    <ChaineValeurEtapeAttributComponent databsparent="accordionChaineValeurEtapes" :item="item"/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- Chart and Ticket END -->

            </div>
        </template>
        <template v-slot:ControlSidebar>

        </template>
    </BackOfficePageContent>
</template>
<script>
    import DataService from "@/services/BackOffice/Filiere/ChaineValeurEtape/ChaineValeurEtapeDataService";
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import { useRoute } from 'vue-router';
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
    import ChaineValeurEtapeAttributComponent from "@/views/BackOffice/Filiere/ChaineValeurEtape/ChaineValeurEtapeAttributComponent.vue";

    export default {
        name: "EtapeEdit",
        components: {
            AlertMessageComponent,
            BackOfficePageContent,
            BreadcrumbClusterComponent,
            ChaineValeurEtapeAttributComponent,
        },
        data() {
            return {
                bdObjet: {
                    chaine_valeur: {
                        titre: "",
                        description: "",
                    },
                    etape: {
                        titre: "",
                        description: "",
                    },
                },
                acteurs: [],
                uuid: null,
                loading: false,
                loadingCVED: false,
                chaine_valeur_id: null,
                chaine_valeur_etape_details: [],
                listeBreadcrumbs: [],
            };
        },
        methods: {
            bdObjetGet(uuid) {
                this.loading = true;
                DataService.get(uuid)
                        .then(response => {
                            this.bdObjet = response.data.data;
                            this.acteurs = response.data.data.acteurs;
                            this.uuid = uuid;
                            this.loading = false;
                        })
                        .catch(e => {
                            this.loading = false;
                        });
            },
            setListeBreadcrumbs() {
                return [
                        {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                        {texte: "Chaîne de valeur", nomRoute: "filiere.chaine_valeurs.list", parametres: {}},
                        {texte: "Étapes", nomRoute: "filiere.chaine_valeur_etapes.list", parametres: {}, queries: {chaine_valeur_id: this.chaine_valeur_id}},
                        {texte: "Étape", nomRoute: "", parametres: {}},
                    ];
            },
            obtenirChaineValeurEtapeDetails(uuid) {
                this.loadingCVED = true;
                DataService.getChaineValeurEtapeDetails(uuid)
                        .then(response => {
                            this.chaine_valeur_etape_details = response.data.data;
                            this.loadingCVED = false;
                        })
                        .catch(e => {
                            this.loadingCVED = false;
                        });
            },
        },
        mounted() {
            const route = useRoute();
            this.chaine_valeur_id = route.query.chaine_valeur_id;
            this.uuid = route.params.uuid;
            this.listeBreadcrumbs = this.setListeBreadcrumbs();
            this.bdObjetGet(this.uuid);
            this.obtenirChaineValeurEtapeDetails(this.uuid);
        }
    };
</script>
