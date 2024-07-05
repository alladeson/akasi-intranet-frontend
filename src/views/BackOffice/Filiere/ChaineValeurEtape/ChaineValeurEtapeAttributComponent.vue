<template>
    <div :id="'collapse-'+item.uuid" class="accordion-collapse collapse" :aria-labelledby="'heading-'+item.uuid" :data-bs-parent="'#'+databsparent">
        <div class="accordion-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="card card-Sub bg-transparent border rounded-3">
                        <div class="card-header">
                            <h3 class="card-title">Finir la phase </h3>
                        </div>
                        
                        <AlertMessageComponent ref="refAlerteMessage"/>
                        
                        <form @submit.prevent="bdObjetSaveEtapeDetail" id="form-premier">
                            <!--input type="hidden" 
                                       :value="item.uuid" 
                                        name="chaine_valeur_etape_detail_id"
                                        -->
                            <div class="row p-3">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                        <input type="checkbox" class="custom-control-input" 
                                                       :checked="item.complete"
                                                       name="complete"
                                                       true-value="1"
                                                       false-value="0"
                                                       @input="event => complete = event.target.value"
                                                       :required="false"
                                                       :id="'complete-'+item.uuid">
                                            <label class="custom-control-label" :for="'complete-'+item.uuid">Complété ?</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <AgBaseInputDateComponent nom="complete_date" label="À quelle date?" :required="false" v-model="item.complete_date"/>
                                    </div>
                                </div>
                                <div class="col-sm-12 p-1 d-grid">
                                    <AgBaseTextareaComponent nom="observation" label="Observations" :rows="2" v-model="item.observation" :required="false" />
                                </div>
                                <div class="col-sm-6 p-1 mt-2">
                                    <AgBaseButtonSubmitComponent buttonText="Enregistrer" :loading="loadingFinirPhase" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-Sub bg-transparent border rounded-3 mb-4 z-index-9 ms-1">
                        <!-- Card header START -->
                        <div class="card-header">
                            <h3 class="card-title">Renseignez les attributs de cette phase</h3>
                        </div>
                        <div class="card-body">
                            <div class="col-md-12 text-center" v-show="loadingCVEDA">
                                <div class="spinner-border" role="status" v-show="loadingCVEDA"></div>
                            </div>
                            <!-- Form START -->
                            <form v-for="cveda in chaine_valeur_etape_detail_attributs" :key='cveda' 
                                  @submit.prevent="bdObjetSubmitAttribut" :ref="'form-'+cveda.uuid">
                                <input type="hidden" 
                                       :value="cveda.uuid" 
                                        name="chaine_valeur_etape_detail_attribut_id"
                                        >
                                <div class="form-group row">
                                    <div class="col-md-6">
                                        <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                            <input type="checkbox" class="custom-control-input" 
                                                   :disabled="item.complete"
                                                   :readonly="item.complete"
                                                   
                                                   :checked="cveda.effectue"
                                                   name="effectue"
                                                   true-value="1"
                                                   false-value="0"
                                                   :value="cveda.effectue" 
                                                   @input="event => effectue = event.target.value"
                                                   :id="'effectue-'+cveda.uuid"
                                                   @change="checkChaineValeurEtapeDetailAttribut('form-'+cveda.uuid)">
                                            <label class="custom-control-label" :for="'effectue-'+cveda.uuid">{{ cveda.etape_detail_attribut.titre }}</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-group input-group-sm">
                                            <input type="text" class="form-control" 
                                                   :disabled="item.complete"
                                                   :readonly="item.complete"
                                                   
                                                   name="observation"
                                                   :value="cveda.observation" 
                                                   @input="event => observation = event.target.value"
                                                   placeholder="Observation">
                                            <span class="input-group-append">
                                                <button type="submit" class="btn Sub btn-flat" name="btnSubmitFormAttribut"
                                                        :disabled="item.complete || loading"
                                                        >
                                                    <span v-show="loading" class="spinner-border spinner-border-sm">&nbsp;</span>
                                                    OK
                                                </button>
                                                <AgBaseTableButtonDeleteComponent ref="refAgBaseTableButtonDelete" :uuid="cveda.uuid" :setUuid="setUuid" 
                                                                                  v-show="!item.complete"/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <!-- Form END --> 
                    </div>
                    </div>
                </div>
            </div>
        </div>						
    </div>
    <ConfirmerSuppressionComponent ref="refAfficherSuppressionModale"
                                   :deleteDonnee="deleteDonnee"
                                   />
