<template>
    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success mb-3">
        <input type="checkbox" class="custom-control-input" 
               name="permissions"
               :value="objetPermission.uuid"
               :id="'permissions-'+objetPermission.uuid"
               @input="event => permissions = event.target.value"
               @change="checkPermissionChild($event)">
        <label class="custom-control-label fw-normal" :for="'permissions-'+objetPermission.uuid">
            {{ objetPermission.display_name }}
        </label>
    </div>
</template>

<script>
    export default {
        name: "RoleCreateGroupeCheckboxComponent",
        components: {
        },
        props: {
            bdObjetPermissions: {
                type: Object,
            },
            objetPermission: {
                type: Object,
            },
            checkPermission: Function,
        },
        data: function () {
            return {

            }
        },
        methods: {
            checkPermissionChild(event){
                this.checkPermission(event);
            },
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
