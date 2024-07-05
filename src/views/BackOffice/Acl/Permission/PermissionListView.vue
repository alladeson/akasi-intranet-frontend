<template>
    <BackOfficePageContent nomPage="Liste des permissions">
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
                            <!-- <AgBaseButtonAddComponent ref="refAgBaseButtonAdd" :routerLink="{name: 'acl.permissions.create'}"/> -->
                        </div>
                        <div class="col-md-6">
                            <!-- Autres filtres -->
                        </div>
                        <div class="col-md-6">
                            <AgBaseBlocRechercheComponent ref="refAgBaseBlocRecherche" 
                                                          :rechercheObjets="rechercheObjets"/>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <AgBaseTableComponent :colonnesTable='colonnesTable' 
                                              :bdObjets="bdObjets" 
                                              :isLoadingTable="isLoadingTable" 
                                              :boutonsAction="boutonsAction" 
                                              :setUuid="setUuid" 
                                              :isColonneAction="false" 
                                              />
                    </div>
                </div>
            </div>

        </template>
        <template v-slot:ControlSidebar>

        </template>
    </BackOfficePageContent>
</template>

<script src="./PermissionList.js"></script>
