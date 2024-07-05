<template>

    <div class="table-responsive">
        <table :id="tableId" class="table table-bordered table-striped">
            <caption> {{ tableCaption }}</caption>
            <caption class="text-center" v-show="isLoadingTable">
                <div class="spinner-border" role="status" v-show="isLoadingTable"></div>
            </caption>
            <thead>
                <tr>
                    <!-- loop through each value of the colonnesTable to get the table header -->
                    <th  v-for="(valeur, field) in colonnesTable" :key='field' > 
                        {{ valeur }}
                    </th>
                    <th v-show="isColonneAction">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- Loop through the list get the each student data -->
                <tr v-for="item in bdObjets" :key='item'>
                    
                    <td v-for="( field) in colonnesTable" :key='field'>{{ item.field }}</td>
                    
                    <td v-show="isColonneAction">
                        <span v-for="boutonAction in boutonsAction">
                            <router-link v-if="boutonAction.nom=='show' && item.acl.read"
                                         title="Détail"
                                         :to="{name: boutonAction.nomRoute, params: {uuid: item.uuid} }" 
                                         :class="boutonAction.classe ? boutonAction.classe : 'btn btn-sm Sub me-1 mb-1 mb-md-0'">
                                <font-awesome-icon icon="eye" class="nav-icon"/>
                            </router-link> 
                            <!-- <router-link v-if="boutonAction.nom=='edit' && item.acl.update"
                                         title="Modifier"
                                         :to="{name: boutonAction.nomRoute, params: {uuid: item.uuid} }" 
                                         :class="boutonAction.classe ? boutonAction.classe : 'btn btn-sm btn-warning me-1 mb-1 mb-md-0'">
                                <font-awesome-icon icon="edit" class="nav-icon"/>
                            </router-link> -->
                            <!-- <router-link v-if="boutonAction.nom=='delete' && item.acl.delete"
                                         title="Supprimer"
                                         :to="'#'" 
                                         :class="boutonAction.classe ? boutonAction.classe : 'btn btn-sm btn-danger me-1 mb-1 mb-md-0'"
                                         data-bs-toggle="modal" 
                                         data-bs-target="#confirmerSuppressionModale" 
                                         @click="setUuidProp(item.uuid)">
                                <font-awesome-icon icon="trash" class="nav-icon"/>
                            </router-link>  -->
                        </span>
                    </td>
                    
                </tr>
            </tbody>
        </table>

        <paginate v-show="isPagination && !isLoadingTable"
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
        name: 'TableComponent',
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
            colonnesTable: {
                type: Object,
            },
            tableId: {
                type: String,
                default: 'tableComponent',
            },
            tableCaption: {
                type: String,
                default: '',
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
