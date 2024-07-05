import UserDataService from "@/services/BackOffice/User/UserDataService";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import { useRoute } from "vue-router";

export default {
  name: "ForgotPassword",
  components: {
    AlertMessageComponent,
  },
  data() {
    return {
      bdObjet: {},
      loading: false,
      disabled: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    bdObjetSave() {
      this.loading = true;

      UserDataService.resetPassword(this.bdObjet)
        .then((response) => {
          this.loading = false;

          if (response.data.error) {
            this.$refs.refAlerteMessage.setAlerteMessageErreur(
              "Email incorrect"
            );
          } else {
            this.$refs.refAlerteMessage.setAlerteMessageSucces(
              "Mot de passe restaurer avec succès. Veuillez consulter votre boîte mail pour vous connecter"
            );
            this.disabled = true;
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Cet utilisateur n'existe !"
          );
        });
    },

    setAlertesMessage() {
      const route = useRoute();
      this.alert.alertErreur = route.query.alertErreur
        ? route.query.alertErreur
        : "";
      this.alert.alertSucces = route.query.alertSucces
        ? route.query.alertSucces
        : "";
      this.alert.alerteInfo = route.query.alerteInfo
        ? route.query.alerteInfo
        : "";
      this.alert.alerteAvertissement = route.query.alerteAvertissement
        ? route.query.alerteAvertissement
        : "";

      this.$refs.refAlerteMessage.setAlerteMessageErreur(
        this.alert.alertErreur
      );
      this.$refs.refAlerteMessage.setAlerteMessageSucces(
        this.alert.alertSucces
      );
      this.$refs.refAlerteMessage.setAlerteMessageInfo(this.alert.alerteInfo);
      this.$refs.refAlerteMessage.setAlerteMessageAvertissement(
        this.alert.alerteAvertissement
      );

      this.nettoyerAlertesMessageUrl();
    },
    nettoyerAlertesMessageUrl() {
      this.$router.replace({ alertErreur: null });
      this.$router.replace({ alertSucces: null });
      this.$router.replace({ alerteInfo: null });
      this.$router.replace({ alerteAvertissement: null });
    },
  },
};
