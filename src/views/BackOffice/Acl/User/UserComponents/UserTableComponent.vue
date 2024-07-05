<template>
    <div class="table-responsive">
        <table class="table table-bordered table-striped m-0">
            <caption class="text-center" v-show="isLoadingTable">
                <div class="spinner-border" role="status" v-show="isLoadingTable"></div>
            </caption>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénoms</th>
                    <th>Email</th>
                    <th>Téléphone mobile</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in bdObjets" :key='user'>
                    <td>{{ user.name }}</td>

                    <td>{{ user.prenom }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.tel_mobile }}</td>
                    <td v-show="isColonneAction">
                        <span v-for="boutonAction in boutonsAction">
                            <button v-show="boutonAction.nom=='show' && user.acl.read" ref="refAgBaseTableButtonShow" type="button" class="btn btn-sm Sub me-1 mb-1 mb-md-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop" title="Détail" @click="showUserInfos(user.uuid)">
                            <font-awesome-icon icon="eye" class="nav-icon"/>
                            </button>
                            <router-link v-show="boutonAction.nom=='edit' && user.acl.update"
                                         title="Modifier"
                                         :to="{name: boutonAction.nomRoute, params: {uuid: user.uuid} }" 
                                         :class="boutonAction.classe ? boutonAction.classe : 'btn btn-sm btn-warning me-1 mb-1 mb-md-0'">
                                <font-awesome-icon icon="edit" class="nav-icon"/>
                            </router-link>
                            <router-link v-show="boutonAction.nom=='delete' && user.acl.delete"
                                         title="Supprimer"
                                         :to="'#'" 
                                         :class="boutonAction.classe ? boutonAction.classe : 'btn btn-sm btn-danger me-1 mb-1 mb-md-0'"
                                         data-bs-toggle="modal" 
                                         data-bs-target="#confirmerSuppressionModale" 
                                         @click="setUuidProp(user.uuid)">
                                <font-awesome-icon icon="trash" class="nav-icon"/>
                            </router-link> 
                        </span>
                    </td>
                    
                </tr>
            </tbody>
        </table>

        <paginate v-show="isPagination && !isLoadingTable" class="mt-4"
            v-model="paginationMetaData.current_page"
            :page-count="paginationMetaData.last_page ? paginationMetaData.last_page : 1"
            :page-range="pagination.parametres.pageRange"
            :margin-pages="pagination.parametres.marginPages"
            :click-handler="paginationClickCallback"
            :prev-text="pagination.parametres.prevText"
            :next-text="pagination.parametres.nextText"
            :container-class="pagination.parametres.containerClass"
            :page-class="pagination.parametres.pageClass"
      >
      </paginate>
    </div>
</template>

<script>
    import Paginate from 'vuejs-paginate-next';
    import { reactive } from 'vue'

    export default {
        name: 'UserTableComponent',
        components: {
            Paginate,
        },
        props: {
            bdObjets: {
                type: Object,
            },
            setUuid: {
                type: Function,
            },
            showInfos: {
                type: Function,
            },
            isLoadingTable: {
                type: Boolean,
                default: true,
            },
            isColonneAction: {
                type: Boolean,
                default: true,
            },
            boutonsAction: {
                type: Object,
                default: [],
            },
            isPagination: {
                type: Boolean,
                default: true,
            },
            paginationMetaData: {
                type: Object,
                default: {
                    current_page: 1 
                },
            },
            setNumeroPageOnClick: Function,
        },
        methods: {
            setUuidProp: function (uuid) {
                this.setUuid(uuid);
            },
            showUserInfos: function (uuid) {
                this.showInfos(uuid);
            },
            paginationClickCallback(pageNum) {
                this.setNumeroPageOnClick(pageNum);
            },
        },
        mounted() {
            document.getElementsByClassName("pagination")[0].classList.add('justify-content-end');
        },
        setup(props) {
            const pagination = reactive({ 
                parametres: {
                    pageRange: 3,
                    marginPages: 2,
                    prevText: "< Précédent",
                    nextText: "Suivant >",
                    containerClass: "pagination",
                    pageClass: "page-item",
                }
            });
            return { 
                pagination 
            };
        }

    }
    /* https://vuejsexamples.com/a-vue-3-component-to-make-pagination-based-on-vuejs-paginate/ */
    //https://getbootstrap.com/docs/5.0/components/spinners/
</script>
<style lang="css">
    .page-link{
        cursor: pointer;
    }
    .pagination {
    }
    .page-item {
    }
</style>
