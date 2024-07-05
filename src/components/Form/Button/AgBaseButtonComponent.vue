<template>
  <button
    :class="custClass ? custClass : 'btn btn-success'"
    type="button"
    v-bind="$attrs"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    custClass: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
  },
  methods: {},
};
</script>

<style></style>
