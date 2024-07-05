<template>
    <div class="custom-control custom-switch custom-switch-on-success mb-3">
        <input type="checkbox" class="custom-control-input" 
               :checked="JSON.stringify(bdObjetPermissions).indexOf(objetPermission.name) > -1"
               name="permissions"
               :value="objetPermission.uuid"
               :id="'permissions-'+objetPermission.uuid"
               disabled
               >
        <label class="custom-control-label fw-normal" :for="'permissions-'+objetPermission.uuid">
            {{ objetPermission.display_name }}
        </label>
    </div>
</template>

<script>
    export default {
        name: "RoleShowGroupeCheckboxComponent",
        components: {
        },
        props: {
            bdObjetPermissions: {
                type: Object,
            },
            objetPermission: {
                type: Object,
            },
        },
        data: function () {
            return {

            }
        },
        methods: {
        },
        created() {
        },
        filters: {
        },
        computed: {
        },
        mounted() {

        }
    }
</script>
