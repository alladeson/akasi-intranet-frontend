<template>
    <div class="progress-group">
        <h6 class="mb-0">{{ progression }}%</h6>
        <div class="progress progress-sm">
            <div class="progress-bar bg-primary" :style="{width: progression+'%'}"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChaineValeurProgressionComponent',
        props: {
            progression: {
                type: Number,
                default: 0,
            },

        },
        methods: {
        },

        setup(props) {

        }
    }
</script>

<style scoped>
</style>