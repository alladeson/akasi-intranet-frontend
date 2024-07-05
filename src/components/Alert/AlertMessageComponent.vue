<template>
  <div class="container-fluid" style="padding: 0">
    <div
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
      v-if="alerteMessageErreur"
    >
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
      <h4 class="alert-heading">
        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Erreur!
      </h4>
      <p v-html="alerteMessageErreur"></p>
    </div>

    <div
      class="alert alert-success alert-dismissible fade show"
      role="alert"
      v-if="alerteMessageSucces"
    >
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
      <h4><i class="fa fa-check" aria-hidden="true"></i> Succès</h4>
      <p v-html="alerteMessageSucces"></p>
    </div>

    <div
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
      v-if="alerteMessageInfo"
    >
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
      <h4><i class="fa fa-info-circle" aria-hidden="true"></i> Info</h4>
      <p v-html="alerteMessageInfo"></p>
    </div>

    <div
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
      v-if="alerteMessageAvertissement"
    >
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
      <a href="#" class="close" data-dismiss="alert" aria-label="close"
        >&times;</a
      >
      <h4><i class="fa fa-info-circle" aria-hidden="true"></i> Attention</h4>
      <p v-html="alerteMessageAvertissement"></p>
    </div>
  </div>
</template>
<script>
export default {
  //Variables/fonctions exposées depuis le component parent
  props: {},
  data() {
    return {
      alerteMessageErreur: "",
      alerteMessageSucces: "",
      alerteMessageInfo: "",
      alerteMessageAvertissement: "",
    };
  },
  methods: {
    setAlerteMessageErreur: function (texte) {
      this.alerteMessageErreur = texte;
    },
    setAlerteMessageSucces: function (texte) {
      this.alerteMessageSucces = texte;
    },
    setAlerteMessageInfo: function (texte) {
      this.alerteMessageInfo = texte;
    },
    setAlerteMessageAvertissement: function (texte) {
      this.alerteMessageAvertissement = texte;
    },
  },
};
</script>
