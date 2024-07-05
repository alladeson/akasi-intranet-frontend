<template>
    <router-link :to="routerLink" :class="customClass">
        + Ajouter
    </router-link>
</template>
<script>

    export default {
        props: {
            customClass: {
                type: String,
                default: 'btn Sub',
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
        created() {
        }
    }
</script>