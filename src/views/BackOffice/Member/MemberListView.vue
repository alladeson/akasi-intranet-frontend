<template>
  <BackOfficePageContent nomPage="Liste des demandes">
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
                :routerLink="{ name: 'request.create' }"
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
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Date demande</th>
                      <th>Objet</th>
                      <th>Raison</th>
                      <th>Date de début</th>
                      <th>Date de fin</th>
                      <th>Durée</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in bdObjets" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ moment(item.created_at) }}</td>
                      <td>{{ item.object }}</td>
                      <td>{{ item.reasons }}</td>
                      <td>{{ item.starting_date }}</td>
                      <td>{{ item.ending_date }}</td>
                      <td>{{ item.duration }}</td>
                      <!-- <td>{{ item.status }}</td> -->
                      <td>
                        <span v-if="item.status == 1">En cours</span>
                        <span v-else-if="item.status == 2">Accepter</span>
                      </td>
                      <td>
                        <span class="d-flex">
                          <router-link
                            :to="{
                              name: 'request.show',
                              params: { id: item.id },
                            }"
                            class="btn btn-sm btn-primary me-1 mb-1 mb-md-0"
                            title="Détail"
                          >
                            <font-awesome-icon icon="eye" class="nav-icon" />
                          </router-link>
                          <router-link
                            :to="{
                              name: 'request.edit',
                              params: { id: item.id },
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
                            @click="setUuid(item.id)"
                          >
                            <font-awesome-icon icon="trash" class="nav-icon" />
                          </router-link>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmerSuppressionComponent
        ref="refAfficherSuppressionModale"
        :deleteDonnee="deleteDonnee"
      />
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>

<script src="./MemberList.js"></script>
