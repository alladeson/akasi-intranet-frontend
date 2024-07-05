<template>
  <BackOfficePageContent nomPage="Liste des rapports hedomadaires">
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
                :routerLink="{ name: 'report.create' }"
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
                        <th>Réalisations</th>
                        <th>Problèmes/Commentaires</th>
                        <th v-if="role == 'DG'">Auteur</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <li
                            v-for="(ach, index) in item.achievements"
                            :key="index"
                          >
                            {{ ach }}
                          </li>
                        </td>
                        <td>
                          <li
                            class="mb-1"
                            v-for="(obs, index) in item.observations"
                            :key="index"
                          >
                            {{ obs }}
                          </li>
                        </td>
                        <td class="mb-1" v-if="role == 'DG'">
                          {{ item.user.firstname }} {{ item.user.lastname }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </template>
                <template #item-goals="{ goals }">
                  <li v-for="(goal, index) in goals" :key="index">
                    {{ goal }}
                  </li>
                </template>
                <template #item-next_goals="{ next_goals }">
                  <li v-for="(ngoal, index) in next_goals" :key="index">
                    {{ ngoal }}
                  </li>
                </template>
                <template #item-status="{ status }">
                  <span v-if="status == 0" class="badge bg-danger p-1"
                    >En retard</span
                  >
                  <span v-else-if="status == 1" class="badge bg-warning p-1"
                    >En cours</span
                  >
                  <span v-else class="badge bg-success p-1">Terminer</span>
                </template>
                <template #item-actions="{ pdf, id, validated }">
                  <span class="d-flex">
                    <a :href="`${myBaseLink}` + pdf" download>
                      <span
                        class="btn btn-sm btn-info me-1 mb-1 mb-md-0"
                        title="Télécharger pdf"
                      >
                        <font-awesome-icon icon="download" class="nav-icon" />
                      </span>
                    </a>
                    <router-link
                      :to="{
                        name: 'report.show',
                        params: { id: id },
                      }"
                      class="btn btn-sm btn-primary me-1 mb-1 mb-md-0"
                      title="Détail"
                    >
                      <font-awesome-icon icon="eye" class="nav-icon" />
                    </router-link>
                    <router-link
                      v-if="validated == 0 && role != 'DG'"
                      :to="{
                        name: 'report.edit',
                        params: { id: id },
                      }"
                      class="btn btn-sm btn-warning me-1 mb-1 mb-md-0"
                      title="Éditer"
                    >
                      <font-awesome-icon icon="edit" class="nav-icon" />
                    </router-link>
                    <router-link
                      title="Valider"
                      :to="'#'"
                      class="btn btn-sm btn-success me-1 mb-1 mb-md-0"
                      data-bs-toggle="modal"
                      data-bs-target="#confirmerValidationModale"
                      @click="setUuid(id)"
                      v-if="validated == 0 && role != 'DG'"
                    >
                      <font-awesome-icon icon="check" class="nav-icon" />
                    </router-link>
                  </span>
                </template>
              </EasyDataTable>
              <!-- <div class="table-responsive mt-5">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>N°</th>
                      <th>Date du rapport</th>
                      <th>Objectifs de la semaine</th>
                      <th>Réalisations</th>
                      <th>Problèmes/Commentaires</th>
                      <th>Objectifs prochain</th>
                      <th>Mes Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in bdObjets" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ moment(item.created_at) }}</td>
                      <td>{{ item.goals }}</td>
                      <td>{{ item.achievements }}</td>
                      <td>{{ item.observations }}</td>
                      <td>{{ item.next_goals }}</td>
                      <td>
                        <span
                          v-if="item.status == 0"
                          class="badge bg-danger p-1"
                          >En retard</span
                        >
                        <span
                          v-else-if="item.status == 1"
                          class="badge bg-warning p-1"
                          >En cours</span
                        >
                        <span v-else class="badge bg-success p-1"
                          >Terminer</span
                        >
                      </td>
                      <td>
                        <span class="d-flex">
                          <a
                            :href="
                              'http://tenant1.intranet.akasi.local/' + item.pdf
                            "
                            :download="
                              'http://tenant1.intranet.akasi.local/' + item.pdf
                            "
                            target="_blank"
                          >
                            <span
                              class="btn btn-sm btn-info me-1 mb-1 mb-md-0"
                              title="Télécharger pdf"
                            >
                              <font-awesome-icon
                                icon="download"
                                class="nav-icon"
                              />
                            </span>
                          </a>
                          <router-link
                            :to="{
                              name: 'report.show',
                              params: { id: item.id },
                            }"
                            class="btn btn-sm btn-primary me-1 mb-1 mb-md-0"
                            title="Détail"
                          >
                            <font-awesome-icon icon="eye" class="nav-icon" />
                          </router-link>
                          <router-link
                            v-if="item.validated == 0"
                            :to="{
                              name: 'report.edit',
                              params: { id: item.id },
                            }"
                            class="btn btn-sm btn-warning me-1 mb-1 mb-md-0"
                            title="Éditer"
                          >
                            <font-awesome-icon icon="edit" class="nav-icon" />
                          </router-link>
                          <router-link
                            title="Valider"
                            :to="'#'"
                            class="btn btn-sm btn-success me-1 mb-1 mb-md-0"
                            @click="validateItem(item.id)"
                            v-if="item.validated == 0"
                          >
                            <font-awesome-icon icon="check" class="nav-icon" />
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

      <!--  <ConfirmerSuppressionComponent
        ref="refAfficherSuppressionModale"
        :deleteDonnee="deleteDonnee"
      /> -->
      <ConfirmerValidationComponent
        ref="refAfficherValidationModale"
        :validateDonnee="validateItem"
      />
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficePageContent>
</template>
<style>
.header {
  position: relative !important;
}

.header-text {
  text-align: left;
}
.direction-left {
  white-space: normal;
}
.customize-table {
  --easy-table-border: 1px solid #f2f2f2;
  --easy-table-row-border: 1px solid #f2f2f2;

  --easy-table-header-text-align: center !important;
  --easy-table-header-font-size: 15px !important;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #000;
  --easy-table-header-background-color: #f2f2f236;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #143a79;
  /*   --easy-table-body-even-row-background-color: #4c5d7a;
 */
  --easy-table-body-row-font-color: #143a79;
  /*   --easy-table-body-row-background-color: #2d3a4f;
 */
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: #eee;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #f2f2f2;
  --easy-table-footer-font-color: rgba(0, 0, 0, 0.836);
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 50px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  /*   --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f; */

  /*   --easy-table-loading-mask-background-color: #2d3a4f;
 */
}
</style>

<script src="./RapportList.js"></script>
