import DataService from "@/services/BackOffice/Acl/Role/RoleDataService";
import PermissionDataService from "@/services/BackOffice/Acl/Permission/PermissionDataService";
import ValidationDonneesServeurService from "@/services/Validation/ValidationDonneesServeurService";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import BackOfficePageContent from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import AgBaseInputTextComponent from "@/components/Form/Field/AgBaseInputTextComponent.vue";
import AgBaseInputCheckBoxComponent from "@/components/Form/Field/AgBaseInputCheckBoxComponent.vue";
import AgBaseButtonSubmitComponent from "@/components/Form/Button/AgBaseButtonSubmitComponent.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import RoleEditGroupeComponent from "@/views/BackOffice/Acl/Role/RoleComponents/RoleEditGroupeComponent.vue";
import { useRoute } from 'vue-router';

export default {
    name: "RoleEdit",
    components: {
        AlertMessageComponent,
        BackOfficePageContent,
        AgBaseInputTextComponent,
        AgBaseInputCheckBoxComponent,
        AgBaseButtonSubmitComponent,
        BreadcrumbClusterComponent,
        RoleEditGroupeComponent,
    },
    data() {
        return {
            bdObjet: {
                display_name: '',
                permissions: []
            },
            loading: false,
            isLoadingTable: true,
            uuid: null,
            allPermissions: [],
            permission_groupes: [],
            firstp: '',
            searchRole: "",
            listeBreadcrumbs: [
                {texte: "Tableau de bord", nomRoute: "dashboard", parametres: {}},
                {texte: "Liste des rôles", nomRoute: "acl.roles.list", parametres: {}},
                {texte: "Editer un rôle", nomRoute: "", parametres: {}},
            ],
            permissions_uuid: [],
        };
    },
    computed: {
        inlineFilterSearch() {
            if(!this.searchRole){
                return this.allPermissions;
            }
            return this.allPermissions.filter(bdOb => {
                return bdOb.display_name.toLowerCase().match(this.searchRole.toLowerCase());
            });
        },
    },
    methods: {
        checkPermission(event) {
            let permUuid = event.target._value;
            let boolChecked = event.target.checked;

            if (boolChecked) {
                if (!this.permissions_uuid.includes(permUuid)) {
                    this.permissions_uuid.push(permUuid);
                }
            } else {
                const indexUuid = this.permissions_uuid.indexOf(permUuid);
                if (indexUuid > -1) { // only splice array when item is found
                    this.permissions_uuid.splice(indexUuid, 1); // 2nd parameter means remove one item only
                }
            }
        },
        firstWord(per) {
            this.firstp = per.substring(0, per.indexOf(' '));
            return this.firstp;
        },
        obtenirPermissionListe() {
            PermissionDataService.getAll()
                    .then(response => {
                        this.allPermissions = response.data.data;
                        this.permission_groupes = response.data.permission_groupes;
                        this.isLoadingTable = false;
                    })
                    .catch(e => {
                    });
        },
        bdObjetGet(uuid) {
            DataService.get(uuid)
                    .then(response => {
                        this.bdObjet = response.data.data;
                        this.permissions_uuid = response.data.data.permissions_uuid;
                        this.uuid = uuid;
                    })
                    .catch(e => {
                    });
        },
        bdObjetSaveUpdateRole() {
            let uuid = this.bdObjet.uuid;
            let donnee = {
                display_name: this.bdObjet.display_name,
                permissions: this.permissions_uuid,
            };
            this.loading = true;
            DataService.update(uuid, donnee)
                    .then(response => {
                        this.loading = false;
                        this.$router.push({name: "acl.roles.list", query: {alertSucces: 'Item mis à jour avec succès'}});
                    })
                    .catch(e => {
                        ValidationDonneesServeurService.reInitListeChampsFormulaire();
                        let erreurMessage = ValidationDonneesServeurService.traiterStatutErreurEtRetournerMessage(e);
                        this.$refs.refAlerteMessage.setAlerteMessageErreur(erreurMessage);
                        this.loading = false;
                    });
        },
    },
    mounted() {
        const route = useRoute();
        this.bdObjetGet(route.params.uuid);
        this.obtenirPermissionListe();

    }
};