<template>
    <router-link  data-bs-toggle="tooltip" data-bs-placement="top" title="Modifier"
                  :to="routerLink" 
                  :class="customClass">
        <font-awesome-icon icon="edit" class="nav-icon"/>
    </router-link>
</template>
<script>
    
    export default {
        props: {
            customClass: {
                type: String,
                default: 'btn btn-sm btn-warning me-1 mb-1 mb-md-0',
            },
            routerLink: {
                type: Object,
                default: '',
            },
        },
        data: function () {
            return {
            }
        },
        mounted() {
        },
        created() {
        }
    }
</script>
