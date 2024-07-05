<template>
    <BackOfficePageContent nomPage="Ajouter un rôle">
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
                     <form class="" @submit.prevent="bdObjetSave" id="form-premier">
                        <div class="form-group">
                            <AgBaseInputTextComponent nom="display_name" label="Nom affiché" :required="true" v-model="bdObjet.display_name" maxlength="125" />
                        </div>
                        <div class="card card-secondary">
                            <div class="card-header mb-2">
                                <h3 class="card-title">Permissions</h3>
                            </div>
                            <div class="form-goup">
                                <input type="search" placeholder="Rechercher une permission" v-model="searchRole" class="form-control col-sm-6 float-end">
                            </div>
                            <caption class="text-center d-flex justify-content-center" v-show="allPermissions" v-if="isLoadingTable">
                                <div class="spinner-border text-center" role="status" v-show="isLoadingTable"></div>
                            </caption>
                            
                            <template v-for="(permission_groupe, pg) in permission_groupes" :key="pg">
                                <RoleCreateGroupeComponent v-show="JSON.stringify(inlineFilterSearch).indexOf(permission_groupe.groupe) > -1" 
                                    :bdObjet="bdObjet" 
                                    :allPermissions="allPermissions.filter(element => { return element.groupe == permission_groupe.groupe })"
                                    :searchRole="searchRole" :firstWord="firstWord"
                                    :nomGroupe="permission_groupe.groupe"
                                    :checkPermission="checkPermission"/>
                            </template>

                        </div>
                        <AgBaseButtonSubmitComponent buttonText="Enregistrer" :loading="loading" :disabled="isLoadingTable" />
                    </form>
                </div>
            </div>
        </template>
        <template v-slot:ControlSidebar>

        </template>
    </BackOfficePageContent>
</template>
<script src="./RoleCreate.js"></script>
