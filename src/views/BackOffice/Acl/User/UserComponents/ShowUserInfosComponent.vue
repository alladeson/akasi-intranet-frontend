<template>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" v-if="userInfos">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Informations de : {{ userInfos.name +' '+ userInfos.prenom }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="text-center" v-if="isLoadingSpinner">
                    <div class="spinner-border" role="status" v-show="isLoadingSpinner"></div>
                </div>
                <div class="modal-body" v-else>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped m-0">
                                    <tr>
                                        <th>Nom </th>
                                        <td>{{ userInfos.name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Prénom </th>
                                        <td>{{ userInfos.prenom }}</td>
                                    </tr>
                                    <tr>
                                        <th>Email </th>
                                        <td>{{ userInfos.email }}</td>
                                    </tr>
                                    <tr>
                                        <th>Rôle </th>
                                        <td v-if="userInfos.roles">{{ userInfos.roles[0].name }}</td>
                                    </tr>
                                    <tr>
                                        <th>Téléphone mobile </th>
                                        <td>{{ userInfos.tel_mobile }}</td>
                                    </tr>
                                    <tr>
                                        <th>Téléphone </th>
                                        <td>{{ userInfos.tel }}</td>
                                    </tr>
                                    <tr>
                                        <th>Fax </th>
                                        <td>{{ userInfos.fax }}</td>
                                    </tr>
                                    <tr>
                                        <th>Adresse Code Civic</th>
                                        <td>{{ userInfos.adresse_code_civic }}</td>
                                    </tr>
                                    <tr>
                                        <th>Adresse Rue</th>
                                        <td>{{ userInfos.adresse_rue }}</td>
                                    </tr>
                                    <tr>
                                        <th>Adresse Appartement</th>
                                        <td>{{ userInfos.adresse_apt }}</td>
                                    </tr>
                                    <tr>
                                        <th>Adresse Code Postal</th>
                                        <td>{{ userInfos.adresse_code_postal }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    <!-- <router-link type="button" class="btn btn-primary" :to="{name: 'acl.users.edit', params: {uuid: userInfos.uuid} }" v-if="userInfos.roles && userInfos.roles[0].name !== 'Super'" @click="closeModal()">Editer</router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShowUserInfosComponent',
    props: {
        userInfos: {
            type: Object,
        },
        isLoadingSpinner: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        closeModal() {
            $('#staticBackdrop').modal('hide');
        },
    },
}
</script>

<style>

</style>