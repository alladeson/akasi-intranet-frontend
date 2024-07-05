<template>
  <BackOfficePageContent nomPage="Liste des utilisateurs">
    <template v-slot:Breadcrumb>
      <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs" />
    </template>
    <template v-slot:MainContent>
      <div class="row">
        <div class="col-12">
          <AlertMessageComponent ref="refAlerteMessage" />
        </div>
      </div>

      <div class="card">
        <div class="card-header border-transparent">
          <h3 class="card-title"></h3>
        </div>

        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <AgBaseButtonAddComponent
                ref="refAgBaseButtonAdd"
                :routerLink="{ name: 'user.create' }"
              />
            </div>
            <div class="col-md-6">
              <!-- Autres filtres -->
            </div>
            <div class="col-md-6">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control float-right"
                  placeholder="Rechercher..."
                  v-model="rechercheVmodel"
                  @keyup="rechercheObjets"
                />

                <div class="input-group-append">
                  <button class="btn Sub" type="button">
                    <font-awesome-icon icon="search" class="nav-icon" />
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <EasyDataTable
                table-class-name="customize-table"
                :headers="headers"
                :items="items"
                show-index
                alternating
                :loading="isLoadingTable"
              >
                <template #item-actions="{ id, firstname, lastname }">
                  <span class="d-flex">
                    <router-link
                      :to="{
                        name: 'user.show',
                        params: { id: id },
                      }"
                      class="btn btn-sm btn-primary me-1 mb-1 mb-md-0"
                      title="Détail"
                    >
                      <font-awesome-icon icon="eye" class="nav-icon" />
                    </router-link>
                    <router-link
                      :to="{
                        name: 'user.edit',
                        params: { id: id },
                      }"
                      class="btn btn-sm btn-warning me-1 mb-1 mb-md-0"
                      title="Éditer"
                    >
                      <font-awesome-icon icon="edit" class="nav-icon" />
                    </router-link>
                    <router-link
                      v-if="role != 'DG'"
                      title="Supprimer"
                      :to="'#'"
                      class="btn btn-sm btn-danger me-1 mb-1 mb-md-0"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmerSuppressionModale"
                      @click="setUuid(id, firstname, lastname)"
                    >
                      <font-awesome-icon icon="trash" class="nav-icon" />
                    </router-link>
                  </span>
                </template>
              </EasyDataTable>
            </div>
          </div>
        </div>
      </div>

      <ConfirmerSuppressionComponent
        ref="refAfficherSuppressionModale"
        :deleteDonnee="deleteDonnee"
        :vConfirmationSuppressionMessage="
          'Êtes-vous sûr de vouloir supprimer ' + currentEl + ' ?'
        "
      />
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>

<script src="./UserList.js"></script>
