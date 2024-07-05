<template>
  <BackOfficeLayoutClusterSlot nomPage="Tableau de bord">
    <template v-slot:Breadcrumb>
      <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs" />
    </template>
    <template v-slot:MainContent>
      <div class="page-content-wrapper border">
        <div class="row justify-content-center">
          <div class="col-lg col-md">
            <div class="small-box bg-info">
              <div class="inner">
                <h3 v-html="bdObjets.nombre_rapport"></h3>
                <p>Rapports</p>
              </div>
              <div class="icon">
                <font-awesome-icon icon="file-prescription" />
              </div>
              <router-link
                :to="{
                  name: 'report.list',
                }"
                class="small-box-footer"
                >Voir plus<font-awesome-icon icon="arrow-circle-right" />
              </router-link>
            </div>
          </div>

          <div class="col-lg col-md">
            <div class="small-box bg-success">
              <div class="inner">
                <h3 v-html="bdObjets.nombre_demande"></h3>
                <p>Demandes de permission</p>
              </div>
              <div class="icon">
                <font-awesome-icon icon="hourglass-start" />
              </div>
              <router-link
                :to="{
                  name: 'request.list',
                }"
                class="small-box-footer"
                >Voir plus<font-awesome-icon icon="arrow-circle-right" />
              </router-link>
            </div>
          </div>

          <div class="col-lg-3 col-md" v-if="role != 'DG'">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3 v-html="bdObjets.nombre_absence"></h3>
                <p>Absences</p>
              </div>
              <div class="icon">
                <font-awesome-icon icon="check-double" />
              </div>
              <a href="#" class="small-box-footer"
                >Voir plus <font-awesome-icon icon="arrow-circle-right"
              /></a>
            </div>
          </div>

          <div class="col-lg-3 col-md" v-if="role != 'DG'">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3 v-html="bdObjets.nombre_timesheet"></h3>
                <p>TimeSheet</p>
              </div>
              <div class="icon">
                <font-awesome-icon icon="chart-pie" />
              </div>
              <a href="#" class="small-box-footer"
                >Voir plus <font-awesome-icon icon="arrow-circle-right"
              /></a>
            </div>
          </div>
          <div class="col-lg-3 col-md" v-if="role == 'DG'">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3 v-html="bdObjets.nombre_team"></h3>
                <p>Équipes</p>
              </div>
              <div class="icon">
                <font-awesome-icon icon="check-double" />
              </div>
              <router-link
                :to="{
                  name: 'team.list',
                }"
                class="small-box-footer"
                >Voir plus<font-awesome-icon icon="arrow-circle-right" />
              </router-link>
            </div>
          </div>

          <div class="col-lg-3 col-md" v-if="role == 'DG'">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3 v-html="bdObjets.nombre_project"></h3>
                <p>Projets</p>
              </div>
              <div class="icon">
                <font-awesome-icon icon="chart-pie" />
              </div>
              <router-link
                :to="{
                  name: 'project.list',
                }"
                class="small-box-footer"
                >Voir plus<font-awesome-icon icon="arrow-circle-right" />
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="card">
              <div class="card-header border-transparent">
                <h3 class="card-title">
                  Liste des 10 derniers rapports hebdomadaires
                </h3>
              </div>

              <div class="card-body p-2">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped m-0">
                    <caption class="text-center" v-show="isLoadingTable">
                      <div
                        class="spinner-border"
                        role="status"
                        v-show="isLoadingTable"
                      ></div>
                    </caption>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date du rapport</th>
                        <th>Objectifs de la semaine</th>
                        <th>Mes Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Table item -->
                      <tr v-for="(item, index) in reports" :key="index">
                        <!-- Table data -->
                        <td>{{ index + 1 }}</td>
                        <td>{{ moment(item.created_at) }}</td>
                        <td>
                          <li class="mb-1" v-for="(goal, index) in item.goals" :key="index">
                            {{ goal }}
                          </li>
                        </td>

                        <!-- <td>{{ item.status }}</td> -->
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
                            <a :href="`${myBaseLink}` + item.pdf" download>
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
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card-footer clearfix">
                <!-- <a href="javascript:void(0)" class="btn btn-sm btn-info float-left">Place New Order</a> -->
                <router-link
                  :to="{ name: 'report.list' }"
                  class="btn btn-sm btn-secondary float-right"
                >
                  Voir tout >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficeLayoutClusterSlot>
</template>

<script src="./DasboardCluster.js"></script>
