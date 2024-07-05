<template>
    <hr :style="cssVars" v-bind="$attrs"/>
</template>

<script>
export default {
    props: {
        contentText: {
            type: String,
            default: '',
        }, 
    },
    computed: {
        cssVars() {
            return{
                '--contentText': this.contentText,
            }
        }
    }
}
</script>

<style scoped>
    hr {
        border: none;
        border-top: 3px double #333;
        color: #000;
        overflow: visible;
        text-align: center;
        height: 5px;
        font-size: 18px;
    }

    hr:after {
        background: #fff;
        content: var(--contentText);
        color: #000;
        padding: 0 4px;
        position: relative;
        top: -13px;
    }

</style>