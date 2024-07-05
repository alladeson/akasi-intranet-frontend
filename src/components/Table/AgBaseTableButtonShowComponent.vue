<template>
  <router-link
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    title="Détail"
    :to="routerLink"
    :class="customClass"
  >
    <font-awesome-icon icon="eye" class="nav-icon" />
  </router-link>
</template>
<script>
export default {
  props: {
    customClass: {
      type: String,
      default: "btn btn-sm Sub me-1 mb-1 mb-md-0",
    },
    routerLink: {
      type: Object,
      default: "",
    },
  },
  data: function () {
    return {};
  },
  created() {},
};
</script>
