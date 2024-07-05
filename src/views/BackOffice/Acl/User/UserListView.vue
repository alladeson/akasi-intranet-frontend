<template>
  <BackOfficePageContent nomPage="Liste des intervenants">
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
        <!-- {{ userInfos }} -->
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <AgBaseButtonAddComponent
                ref="refAgBaseButtonAdd"
                :routerLink="{ name: 'acl.users.create' }"
              />
            </div>
            <div class="col-md-6">
              <!-- Autres filtres -->
            </div>
            <div class="col-md-6">
              <AgBaseBlocRechercheComponent
                ref="refAgBaseBlocRecherche"
                :rechercheObjets="rechercheObjets"
              />
            </div>
          </div>

          <UserTableComponent
            :bdObjets="bdObjets"
            :isLoadingTable="isLoadingTable"
            :boutonsAction="boutonsAction"
            :setUuid="setUuid"
            :showInfos="showUserInfos"
            :paginationMetaData="paginationMetaData"
            :setNumeroPageOnClick="setNumeroPageOnClick"
          />
        </div>
      </div>

      <!-- Modal -->
      <ShowUserInfosComponent
        :userInfos="userInfos"
        :isLoadingSpinner="isLoadingSpinner"
      />

      <ConfirmerSuppressionComponent
        ref="refAfficherSuppressionModale"
        :vConfirmationSuppressionMessage="confirmationSuppressionMessage"
        :deleteDonnee="deleteDonnee"
      />
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>

<script src="./UserList.js"></script>
