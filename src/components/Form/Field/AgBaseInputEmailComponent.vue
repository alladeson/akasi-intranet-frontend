<template>
    <label :for="nom">
        {{ label }} <span class="text-danger" v-show="required">*</span>
    </label>
    <input 
        :class="customClass ? customClass : 'form-control' "
        v-bind="$attrs"
        :name="nom" 
        type="email"
        :id="nom" 
        :placeholder="label" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
    />
</template>

<script>
    export default {
        props: {
            customClass: {
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
            required: {
                type: Boolean,
                default: false,
            },
            valeur: {
                type: String,
                default: null,
            },
            modelValue: {
                type: String,
                default: null,
            },
        },      
        data() {
            return {
                inputEmail: '',      
            }
        },
    }
</script>

<style>

</style>