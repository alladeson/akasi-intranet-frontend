<template>
    <ol class="breadcrumb float-sm-right">
        <li class="breadcrumb-item" v-for="breadcrumb in listeBreadcrumbs">
            <router-link v-if="breadcrumb.nomRoute!=''" 
                         :to="{name: breadcrumb.nomRoute, params: breadcrumb.parametres, query: breadcrumb.queries }" >
                {{ breadcrumb.texte }}
            </router-link>
        <span v-if="breadcrumb.nomRoute==''" class="active">
                {{ breadcrumb.texte }}
            </span>
        </li>
    </ol>
</template>

<script>
    export default {
        name: 'BreadcrumbClusterComponent',
        props: {
            listeBreadcrumbs: {
                type: Object,
                default: [],
            },

        },
        methods: {
        },

        setup(props) {

        }

    }
</script>

<style scoped>
a {
    color: #2068D9!important;
}
a:hover {
    color: #044564!important;
}
.breadcrumb-item span.active {
    color: #6c757d;
}
</style>