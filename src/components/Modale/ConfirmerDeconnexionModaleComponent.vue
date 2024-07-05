<template :vConfirmationDeconnexionMessage="vConfirmationDeconnexionMessage">
  <div
    class="modal fade"
    id="confirmerDeconnexionModale"
    tabindex="-1"
    aria-labelledby="confirmerDeconnexionModaleLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header Sub">
          <h5 class="modal-title" id="confirmerDeconnexionModaleLabel">
            {{ confirmationTitre }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            ref="btnFermerModale"
          ></button>
        </div>
        <div class="modal-body">
          {{ vConfirmationDeconnexionMessage }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn Edit" data-bs-dismiss="modal">
            Fermer
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="logoutParent"
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
    logout: Function,
    vConfirmationDeconnexionMessage: {
      type: String,
      default: "Voulez-vous vraiment vous déconnecter ?",
    },
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
    logoutParent: function () {
      this.loading = true;
      this.logout();
    },
    fermerModale: function () {
      var elem = this.$refs.btnFermerModale;
      this.loading = false;
      elem.click();
    },
  },
};
</script>
