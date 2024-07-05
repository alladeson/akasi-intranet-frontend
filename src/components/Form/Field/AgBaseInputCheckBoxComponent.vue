<template>
    <input 
        :class="custClass ? custClass : '' "
        v-bind="$attrs"
        type="checkbox"
        :id="nom" 
        v-model="modelValue"
        
    />
    <label :for="nom" :class="labClass ? labClass : '' ">
        {{ label }} <span class="text-danger" v-show="required">*</span>
    </label>
</template>

<script>
export default {
    props: {
        custClass: {
            type: String,
            default: '',
        }, 
        labClass: {
            type: String,
            default: '',
        }, 
        nom: {
            type: String,
            default: '',
        }, 
        label: {
            type: String,
            default: '', 
        },
        modelValue: {
            type: Array,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        isChecked: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style>

</style>