<template>
  <div class="input-group mb-3">
    <input
      type="text"
      :class="customClass"
      :name="nom"
      placeholder="Rechercher..."
      v-model="rechercheVmodel"
    />

    <div class="input-group-append">
      <button :class="customButtonClass" type="button" @click="lancerReherche">
        <font-awesome-icon icon="search" class="nav-icon" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customClass: {
      type: String,
      default: "form-control float-right",
    },
    customButtonClass: {
      type: String,
      default: "btn  Sub",
    },
    nom: {
      type: String,
      default: "recherche",
    },
    rechercheVmodel: {
      type: String,
      default: "",
    },
    rechercheObjets: {
      type: Function,
    },
  },
  methods: {
    lancerReherche: function () {
      this.rechercheObjets();
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
