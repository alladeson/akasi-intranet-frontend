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
                v-if="role != 'DG'"
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
                <template #expand="item">
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Date de fin</th>
                        <th v-if="role == 'DG'">Auteur</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ item.ending_date }}</td>
                        <td v-if="role == 'DG'">
                          {{ item.user.firstname }} {{ item.user.lastname }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </template>
                <template #item-status="{ status }">
                  <span v-if="status == 1" class="badge bg-info">En cours</span>
                  <span v-else-if="status == 2" class="badge bg-warning"
                    >Annuler</span
                  >
                  <span v-else-if="status == 3" class="badge bg-success"
                    >Accepter</span
                  >
                  <span v-else class="badge bg-danger">Rejeter</span>
                </template>
                <template #item-actions="{ status, id }">
                  <span class="d-flex">
                    <router-link
                      :to="{
                        name: 'request.show',
                        params: { id: id },
                      }"
                      class="btn btn-sm btn-primary me-1 mb-1 mb-md-0"
                      title="Détail"
                    >
                      <font-awesome-icon icon="eye" class="nav-icon" />
                    </router-link>
                    <router-link
                      v-if="status == 1 && role != 'DG'"
                      :to="{
                        name: 'request.edit',
                        params: { id: id },
                      }"
                      class="btn btn-sm btn-warning me-1 mb-1 mb-md-0"
                      title="Éditer"
                    >
                      <font-awesome-icon icon="edit" class="nav-icon" />
                    </router-link>
                    <router-link
                      v-if="status == 1 && role != 'DG'"
                      title="Annuler"
                      :to="'#'"
                      class="btn btn-sm btn-danger me-1 mb-1 mb-md-0"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmerAnnulationModale"
                      @click="setUuid(id)"
                    >
                      <font-awesome-icon icon="times" class="nav-icon" />
                    </router-link>
                    <router-link
                      v-if="status == 1 && role == 'DG'"
                      title="Valider"
                      :to="'#'"
                      class="btn btn-sm btn-success me-1 mb-1 mb-md-0"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmerValidationModale"
                      @click="setUuid(id)"
                    >
                      <font-awesome-icon icon="check" class="nav-icon" />
                    </router-link>
                    <router-link
                      v-if="status == 1 && role == 'DG'"
                      title="Rejeter"
                      :to="'#'"
                      class="btn btn-sm btn-danger me-1 mb-1 mb-md-0"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmerRejetModale"
                      @click="setUuid(id)"
                    >
                      <font-awesome-icon icon="times" class="nav-icon" />
                    </router-link>
                  </span>
                </template>
              </EasyDataTable>
              <!--  <div class="table-responsive">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>N°</th>
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
                      <td>
                        <span v-if="item.status == 1" class="badge bg-info"
                          >En cours</span
                        >
                        <span
                          v-else-if="item.status == 2"
                          class="badge bg-warning"
                          >Annuler</span
                        >
                        <span
                          v-else-if="item.status == 3"
                          class="badge bg-success"
                          >Accepter</span
                        >
                        <span v-else class="badge bg-danger">Rejeter</span>
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
                            v-if="item.status == 1"
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
                            v-if="item.status == 1"
                            title="Annuler"
                            :to="'#'"
                            class="btn btn-sm btn-danger me-1 mb-1 mb-md-0"
                            data-bs-toggle="modal"
                            data-bs-target="#confirmerSuppressionModale"
                            @click="setUuid(item.id)"
                          >
                            <font-awesome-icon icon="times" class="nav-icon" />
                          </router-link>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <ConfirmerAnnulationComponent
        v-if="role != 'DG'"
        ref="refAfficherAnnulationModale"
        :cancelDonnee="deleteDonnee"
        :vConfirmationSuppressionMessage="'Voulez-vous vraiment annuler la demande ?'"
      />
      <ConfirmerRejetComponent
        v-if="role == 'DG'"
        ref="refAfficherRejetModale"
        :rejectDonnee="rejectRequest"
        :vConfirmationSuppressionMessage="'Voulez-vous vraiment rejeter la demande ?'"
      />
      <ConfirmerValidationComponent
        ref="refAfficherValidationModale"
        :validateDonnee="validateRequest"
      />
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>

<script src="./DemandeList.js"></script>
