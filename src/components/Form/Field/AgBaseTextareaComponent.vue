<template>
  <label :for="nom">
    {{ label }} <span class="text-danger" v-show="required">*</span>
  </label>
  <textarea
    :class="customClass ? customClass : 'form-control'"
    v-bind="$attrs"
    :id="nom"
    :disabled="disabled"
    :placeholder="label"
    :rows="rows"
    :required="required"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    >{{ modelValue }}</textarea
  >
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
      default: "",
    },
    nom: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    valeur: {
      type: String,
      default: null,
    },
    rows: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
