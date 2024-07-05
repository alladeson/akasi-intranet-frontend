<template>
    <div class="card-body card-success">
        <div class="card-header">
            <h3 class="card-title">Groupe {{ nomGroupe }}</h3>
        </div>  
        <div class="card-body">

            <div class="container">
                <div class="row">
                    <template v-for="(item, i) in inlineFilterSearchChild" :key="i">
                        <div class="col-sm-3">
                            <RoleEditGroupeCheckboxComponent :bdObjetPermissions="bdObjet.permissions"
                                                             :objetPermission="item"
                                                             :checkPermission="checkPermissionParent"
                                                             />
                        </div>
                    </template>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import RoleEditGroupeCheckboxComponent from "@/views/BackOffice/Acl/Role/RoleComponents/RoleEditGroupeCheckboxComponent.vue";
    export default {
        name: "RoleEditGroupeComponent",
        components: {
            RoleEditGroupeCheckboxComponent,
        },
        props: {
            bdObjet: {
                type: Object,
            },
            allPermissions: {
                type: Object,
            },
            searchRole: {
                type: String,
                default: null,
            },
            nomGroupe: {
                type: String,
                default: null,
            },
            firstWord: Function,
            checkPermission: Function,
        },
        data: function () {
            return {
                actionsBase: ['create', 'read', 'update', 'delete']
            }
        },
        methods: {
            firstWordParent(per) {
                return this.firstWord(per);
            },
            checkPermissionParent(event) {
                this.checkPermission(event);
            },
        },
        created() {
        },
        computed: {
            inlineFilterSearchChild() {
                if (!this.searchRole) {
                    return this.allPermissions;
                }
                return this.allPermissions.filter(bdOb => {
                    return bdOb.display_name.toLowerCase().match(this.searchRole.toLowerCase())
                })
            }
        },
        mounted() {

        }
    }
</script>
