import UserDataService from "@/services/BackOffice/User/UserDataService";
import BackOfficeLayoutClusterSlot from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import ChaineValeurProgressionComponent from "@/components/App/ChaineValeurProgressionComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
import AgBaseInputEmailComponent from "@/components/Form/Field/AgBaseInputEmailComponent.vue";
import AgBaseInputPasswordComponent from "@/components/Form/Field/AgBaseInputPasswordComponent.vue";
import AgBaseInputNumberComponent from "@/components/Form/Field/AgBaseInputNumberComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import { useRoute } from "vue-router";
import "vue-select/dist/vue-select.css";

export default {
  name: "ProfilEditView",
  components: {
    BackOfficeLayoutClusterSlot,
    BreadcrumbClusterComponent,
    ChaineValeurProgressionComponent,
    AlertMessageComponent,
    AgBaseInputTextComponent,
    AgBaseInputEmailComponent,
    AgBaseInputPasswordComponent,
    AgBaseInputNumberComponent,
    AgBaseButtonSubmitComponent,
  },
  data() {
    return {
      bdObjet: {},
      id: null,
      loading: false,
      roles: [],
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        {
          texte: "Informations de profil",
          nomRoute: "profil.show",
          parametres: {},
        },
        { texte: "Editer mon profil", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    // bdObjetGet() {
    //     this.bdObjet = UserService.currentUser();
    // },
    onCvSelected(event) {
      let file = event.target.files[0];
      this.bdObjet.cv = file;
    },
    onProfilSelected(event) {
      let file = event.target.files[0];
      this.bdObjet.profil = file;
    },
    bdObjetGet(id) {
      UserDataService.show(id)
        .then((response) => {
          this.bdObjet = response.data.user;
          this.id = id;
          if (!this.bdObjet.gender) {
            this.bdObjet.gender = "1";
          }
        })
        .catch((e) => {
        });
    },
    bdObjetSave() {
      this.loading = true;
      let formData = new FormData();

      formData.append("cv", this.bdObjet.cv);
      formData.append("profil", this.bdObjet.profil);
      formData.append("address", this.bdObjet.address);
      formData.append("firstname", this.bdObjet.firstname);
      formData.append("lastname", this.bdObjet.lastname);
      formData.append("gender", this.bdObjet.gender);
      formData.append("phone", this.bdObjet.phone);
      formData.append("mobile", this.bdObjet.mobile);
      formData.append("zip_code", this.bdObjet.zip_code);
      formData.append("civic_code", this.bdObjet.civic_code);
      formData.append("emergency_person1", this.bdObjet.emergency_person1);
      formData.append("emergency_phone1", this.bdObjet.emergency_phone1);
      formData.append(
        "emergency_person1_relationship",
        this.bdObjet.emergency_person1_relationship
      );
      formData.append("emergency_person2", this.bdObjet.emergency_person2);
      formData.append("emergency_phone2", this.bdObjet.emergency_phone2);
      formData.append(
        "emergency_person2_relationship",
        this.bdObjet.emergency_person2_relationship
      );
      formData.append("_method", "put");
      UserDataService.updateProfil(this.bdObjet.id, formData)
        .then((response) => {
          if (response.data.error) {
            this.$refs.refAlerteMessage.setAlerteMessageErreur(
              "Erreur de validation!"
            );
          } else {
            this.$router.push({
              name: "profil.show",
              query: { alertSucces: "Profil mis à jour avec succès" },
            });
          }
          this.loading = false;
        })
        .catch((e) => {
          this.$refs.refAlerteMessage.setAlerteMessageErreur(
            "Erreur lors de la mise à jour du profil!"
          );
          this.loading = false;
        });
    },
  },
  computed: {},
  mounted() {
    const route = useRoute();
    this.bdObjetGet(route.params.id);
  },
};
