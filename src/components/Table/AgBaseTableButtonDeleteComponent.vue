<template>
    <router-link  title="Supprimer"
                 :to="'#'" 
                 :class="customClass"
                 data-bs-toggle="modal" 
                 data-bs-target="#confirmerSuppressionModale" 
                 @click="setUuidProp(uuid)">
        <font-awesome-icon icon="trash" class="nav-icon"/>
    </router-link> 
</template>
<script>

    export default {
        props: {
            customClass: {
                type: String,
                default: 'btn btn-sm btn-danger me-1 mb-1 mb-md-0',
            },
            uuid: {
                type: String,
                default: null,
            },
            setUuid: Function,
        },
        data: function () {
            return {
            }
        },
        methods: {
            setUuidProp: function (uuid) {
                this.setUuid(uuid);
            },
        },
        created() {
        }
    }
</script>
