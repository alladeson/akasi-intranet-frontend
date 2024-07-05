<template>
  <button
    :class="customClass ? customClass : 'btn Sub mt-3 p-2'"
    type="submit"
    v-bind="$attrs"
    :disabled="loading"
  >
    <span v-show="loading" class="spinner-border spinner-border-sm"></span
    >&nbsp;
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    customClass: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
