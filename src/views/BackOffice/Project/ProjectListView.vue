<template>
  <BackOfficePageContent nomPage="Liste des projets">
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
            <div class="col-12" v-if="role == 'DG'">
              <AgBaseButtonAddComponent
                ref="refAgBaseButtonAdd"
                :routerLink="{ name: 'project.create' }"
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
                <template #expand="item" v-if="role == 'DG'">
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Équipes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(team, index) in item.teams" :key="index">
                        <td>{{ index }}</td>
                        <td>
                          {{ team.name }}
                        </td>
                        <td v-if="role == 'DG'">
                          <span class="d-flex">
                            <router-link
                              :to="{
                                name: 'team.edit',
                                params: { id: team.id },
                              }"
                              class="btn btn-sm btn-info me-1 mb-1 mb-md-0"
                              title="Éditer son role"
                            >
                              <font-awesome-icon icon="edit" class="nav-icon" />
                            </router-link>
                            <router-link
                              title="Supprimer l'équipe"
                              :to="'#'"
                              class="btn btn-sm btn-danger me-1 mb-1 mb-md-0"
                              data-bs-toggle="modal"
                              data-bs-target="#confirmerRejetModale"
                              @click="setUuid(team.id, team.name)"
                            >
                              <font-awesome-icon
                                icon="trash"
                                class="nav-icon"
                              />
                            </router-link>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </template>
                <template #item-actions="{ id, name }" v-if="role == 'DG'">
                  <span class="d-flex">
                    <!-- <router-link
                      :to="{
                        name: 'member.create',
                        params: { id: id },
                      }"
                      class="btn btn-sm btn-success me-1 mb-1 mb-md-0"
                      title="Ajouter un utilisateur à cette équipe"
                    >
                      <font-awesome-icon icon="user-plus" class="nav-icon" />
                    </router-link> -->
                    <router-link
                      :to="{
                        name: 'project.edit',
                        params: { id: id },
                      }"
                      class="btn btn-sm btn-warning me-1 mb-1 mb-md-0"
                      title="Éditer"
                    >
                      <font-awesome-icon icon="edit" class="nav-icon" />
                    </router-link>
                    <router-link
                      title="Supprimer"
                      :to="'#'"
                      class="btn btn-sm btn-danger me-1 mb-1 mb-md-0"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmerSuppressionModale"
                      @click="setUuid(id, name)"
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
          'Êtes-vous sûr de vouloir supprimer le projet ' + currentEl + ' ?'
        "
      />
      <ConfirmerRejetComponent
        ref="refAfficherRejetModale"
        :rejectDonnee="deleteTeam"
        :vConfirmationRejetMessage="
          'Voulez-vous vraiment supprimer l\'équipe ' + currentEl
        "
      />
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>

<script src="./ProjectList.js"></script>
