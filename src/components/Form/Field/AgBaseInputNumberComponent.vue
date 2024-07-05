<template>
    <label :for="nom">
        {{ label }} <span class="text-danger" v-show="required">*</span>
    </label>
    <input 
        :class="customClass ? customClass : 'form-control' "
        v-bind="$attrs"
        :name="nom" 
        type="number"
        :id="nom" 
        :placeholder="label" 
        :required="required"
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" 
    />
</template>

<script>
    export default {
        props: {
            modelValue: {
                type: String,
                default: null,
            },
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
        },      
        data() {
            return {
                inputNumber: '',      
            }
        },
    }
</script>

<style>

</style>