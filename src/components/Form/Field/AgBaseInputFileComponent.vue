<template>
  <label :for="nom">
    {{ label }} <span class="text-danger" v-show="required">*</span>
  </label>
  <input
    :class="customClass ? customClass : 'form-control'"
    v-bind="$attrs"
    :name="nom"
    type="file"
    :id="nom"
    ref="file"
    @change="selectFile"
    :required="required"
    :multiple="multiple"
  />
</template>

<script>
export default {
  props: {
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
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      file: "",
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file[0];
    },
  },
};
</script>

<style></style>
