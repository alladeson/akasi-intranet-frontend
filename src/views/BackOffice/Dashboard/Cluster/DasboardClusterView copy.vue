<template>
    <BackOfficeLayoutClusterSlot nomPage="Tableau de bord" >
        <template v-slot:Breadcrumb>
            <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs"/>
        </template>
        <template v-slot:MainContent>
            <div class="page-content-wrapper border">
                <div class="row">
                    <div class="col-lg-3 col-md-6">

                        <div class="small-box bg-info">
                            <div class="inner">
                                <h3 v-html="bdObjets.nombre_intervenants"></h3>
                                <p>Intervenants</p>
                            </div>
                            <div class="icon">
                                <font-awesome-icon icon='users' />
                            </div>
                            <!--a href="#" class="small-box-footer">Voir plus <font-awesome-icon icon='arrow-circle-right' /></a-->
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">

                        <div class="small-box bg-success">
                            <div class="inner">
                                <h3 v-html="bdObjets.nombre_chaine_valeur_encours"></h3>
                                <p>Chaînes de valeur en cours</p>
                            </div>
                            <div class="icon">
                                <font-awesome-icon icon='hourglass-start' />
                            </div>
                            <!--a href="#" class="small-box-footer">Voir plus <font-awesome-icon icon='arrow-circle-right' /></a-->
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">

                        <div class="small-box bg-warning">
                            <div class="inner">
                                <h3 v-html="bdObjets.nombre_chaine_valeur_complete"></h3>
                                <p>Chaînes de valeur complètées</p>
                            </div>
                            <div class="icon">
                                <font-awesome-icon icon='check-double' />
                            </div>
                            <!--a href="#" class="small-box-footer">Voir plus <font-awesome-icon icon='arrow-circle-right' /></a-->
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">

                        <div class="small-box bg-danger">
                            <div class="inner">
                                <h3 v-html="bdObjets.nombre_acteurs_certifies"></h3>
                                <p>Acteurs certifiés</p>
                            </div>
                            <div class="icon">
                                <font-awesome-icon icon='chart-pie' />
                            </div>
                            <!--a href="#" class="small-box-footer">Voir plus <font-awesome-icon icon='arrow-circle-right' /></a-->
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col-lg-9 col-md-9">
                        <div class="card">
                            <div class="card-header border-transparent">
                                <h3 class="card-title">Progression des chaînes de valeur en cours</h3>
                            </div>

                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table m-0">
                                        <caption class="text-center" v-show="isLoadingTable">
                                            <div class="spinner-border" role="status" v-show="isLoadingTable"></div>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th>Numéro</th>
                                                <th>Nom</th>
                                                <th>Variété</th>
                                                <th>Progression</th>
                                                <th>Date début</th>
                                                <th>Date fin</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            <!-- Table item -->
                                            <tr v-for="item in chaine_valeur_encours" :key='item'>
                                                <!-- Table data -->
                                                <td>{{ item.code }}</td>
                                                <td>{{ item.titre }}</td>
                                                <td>{{ item.filiere_variete.titre }}</td>

                                                <td class="text-center text-sm-start">
                                                    <ChaineValeurProgressionComponent :progression="item.progression"/>
                                                </td>
                                                
                                                <td>{{ item.date_debut }}</td>
                                                <td>{{ item.date_fin }}</td>

                                                <td>
                                        <AgBaseTableButtonShowComponent ref="refAgBaseTableButtonShow" 
                                                                        :routerLink="{name: 'filiere.chaine_valeur_etapes.list', query: {chaine_valeur_id: item.uuid}}"/>
                                        </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="card-footer clearfix">
                                <!-- <a href="javascript:void(0)" class="btn btn-sm btn-info float-left">Place New Order</a> -->
                                <router-link :to="{name: 'filiere.chaine_valeurs.list'}"  class="btn btn-sm btn-secondary float-right">
                                    Voir tout >
                                </router-link>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Activités récentes</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <button type="button" class="btn btn-tool" data-card-widget="remove">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="card-body p-0">
                                <ul class="products-list product-list-in-card pl-2 pr-2">
                                    <li class="item text-center" v-show="isLoadingTable">
                                        <div class="spinner-border" role="status"></div>
                                    </li>
                                    <li class="item" v-for="item in activitie_logs" :key='item'>
                                        <div class="product-img">
                                            <font-awesome-icon icon='chalkboard-user' class="nav-icon" size="2x"/>
                                            <!--img class="avatar-img rounded-circle" src="@/assets/images/avatar/15.jpg" alt="avatar"-->
                                        </div>
                                        <div class="product-info">
                                            <a href="javascript:void(0)" class="product-title">{{ Object.keys(item.properties)[0] }}
                                                <span class="badge badge-info float-right">{{ item.created_at.substring(0, 10) }}</span></a>
                                            <span class="product-description">
                                                {{ item.properties[Object.keys(item.properties)[0]] }}
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="card-footer text-center">
                                <a href="javascript:void(0)" class="uppercase">Toutes les activités</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:ControlSidebar>

        </template>
    </BackOfficeLayoutClusterSlot>
</template>

<script src="./DasboardCluster.js"></script>
