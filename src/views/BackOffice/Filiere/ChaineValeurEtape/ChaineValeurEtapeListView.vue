<template>
    <BackOfficeLayoutClusterSlot nomPage="Étape de la chaîne de valeur" >
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
                <div class="card-body">
                    <!-- Title and select START -->
                    <div class="row">
                        <!-- Select option -->
                        <div class="col-md-12 mb-3">
                            <!--AgBaseButtonAddComponent ref="refAgBaseButtonAdd" :routerLink="{name: ''}"/-->
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <v-select :options="chaine_valeurs" :reduce="(option) => option.uuid"
                                          label="titre" v-model="chaine_valeur_id" id="chaine_valeur_id" 
                                          placeholder="Chaînes de valeur"  @update:modelValue="chaineValeurOnChange">
                                    <template #search="{attributes, events}">
                                        <input
                                            class="vs__search"
                                            :required="false"
                                            v-bind="attributes"
                                            v-on="events"
                                            />
                                    </template>
                                </v-select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <!--AgBaseBlocRechercheComponent ref="refAgBaseBlocRecherche" 
                                                          :rechercheObjets="rechercheObjets"/-->
                        </div>
                    </div>
                    <!-- Title and select END -->
                    <div class="table-responsive">
                        <table class="table m-0">
                            <caption class="text-center" v-show="isLoadingTable">
                                <div class="spinner-border" role="status" v-show="isLoadingTable"></div>
                            </caption>
                            <thead>
                                <tr>
                                    <th>Nom de l'étape</th>
                                    <th>Description</th>
                                    <th>Acteurs</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in bdObjets" :key='item'>
                                    <td>
                                        {{ item.etape.titre }}
                                    </td>

                                    <td>{{ item.etape.description }}</td>
                                    <td>
                                        <span v-for="acteur in item.acteurs.data" :key='acteur'>
                                            {{ acteur.prenom }} {{ acteur.nom }}, 
                                        </span>
                                    </td>
                                    <td>
                                        <AgBaseTableButtonShowComponent ref="refAgBaseTableButtonShow" 
                                                                        :routerLink="{name: 'filiere.chaine_valeur_etapes.edit', params: {uuid: item.uuid}, query: {chaine_valeur_id: chaine_valeur_id}}"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

            <ConfirmerSuppressionComponent ref="refAfficherSuppressionModale"
                                           :vConfirmationSuppressionMessage="confirmationSuppressionMessage"
                                           :deleteDonnee="deleteDonnee"
                                           />
        </template>
        <template v-slot:ControlSidebar>

        </template>
    </BackOfficeLayoutClusterSlot>
</template>

<script src="./ChaineValeurEtapeList.js"></script>
