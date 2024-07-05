<template>
    <BackOfficeLayoutClusterSlot nomPage="Départements" >
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
                    <h3 class="card-title">Liste des départements</h3>
                </div>

                <div class="card-body">
                    <!-- Title and select START -->
                    <div class="row">
                        <!-- Select option -->
                        <div class="col-md-12">
                            <AgBaseButtonAddComponent ref="refAgBaseButtonAdd" :routerLink="{name: 'parametrage.departements.create'}"/>
                        </div>
                        <div class="col-md-6">
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
    </BackOfficeLayoutClusterSlot>
</template>

<script src="./DepartementList.js"></script>
