<template>
    <BackOfficePageContent nomPage="Détails d'étape">
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
                    <div class="row">                        
                        <div class="col-12">
                            <AgBaseButtonAddComponent ref="refAgBaseButtonAdd" :routerLink="{name: 'etape.etape-details.create'}"/>
                        </div>
                        <div class="col-md-6">
                            <!-- Autres filtres -->
                        </div>
                        <div class="col-md-6">
                            <AgBaseBlocRechercheComponent ref="refAgBaseBlocRecherche" 
                                                          :rechercheObjets="rechercheObjets"/>
                        </div>
                        <div class="col-md-12">
                            <AgBaseTableComponent :colonnesTable='colonnesTable' 
                                                  :bdObjets="bdObjets" 
                                                  :isLoadingTable="isLoadingTable" 
                                                  :boutonsAction="boutonsAction" 
                                                  :setUuid="setUuid" 
                                                  :paginationMetaData="paginationMetaData" 
                                                  :setNumeroPageOnClick="setNumeroPageOnClick" 
                                                  />
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmerSuppressionComponent ref="refAfficherSuppressionModale"
                                           :deleteDonnee="deleteDonnee"
                                           />
        </template>
        <template v-slot:ControlSidebar>

        </template>
    </BackOfficePageContent>
</template>
<script>
    import DataService from "@/services/BackOffice/Etape/EtapeDetail/EtapeDetailDataService";
    import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
    import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import AgBaseTableComponent from '@/components/Table/AgBaseTableComponent.vue'
    import AgBaseBlocRechercheComponent from "@/components/Form/Field/AgBaseBlocRechercheComponent.vue";
    import AgBaseButtonAddComponent from "@/components/Form/Button/AgBaseButtonAddComponent.vue";
    import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";

    import { useRoute } from 'vue-router';

    export default {
        components: {
            BackOfficePageContent,
            ConfirmerSuppressionComponent,
            AlertMessageComponent,
            AgBaseTableComponent,
            AgBaseBlocRechercheComponent,
            AgBaseButtonAddComponent,
            BreadcrumbClusterComponent,
        },
        name: "EtapeDetailListe",
        data() {
            return {
                alert: {
                    alertErreur: "",
                    alertSucces: "",
                    alerteInfo: "",
                    alerteAvertissement: "",
                },
                bdObjets: [], //Ne pas changer le nom
                colonnesTable: {},
                isLoadingTable: true,
                uuid: "",
                boutonsAction: [
                    //{nom: "show", nomRoute: "etape.etape-details.edit", classe: "btn btn-secondary btn-sm"},
                    {nom: "edit", nomRoute: "etape.etape-details.edit", classe: ""},
                    {nom: "delete", nomRoute: "", classe: ""},
                ],
                listeBreadcrumbs: [
                    {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                    {texte: "Détails d'étape", nomRoute: "", parametres: {}},
                ],
                paginationMetaData: [],
                pageCourante: 1,
                queryParameterServer: "?page=1",
            };
        },
        methods: {
            setNumeroPageOnClick(pageNum) {
                this.pageCourante = pageNum;
                this.setQueryParameters();
                this.bdObjets = [];
                this.isLoadingTable = true;
                this.refreshList();
            },
            setQueryParameters() {
                this.queryParameterServer = "?page=" + this.pageCourante;
            },
            obtenirListe() {
                DataService.getAll(this.queryParameterServer)
                        .then(response => {
                            this.bdObjets = response.data.data;
                            this.paginationMetaData = response.data.meta;
                            this.isLoadingTable = false;
                            this.colonnesTable = response.data.colonnesTableAffichable
                        })
                        .catch(e => {
                        });
            },
            setUuid(uuid) {
                this.uuid = uuid;
            },
            deleteDonnee() {
                DataService.delete(this.uuid)
                        .then(response => {
                            this.$refs.refAfficherSuppressionModale.fermerModale();
                            this.refreshList();
                        })
                        .catch(e => {
                        });
            },
            refreshList() {
                this.obtenirListe();
            },
            setAlertesMessage() {
                const route = useRoute();
                this.alert.alertErreur = (route.query.alertErreur ? route.query.alertErreur : "");
                this.alert.alertSucces = (route.query.alertSucces ? route.query.alertSucces : "");
                this.alert.alerteInfo = (route.query.alerteInfo ? route.query.alerteInfo : "");
                this.alert.alerteAvertissement = (route.query.alerteAvertissement ? route.query.alerteAvertissement : "");

                this.$refs.refAlerteMessage.setAlerteMessageErreur(this.alert.alertErreur);
                this.$refs.refAlerteMessage.setAlerteMessageSucces(this.alert.alertSucces);
                this.$refs.refAlerteMessage.setAlerteMessageInfo(this.alert.alerteInfo);
                this.$refs.refAlerteMessage.setAlerteMessageAvertissement(this.alert.alerteAvertissement);

                this.nettoyerAlertesMessageUrl();
            },
            nettoyerAlertesMessageUrl() {
                this.$router.replace({'alertErreur': null});
                this.$router.replace({'alertSucces': null});
                this.$router.replace({'alerteInfo': null});
                this.$router.replace({'alerteAvertissement': null});
            },
            rechercheObjets() {
                return;
                DataService.recherche("")
                        .then(response => {
                            this.bdObjets = response.data.data;
                        })
                        .catch(e => {
                        });
            }
        },
        mounted() {
            this.setAlertesMessage();

            this.refreshList();
        },
    };

</script>