</template>
<script>
    import DataService from "@/services/BackOffice/Filiere/ChaineValeurEtape/ChaineValeurEtapeDataService";
    import ChaineValeurEtapeDetailDataService from "@/services/BackOffice/Filiere/ChaineValeurEtape/ChaineValeurEtapeDetailDataService";
    import ChaineValeurEtapeDetailAttributDataService from "@/services/BackOffice/Filiere/ChaineValeurEtape/ChaineValeurEtapeDetailAttributDataService";
    import ValidationDonneesServeurService from "@/services/Validation/ValidationDonneesServeurService";
    import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
    import ConfirmerSuppressionComponent from "@/components/Modale/ConfirmerSuppressionModaleComponent.vue";
    import AgBaseTableButtonDeleteComponent from '@/components/Table/AgBaseTableButtonDeleteComponent.vue'
    import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
    import AgBaseInputDateComponent from "@/components/Form/Field/AgBaseInputDateComponent.vue";
    import AgBaseTextareaComponent from "@/components/Form/Field/AgBaseTextareaComponent.vue";
    export default {
        name: "ChaineValeurEtapeAttributComponent",
        components: {
            AgBaseButtonSubmitComponent,
            ConfirmerSuppressionComponent,
            AgBaseTableButtonDeleteComponent,
            AgBaseInputDateComponent,
            AgBaseTextareaComponent,
            AlertMessageComponent,
        },
        props: {
            item: {
                type: Object,
            },
            databsparent: {
                type: String,
                default: "accordionChaineValeurEtapes",
            },
        },
        data: function () {
            return {
                chaine_valeur_etape_detail_attributs: [],
                loading: false,
                loadingFinirPhase: false,
                loadingCVEDA: false,
                uuid: null,
            }
        },
        methods: {
            bdObjetSaveEtapeDetail(event) {
                this.loadingFinirPhase = true;
                let donnee = {
                    complete: event.target.elements.complete.checked ? 1 : 0,
                    complete_date: this.item.complete_date,
                    observation: this.item.observation,
                };
                ValidationDonneesServeurService.reInitListeChampsFormulaire();
                ChaineValeurEtapeDetailDataService.update(this.item.uuid, donnee)
                        .then(response => {
                            this.item.complete = response.data.data.complete;
                            this.item.complete_date = response.data.data.complete_date;
                            this.item.observation = response.data.data.observation;
                            this.loadingFinirPhase = false;
                        })
                        .catch(e => {
                            ValidationDonneesServeurService.reInitListeChampsFormulaire();
                            let erreurMessage = ValidationDonneesServeurService.traiterStatutErreurEtRetournerMessage(e);
                            this.$refs.refAlerteMessage.setAlerteMessageErreur(erreurMessage);
                            this.loadingFinirPhase = false;
                        });
            },
            setUuid(uuid) {
                this.uuid = uuid;
            },
            deleteDonnee() {
                ChaineValeurEtapeDetailAttributDataService.delete(this.uuid)
                    .then(response => {
                        this.$refs.refAfficherSuppressionModale.fermerModale();
                        this.refreshList();
                    })
                    .catch(e => {
                        this.$refs.refAfficherSuppressionModale.fermerModale();
                    });
            },
            enableElementsAttributForm(elements){
                elements.effectue.disabled = false;
                elements.observation.disabled = false;
                elements.btnSubmitFormAttribut.disabled = false;
            },
            disableElementsAttributForm(elements){
                elements.effectue.disabled = true;
                elements.observation.disabled = true;
                elements.btnSubmitFormAttribut.disabled = true;
            },
            getDataFromElementsAttributForm(elements){
                let effectue = elements.effectue.checked;
                effectue = effectue ? 1 : 0;
                let donnee = {
                    effectue: effectue,
                    observation: elements.observation.value,
                };
                return donnee;
            },
            checkChaineValeurEtapeDetailAttribut(formRefId) {
                let elements = this.$refs[formRefId][0].elements;
                this.bdObjetSaveChaineValeurEtapeDetailAttribut(elements);
            },
            bdObjetSubmitAttribut(submitEvent) {
                this.bdObjetSaveChaineValeurEtapeDetailAttribut(submitEvent.target.elements);
            },
            bdObjetSaveChaineValeurEtapeDetailAttribut(elements) {
                let cvedaId = elements.chaine_valeur_etape_detail_attribut_id.value;
                let donnee = this.getDataFromElementsAttributForm(elements);
                this.disableElementsAttributForm(elements);
                DataService.updateChaineValeurEtapeDetailAttribut(cvedaId, donnee)
                        .then(response => {
                            this.enableElementsAttributForm(elements);
                        })
                        .catch(e => {
                            this.enableElementsAttributForm(elements);
                        });
            },
            obtenirChaineValeurEtapeDetailAttributs(chaine_valeur_etape_detail_id) {
                this.loadingCVEDA = true;
                DataService.getChaineValeurEtapeDetailAttributs(chaine_valeur_etape_detail_id)
                        .then(response => {
                            this.chaine_valeur_etape_detail_attributs = response.data.data;
                            this.loadingCVEDA = false;
                        })
                        .catch(e => {
                            this.loadingCVEDA = false;
                        });
            },
            refreshList(){
                this.obtenirChaineValeurEtapeDetailAttributs(this.item.uuid);
            },
        },
        created() {
        },
        mounted() {
            this.refreshList();
        }
    }
</script>
