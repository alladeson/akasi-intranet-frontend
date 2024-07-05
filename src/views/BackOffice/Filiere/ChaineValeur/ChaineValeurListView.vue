<template>
    <BackOfficeLayoutClusterSlot nomPage="Chaînes de valeur" >
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
                    <h3 class="card-title">Liste de progression des chaînes de valeur</h3>
                </div>

                <div class="card-body">
                    <!-- Title and select START -->
                    <div class="row">
                        <!-- Select option -->
                        <div class="col-md-12">
                            <AgBaseButtonAddComponent ref="refAgBaseButtonAdd" :routerLink="{name: 'filiere.chaine_valeurs.create'}"/>
                        </div>
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-6">
                            <AgBaseBlocRechercheComponent ref="refAgBaseBlocRecherche" 
                                                          :rechercheObjets="rechercheObjets"/>
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
                                    <th>Numéro</th>
                                    <th>Nom</th>
                                    <th>Variété</th>
                                    <th>Progression</th>
                                    <th>Description</th>
                                    <th>Date début</th>
                                    <th>Date fin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <!-- Table item -->
                                <tr v-for="item in bdObjets" :key='item'>
                                    <!-- Table data -->
                                    <td>{{ item.code }}</td>
                                    <td>{{ item.titre }}</td>
                                    <td>{{ item.filiere_variete.titre }}</td>

                                    <td class="text-center text-sm-start">
                                        <ChaineValeurProgressionComponent :progression="item.progression"/>
                                    </td>

                                    <td>{{ item.description }}</td>
                                    <td>{{ item.date_debut }}</td>
                                    <td>{{ item.date_fin }}</td>

                                    <td>
                                        <AgBaseTableButtonShowComponent ref="refAgBaseTableButtonShow" 
                                                                        :routerLink="{name: 'filiere.chaine_valeur_etapes.list', query: {chaine_valeur_id: item.uuid}}"/>
                                        &nbsp;
                                        <AgBaseTableButtonEditComponent ref="refAgBaseTableButtonEdit" 
                                                                        :routerLink="{name: 'filiere.chaine_valeurs.edit', params: {uuid: item.uuid}}"/>
                                        &nbsp;
                                        <AgBaseTableButtonDeleteComponent ref="refAgBaseTableButtonDelete" :uuid="item.uuid" :setUuid="setUuid" />
                                    </td>
                            </tr>

                            </tbody>
                        </table>
                        <paginate v-show="!isLoadingTable"
                                v-model="paginationMetaData.current_page"
                                :page-count="paginationMetaData.last_page ? paginationMetaData.last_page : 1"
                                :page-range="pagination.parametres.pageRange"
                                :margin-pages="pagination.parametres.marginPages"
                                :click-handler="setNumeroPageOnClick"
                                :prev-text="pagination.parametres.prevText"
                                :next-text="pagination.parametres.nextText"
                                :container-class="pagination.parametres.containerClass"
                                :page-class="pagination.parametres.pageClass"
                          >
                          </paginate>
                    </div>

                </div>

            </div>

            <ConfirmerSuppressionComponent ref="refAfficherSuppressionModale"
                                           :deleteDonnee="deleteDonnee"
                                           />
        </template>
        <template v-slot:ControlSidebar>

        </template>
    </BackOfficeLayoutClusterSlot>
</template>

<script src="./ChaineValeurList.js"></script>
