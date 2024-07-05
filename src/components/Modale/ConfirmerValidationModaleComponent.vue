<template>
  <div
    class="modal fade"
    id="confirmerValidationModale"
    tabindex="-1"
    aria-labelledby="confirmerValidationModaleLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-info">
          <h5 class="modal-title" id="confirmerValidationModaleLabel">
            {{ confirmationTitre }}
          </h5>
          <button
            type="button white"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ref="btnFermerModale"
          ></button>
        </div>
        <div class="modal-body">
          {{ vConfirmationValidationMessage }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary Edit"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="validateDonneeParent"
            :disabled="loading"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Confirmer</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  //Variables/fonctions exposées depuis le component parent
  props: {
    vConfirmationValidationMessage: {
      type: String,
      default: "Êtes-vous sûr de vouloir valider ?",
    },
    validateDonnee: Function,
    confirmationTitre: {
      type: String,
      default: "Confirmation",
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    validateDonneeParent: function () {
      this.loading = true;
      this.validateDonnee();
    },
    fermerModale: function () {
      var elem = this.$refs.btnFermerModale;
      this.loading = false;
      elem.click();
    },
  },
};
//https://stackoverflow.com/questions/40957008/how-to-access-to-a-child-method-from-the-parent-in-vue-js
</script>
