import { createRouter, createWebHistory } from "vue-router";
//Components
import HeaderBaseComponent from "@/components/Layout/FrontOffice/HeaderBaseComponent.vue";
import FooterBaseComponent from "@/components/Layout/FrontOffice/FooterBaseComponent.vue";
import HeaderClusterComponent from "@/components/Layout/FrontOffice/HeaderClusterComponent.vue";
import FooterClusterComponent from "@/components/Layout/FrontOffice/FooterClusterComponent.vue";
import HeaderOnlyComponent from "@/components/Layout/FrontOffice/HeaderOnlyComponent.vue";

//FrontOffice : Begin
import AccueilView from "@/views/FrontOffice/Accueil/AccueilView.vue";
import ClusterView from "@/views/FrontOffice/Cluster/ClusterView.vue";
import ToolsView from "@/views/FrontOffice/Tools/ToolsView.vue";
import NouvelleView from "@/views/FrontOffice/Nouvelle/NouvelleView.vue";
import NouvellebpmView from "@/views/FrontOffice/Nouvellebpm/NouvellebpmView.vue";

import AboutView from "@/views/FrontOffice/About/AboutView.vue";
import MyakasiView from "@/views/FrontOffice/Myakasi/MyakasiView.vue";
import ConsulterView from "@/views/FrontOffice/Consulter/ConsulterView.vue";
import PortefeuilleView from "@/views/FrontOffice/Portefeuille/PortefeuilleView.vue";

//FrontOffice : End

//Page auth : Begin
import LoginView from "@/views/Auth/Login/LoginView.vue";
import RegisterView from "@/views/Auth/Register/RegisterView.vue";
import ForgotPasswordView from "@/views/Auth/ForgotPassword/ForgotPasswordView.vue";
//import LoginClusterView from "@/views/Auth/LoginClusterView.vue";
//import ForgotPasswordClusterView from "@/views/Auth/ForgotPasswordClusterView.vue";
//Page auth : End

//BackOffice : Begin

// Admin Dashboard
import DasboardClusterView from "@/views/BackOffice/Dashboard/Cluster/DasboardClusterView.vue";

// Report
import Rapportview from "@/views/BackOffice/Rapports/RapportHebdomadaire/RapportListView.vue";
import RapportCreateView from "@/views/BackOffice/Rapports/RapportHebdomadaire/RapportCreateView.vue";
import RapportEditView from "@/views/BackOffice/Rapports/RapportHebdomadaire/RapportEditView.vue";
import RapportShowView from "@/views/BackOffice/Rapports/RapportHebdomadaire/RapportShowView.vue";

// User
import Userview from "@/views/BackOffice/User/UserListView.vue";
import UserDesactivatedList from "@/views/BackOffice/User/UserDesactivatedListView.vue";
import UserCreateView from "@/views/BackOffice/User/UserCreateView.vue";
import UserEditView from "@/views/BackOffice/User/UserEditView.vue";
import UserShowView from "@/views/BackOffice/User/UserShowView.vue";

// Members
import Memberview from "@/views/BackOffice/Member/MemberListView.vue";
import MemberCreateView from "@/views/BackOffice/Member/MemberCreateView.vue";
import MemberEditView from "@/views/BackOffice/Member/MemberEditView.vue";
import MemberShowView from "@/views/BackOffice/Member/MemberShowView.vue";

// Teams
import Teamsview from "@/views/BackOffice/Teams/TeamsListView.vue";
import TeamsCreateView from "@/views/BackOffice/Teams/TeamsCreateView.vue";
import TeamsEditView from "@/views/BackOffice/Teams/TeamsEditView.vue";
import TeamsShowView from "@/views/BackOffice/Teams/TeamsShowView.vue";

// Request
import Demandeview from "@/views/BackOffice/Demande/DemandeListView.vue";
import DemandeCreateView from "@/views/BackOffice/Demande/DemandeCreateView.vue";
import DemandeEditView from "@/views/BackOffice/Demande/DemandeEditView.vue";
import DemandeShowView from "@/views/BackOffice/Demande/DemandeShowView.vue";

// Project
import Projectview from "@/views/BackOffice/Project/ProjectListView.vue";
import ProjectCreateView from "@/views/BackOffice/Project/ProjectCreateView.vue";
import ProjectEditView from "@/views/BackOffice/Project/ProjectEditView.vue";
import ProjectShowView from "@/views/BackOffice/Project/ProjectShowView.vue";

// Profil user
import ProfilShowView from "@/views/BackOffice/Profil/ProfilShowView.vue";
import ProfilEditView from "@/views/BackOffice/Profil/ProfilEditView.vue";
import ProfilPasswordEditView from "@/views/BackOffice/Profil/ProfilPasswordEditView.vue";
// Chaîne de valeur : Traitement
import ChaineValeurListView from "@/views/BackOffice/Filiere/ChaineValeur/ChaineValeurListView.vue";

import ChaineValeurCreateView from "@/views/BackOffice/Filiere/ChaineValeur/ChaineValeurCreateView.vue";
import ChaineValeurEditView from "@/views/BackOffice/Filiere/ChaineValeur/ChaineValeurEditView.vue";
// Étapes de la chaîne de valeur : Traitement
import ChaineValeurDetailListView from "@/views/BackOffice/Filiere/ChaineValeurEtape/ChaineValeurEtapeListView.vue";
import ChaineValeurEtapeEditView from "@/views/BackOffice/Filiere/ChaineValeurEtape/ChaineValeurEtapeEditView.vue";

//User : CRUD

import UserListView from "@/views/BackOffice/Acl/User/UserListView.vue";
/*
import UserCreateView from "@/views/BackOffice/Acl/User/UserCreateView.vue";
import UserEditView from "@/views/BackOffice/Acl/User/UserEditView.vue"; */
//Role : CRUD
import RoleListView from "@/views/BackOffice/Acl/Role/RoleListView.vue";
import RoleCreateView from "@/views/BackOffice/Acl/Role/RoleCreateView.vue";
import RoleShowView from "@/views/BackOffice/Acl/Role/RoleShowView.vue";
import RoleEditView from "@/views/BackOffice/Acl/Role/RoleEditView.vue";
//Permission: CRUD
import PermissionListView from "@/views/BackOffice/Acl/Permission/PermissionListView.vue";

//Etape : CRUD
import EtapeListView from "@/views/BackOffice/Etape/Etape/EtapeListView.vue";
import EtapeCreateView from "@/views/BackOffice/Etape/Etape/EtapeCreateView.vue";
import EtapeEditView from "@/views/BackOffice/Etape/Etape/EtapeEditView.vue";
// Pays : CRUD
import PayListView from "@/views/BackOffice/Parametrage/Pay/PayListView.vue";
// Departement : CRUD
import DepartementListView from "@/views/BackOffice/Parametrage/Departement/DepartementListView.vue";
import DepartementCreateView from "@/views/BackOffice/Parametrage/Departement/DepartementCreateView.vue";
import DepartementEditView from "@/views/BackOffice/Parametrage/Departement/DepartementEditView.vue";
// Commune : CRUD
import CommuneListView from "@/views/BackOffice/Parametrage/Commune/CommuneListView.vue";
import CommuneCreateView from "@/views/BackOffice/Parametrage/Commune/CommuneCreateView.vue";
import CommuneEditView from "@/views/BackOffice/Parametrage/Commune/CommuneEditView.vue";
// Arrondissement : CRUD
import ArrondissementListView from "@/views/BackOffice/Parametrage/Arrondissement/ArrondissementListView.vue";
import ArrondissementCreateView from "@/views/BackOffice/Parametrage/Arrondissement/ArrondissementCreateView.vue";
import ArrondissementEditView from "@/views/BackOffice/Parametrage/Arrondissement/ArrondissementEditView.vue";
// Village : CRUD
import VillageListView from "@/views/BackOffice/Parametrage/Village/VillageListView.vue";
import VillageCreateView from "@/views/BackOffice/Parametrage/Village/VillageCreateView.vue";
import VillageEditView from "@/views/BackOffice/Parametrage/Village/VillageEditView.vue";

//BackOffice : End

//Pages erreur 404
import PageNotFound from "@/views/Erreur/PageNotFound.vue";

// Acteur : CRUD
import ActeurCategorieListView from "@/views/BackOffice/Acteur/ActeurCategorie/ActeurCategorieListView.vue";
import ActeurCategorieCreateView from "@/views/BackOffice/Acteur/ActeurCategorie/ActeurCategorieCreateView.vue";
import ActeurCategorieEditView from "@/views/BackOffice/Acteur/ActeurCategorie/ActeurCategorieEditView.vue";
import ActeurGroupeListView from "@/views/BackOffice/Acteur/ActeurGroupe/ActeurGroupeListView.vue";
import ActeurGroupeCreateView from "@/views/BackOffice/Acteur/ActeurGroupe/ActeurGroupeCreateView.vue";
import ActeurGroupeEditView from "@/views/BackOffice/Acteur/ActeurGroupe/ActeurGroupeEditView.vue";
import ActeurTypeListView from "@/views/BackOffice/Acteur/ActeurType/ActeurTypeListView.vue";
import ActeurTypeCreateView from "@/views/BackOffice/Acteur/ActeurType/ActeurTypeCreateView.vue";
import ActeurTypeEditView from "@/views/BackOffice/Acteur/ActeurType/ActeurTypeEditView.vue";
import ActeurListView from "@/views/BackOffice/Acteur/Acteur/ActeurListView.vue";
import ActeurCreateView from "@/views/BackOffice/Acteur/Acteur/ActeurCreateView.vue";
import ActeurEditView from "@/views/BackOffice/Acteur/Acteur/ActeurEditView.vue";
//Certification CRUD
import CertificationListView from "@/views/BackOffice/Certification/Certification/CertificationListView.vue";
import CertificationCreateView from "@/views/BackOffice/Certification/Certification/CertificationCreateView.vue";
import CertificationEditView from "@/views/BackOffice/Certification/Certification/CertificationEditView.vue";
//Etape : CRUD
import EtapeDetailListView from "@/views/BackOffice/Etape/EtapeDetail/EtapeDetailListView.vue";
import EtapeDetailCreateView from "@/views/BackOffice/Etape/EtapeDetail/EtapeDetailCreateView.vue";
import EtapeDetailEditView from "@/views/BackOffice/Etape/EtapeDetail/EtapeDetailEditView.vue";
import EtapeDetailAttributListView from "@/views/BackOffice/Etape/EtapeDetailAttribut/EtapeDetailAttributListView.vue";
import EtapeDetailAttributCreateView from "@/views/BackOffice/Etape/EtapeDetailAttribut/EtapeDetailAttributCreateView.vue";
import EtapeDetailAttributEditView from "@/views/BackOffice/Etape/EtapeDetailAttribut/EtapeDetailAttributEditView.vue";
import InformationSupportListView from "@/views/BackOffice/Etape/InformationSupport/InformationSupportListView.vue";
import InformationSupportCreateView from "@/views/BackOffice/Etape/InformationSupport/InformationSupportCreateView.vue";
import InformationSupportEditView from "@/views/BackOffice/Etape/InformationSupport/InformationSupportEditView.vue";
//Filiere CRUD
import FiliereListView from "@/views/BackOffice/Filiere/Filiere/FiliereListView.vue";
import FiliereCreateView from "@/views/BackOffice/Filiere/Filiere/FiliereCreateView.vue";
import FiliereEditView from "@/views/BackOffice/Filiere/Filiere/FiliereEditView.vue";
import FiliereVarieteListView from "@/views/BackOffice/Filiere/FiliereVariete/FiliereVarieteListView.vue";
import FiliereVarieteCreateView from "@/views/BackOffice/Filiere/FiliereVariete/FiliereVarieteCreateView.vue";
import FiliereVarieteEditView from "@/views/BackOffice/Filiere/FiliereVariete/FiliereVarieteEditView.vue";
//Produit CRUD
import ProduitFiniTypeListView from "@/views/BackOffice/Produit/ProduitFiniType/ProduitFiniTypeListView.vue";
import ProduitFiniTypeCreateView from "@/views/BackOffice/Produit/ProduitFiniType/ProduitFiniTypeCreateView.vue";
import ProduitFiniTypeEditView from "@/views/BackOffice/Produit/ProduitFiniType/ProduitFiniTypeEditView.vue";

/**
 * Fonction utilisée par les pages communes du frontoffice
 */
const headerFootPageComponents = function (byDefault) {
  return {
    default: byDefault,
    HeaderBaseComponent: HeaderBaseComponent,
    FooterBaseComponent: FooterBaseComponent,
  };
};

/**
 * Fonction utilisée par les pages d'un cluster : frontoffice
 */
const headerFootClusterPageComponents = function (byDefault) {
  return {
    default: byDefault,
    HeaderClusterComponent: HeaderClusterComponent,
    FooterClusterComponent: FooterClusterComponent,
  };
};

/**
 * Fonction utilisée par les pages d'authentification principalement : frontoffice
 */
const headerOnlyPageComponents = function (byDefault) {
  return {
    default: byDefault,
    HeaderOnlyComponent: HeaderOnlyComponent,
  };
};

const headFootClusterBackOfficeComponents = function (byDefault) {
  return {
    default: byDefault,
    //        SidebarClusterComponent: SidebarClusterComponent,
    //        TopbarClusterComponent: TopbarClusterComponent,
  };
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ///////////////////////FRONTOFFICE//////////////////////////////
    {
      path: "/",
      name: "pages.accueil",
      components: headerFootPageComponents(AccueilView),
    },
    {
      path: "/pages/cluster",
      name: "pages.cluster",
      components: headerFootClusterPageComponents(ClusterView),
    },
    {
      path: "/pages/about",
      name: "pages.about",
      components: headerFootPageComponents(AboutView),
    },

    {
      path: "/pages/nouvelle",
      name: "pages.nouvelle",
      components: headerFootPageComponents(NouvelleView),
    },
    {
      path: "/pages/nouvelles/:id",
      name: "pages.nouvelles",
      components: headerFootPageComponents(NouvellebpmView),
    },
    {
      path: "/pages/myakasi",
      name: "pages.myakasi",
      components: headerFootPageComponents(MyakasiView),
    },
    {
      path: "/pages/tools",
      name: "pages.tools",
      components: headerFootPageComponents(ToolsView),
    },
    {
      path: "/pages/consulter",
      name: "pages.consulter",
      components: headerOnlyPageComponents(ConsulterView),
    },

    {
      path: "/pages/portefeuille/:id",
      name: "pages.portefeuille",
      components: headerFootPageComponents(PortefeuilleView),
    },
    ///////////////////////////AUTH/////////////////////////////////
    {
      path: "/auth/login",
      name: "auth.login",
      components: headerOnlyPageComponents(LoginView),
    },
    {
      path: "/auth/register",
      name: "auth.register",
      components: headerOnlyPageComponents(RegisterView),
    },
    {
      path: "/auth/forgot-password",
      name: "auth.forgot-password",
      components: headerOnlyPageComponents(ForgotPasswordView),
    },

    ///////////////////////////BACKOFFICE///////////////////////////
    {
      path: "/dashboard",
      name: "dashboard",
      components: headFootClusterBackOfficeComponents(DasboardClusterView),
    },

    ///////////////////////////USER///////////////////////////

    {
      path: "/user/list",
      name: "user.list",
      components: headFootClusterBackOfficeComponents(Userview),
    },
    {
      path: "/user/desactivated/list",
      name: "user.desactivated",
      components: headFootClusterBackOfficeComponents(UserDesactivatedList),
    },
    {
      path: "/user/create",
      name: "user.create",
      components: headFootClusterBackOfficeComponents(UserCreateView),
    },
    {
      path: "/user/show/:id",
      name: "user.show",
      components: headFootClusterBackOfficeComponents(UserShowView),
    },
    {
      path: "/user/edit/:id",
      name: "user.edit",
      components: headFootClusterBackOfficeComponents(UserEditView),
    },

    ///////////////////////////PROJECT///////////////////////////

    {
      path: "/project/list",
      name: "project.list",
      components: headFootClusterBackOfficeComponents(Projectview),
    },
    {
      path: "/project/create",
      name: "project.create",
      components: headFootClusterBackOfficeComponents(ProjectCreateView),
    },
    {
      path: "/project/show/:id",
      name: "project.show",
      components: headFootClusterBackOfficeComponents(ProjectShowView),
    },
    {
      path: "/project/edit/:id",
      name: "project.edit",
      components: headFootClusterBackOfficeComponents(ProjectEditView),
    },

    ///////////////////////////TEAMS///////////////////////////

    {
      path: "/team/list",
      name: "team.list",
      components: headFootClusterBackOfficeComponents(Teamsview),
    },
    {
      path: "/team/create",
      name: "team.create",
      components: headFootClusterBackOfficeComponents(TeamsCreateView),
    },
    {
      path: "/team/show/:id",
      name: "team.show",
      components: headFootClusterBackOfficeComponents(TeamsShowView),
    },
    {
      path: "/team/edit/:id",
      name: "team.edit",
      components: headFootClusterBackOfficeComponents(TeamsEditView),
    },

    ///////////////////////////MEMBERS///////////////////////////

    {
      path: "/member/list",
      name: "member.list",
      components: headFootClusterBackOfficeComponents(Memberview),
    },
    {
      path: "/member/create/:id",
      name: "member.create",
      components: headFootClusterBackOfficeComponents(MemberCreateView),
    },
    {
      path: "/member/show/:id",
      name: "member.show",
      components: headFootClusterBackOfficeComponents(MemberShowView),
    },
    {
      path: "/member/edit/:id",
      name: "member.edit",
      components: headFootClusterBackOfficeComponents(MemberEditView),
    },
    ///////////////////////////RAPPORTS///////////////////////////

    {
      path: "/report/list",
      name: "report.list",
      components: headFootClusterBackOfficeComponents(Rapportview),
    },
    {
      path: "/report/create",
      name: "report.create",
      components: headFootClusterBackOfficeComponents(RapportCreateView),
    },
    {
      path: "/report/show/:id",
      name: "report.show",
      components: headFootClusterBackOfficeComponents(RapportShowView),
    },
    {
      path: "/report/edit/:id",
      name: "report.edit",
      components: headFootClusterBackOfficeComponents(RapportEditView),
    },
    ///////////////////////////DEMANDES///////////////////////////

    {
      path: "/request/list",
      name: "request.list",
      components: headFootClusterBackOfficeComponents(Demandeview),
    },
    {
      path: "/request/create",
      name: "request.create",
      components: headFootClusterBackOfficeComponents(DemandeCreateView),
    },
    {
      path: "/request/show/:id",
      name: "request.show",
      components: headFootClusterBackOfficeComponents(DemandeShowView),
    },
    {
      path: "/request/edit/:id",
      name: "request.edit",
      components: headFootClusterBackOfficeComponents(DemandeEditView),
    },

    ///////////////////////////PROFILE///////////////////////////

    {
      path: "/profil",
      name: "profil.show",
      components: headFootClusterBackOfficeComponents(ProfilShowView),
    },
    {
      path: "/profil/:id",
      name: "profil.edit",
      components: headFootClusterBackOfficeComponents(ProfilEditView),
    },
    {
      path: "/profil/:id/password/reset",
      name: "profil.password",
      components: headFootClusterBackOfficeComponents(ProfilPasswordEditView),
    },
    /******* MODULE FILIERE CRUD : Begin *******/
    {
      path: "/filiere/chaine_valeurs/list",
      name: "filiere.chaine_valeurs.list",
      components: headFootClusterBackOfficeComponents(ChaineValeurListView),
    },
    {
      path: "/filiere/chaine_valeurs/create",
      name: "filiere.chaine_valeurs.create",
      components: headFootClusterBackOfficeComponents(ChaineValeurCreateView),
    },
    {
      path: "/filiere/chaine_valeurs/:uuid/edit",
      name: "filiere.chaine_valeurs.edit",
      components: headFootClusterBackOfficeComponents(ChaineValeurEditView),
    },
    {
      path: "/filiere/chaine_valeur_etapes/list",
      name: "filiere.chaine_valeur_etapes.list",
      components: headFootClusterBackOfficeComponents(
        ChaineValeurDetailListView
      ),
    },
    {
      path: "/filiere/chaine_valeur_etapes/:uuid/edit",
      name: "filiere.chaine_valeur_etapes.edit",
      components: headFootClusterBackOfficeComponents(
        ChaineValeurEtapeEditView
      ),
    },
    {
      path: "/filiere/chaine_valeur_etapes/:cv_etape/list",
      name: "filiere.chaine_valeur_etapes.cv_etape.list",
      components: headFootClusterBackOfficeComponents(
        ChaineValeurDetailListView
      ),
    },

    /******* MODULE FILIERE CRUD : End *******/
    /******* MODULE ACL CRUD : Begin *******/
    {
      path: "/acl/users/list",
      name: "acl.users.list",
      components: headFootClusterBackOfficeComponents(UserListView),
    },
    {
      path: "/acl/users/create",
      name: "acl.users.create",
      components: headFootClusterBackOfficeComponents(UserCreateView),
    },
    {
      path: "/acl/users/:uuid/edit",
      name: "acl.users.edit",
      components: headFootClusterBackOfficeComponents(UserEditView),
    },
    {
      path: "/acl/roles/list",
      name: "acl.roles.list",
      components: headFootClusterBackOfficeComponents(RoleListView),
    },
    {
      path: "/acl/roles/create",
      name: "acl.roles.create",
      components: headFootClusterBackOfficeComponents(RoleCreateView),
    },
    {
      path: "/acl/roles/:uuid",
      name: "acl.roles.show",
      components: headFootClusterBackOfficeComponents(RoleShowView),
    },
    {
      path: "/acl/roles/:uuid/edit",
      name: "acl.roles.edit",
      components: headFootClusterBackOfficeComponents(RoleEditView),
    },
    {
      path: "/acl/permissions/list",
      name: "acl.permissions.list",
      components: headFootClusterBackOfficeComponents(PermissionListView),
    },
    /******* MODULE ACL CRUD : End *******/

    /******* MODULE ETAPE CRUD : Begin *******/
    {
      path: "/etape/etapes/list",
      name: "etape.etapes.list",
      components: headFootClusterBackOfficeComponents(EtapeListView),
    },
    {
      path: "/etape/etapes/create",
      name: "etape.etapes.create",
      components: headFootClusterBackOfficeComponents(EtapeCreateView),
    },
    {
      path: "/etape/etapes/:uuid/edit",
      name: "etape.etapes.edit",
      components: headFootClusterBackOfficeComponents(EtapeEditView),
    },
    {
      path: "/etape/etape-details/list",
      name: "etape.etape-details.list",
      components: headFootClusterBackOfficeComponents(EtapeDetailListView),
    },
    {
      path: "/etape/etape-details/create",
      name: "etape.etape-details.create",
      components: headFootClusterBackOfficeComponents(EtapeDetailCreateView),
    },
    {
      path: "/etape/etape-details/:uuid/edit",
      name: "etape.etape-details.edit",
      components: headFootClusterBackOfficeComponents(EtapeDetailEditView),
    },
    {
      path: "/etape/etape-detail-attributs/list",
      name: "etape.etape-detail-attributs.list",
      components: headFootClusterBackOfficeComponents(
        EtapeDetailAttributListView
      ),
    },
    {
      path: "/etape/etape-detail-attributs/create",
      name: "etape.etape-detail-attributs.create",
      components: headFootClusterBackOfficeComponents(
        EtapeDetailAttributCreateView
      ),
    },
    {
      path: "/etape/etape-detail-attributs/:uuid/edit",
      name: "etape.etape-detail-attributs.edit",
      components: headFootClusterBackOfficeComponents(
        EtapeDetailAttributEditView
      ),
    },
    {
      path: "/etape/information-supports/list",
      name: "etape.information-supports.list",
      components: headFootClusterBackOfficeComponents(
        InformationSupportListView
      ),
    },
    {
      path: "/etape/information-supports/create",
      name: "etape.information-supports.create",
      components: headFootClusterBackOfficeComponents(
        InformationSupportCreateView
      ),
    },
    {
      path: "/etape/information-supports/:uuid/edit",
      name: "etape.information-supports.edit",
      components: headFootClusterBackOfficeComponents(
        InformationSupportEditView
      ),
    },
    /******* MODULE ETAPE CRUD : End *******/

    /******* MODULE ACTEUR CRUD : Begin *******/
    {
      path: "/acteur/acteur-categories/list",
      name: "acteur.acteur-categories.list",
      components: headFootClusterBackOfficeComponents(ActeurCategorieListView),
    },
    {
      path: "/acteur/acteur-categories/create",
      name: "acteur.acteur-categories.create",
      components: headFootClusterBackOfficeComponents(
        ActeurCategorieCreateView
      ),
    },
    {
      path: "/acteur/acteur-categories/:uuid/edit",
      name: "acteur.acteur-categories.edit",
      components: headFootClusterBackOfficeComponents(ActeurCategorieEditView),
    },
    {
      path: "/acteur/acteur-groupes/list",
      name: "acteur.acteur-groupes.list",
      components: headFootClusterBackOfficeComponents(ActeurGroupeListView),
    },
    {
      path: "/acteur/acteur-groupes/create",
      name: "acteur.acteur-groupes.create",
      components: headFootClusterBackOfficeComponents(ActeurGroupeCreateView),
    },
    {
      path: "/acteur/acteur-groupes/:uuid/edit",
      name: "acteur.acteur-groupes.edit",
      components: headFootClusterBackOfficeComponents(ActeurGroupeEditView),
    },
    {
      path: "/acteur/acteur-types/list",
      name: "acteur.acteur-types.list",
      components: headFootClusterBackOfficeComponents(ActeurTypeListView),
    },
    {
      path: "/acteur/acteur-types/create",
      name: "acteur.acteur-types.create",
      components: headFootClusterBackOfficeComponents(ActeurTypeCreateView),
    },
    {
      path: "/acteur/acteur-types/:uuid/edit",
      name: "acteur.acteur-types.edit",
      components: headFootClusterBackOfficeComponents(ActeurTypeEditView),
    },
    {
      path: "/acteur/acteurs/list",
      name: "acteur.acteurs.list",
      components: headFootClusterBackOfficeComponents(ActeurListView),
    },
    {
      path: "/acteur/acteurs/create",
      name: "acteur.acteurs.create",
      components: headFootClusterBackOfficeComponents(ActeurCreateView),
    },
    {
      path: "/acteur/acteurs/:uuid/edit",
      name: "acteur.acteurs.edit",
      components: headFootClusterBackOfficeComponents(ActeurEditView),
    },

    /******* MODULE ACTEUR CRUD : End *******/

    /******* MODULE CERTIFICATION CRUD : Begin *******/
    {
      path: "/certification/certifications/list",
      name: "certification.certifications.list",
      components: headFootClusterBackOfficeComponents(CertificationListView),
    },
    {
      path: "/certification/certifications/create",
      name: "certification.certifications.create",
      components: headFootClusterBackOfficeComponents(CertificationCreateView),
    },
    {
      path: "/certification/certifications/:uuid/edit",
      name: "certification.certifications.edit",
      components: headFootClusterBackOfficeComponents(CertificationEditView),
    },

    /******* MODULE CERTIFICATION CRUD : End *******/

    /******* MODULE FILLIERE CRUD : Begin *******/
    {
      path: "/filiere/filieres/list",
      name: "filiere.filieres.list",
      components: headFootClusterBackOfficeComponents(FiliereListView),
    },
    {
      path: "/filiere/filieres/create",
      name: "filiere.filieres.create",
      components: headFootClusterBackOfficeComponents(FiliereCreateView),
    },
    {
      path: "/filiere/filieres/:uuid/edit",
      name: "filiere.filieres.edit",
      components: headFootClusterBackOfficeComponents(FiliereEditView),
    },
    {
      path: "/filiere/filiere-varietes/list",
      name: "filiere.filiere-varietes.list",
      components: headFootClusterBackOfficeComponents(FiliereVarieteListView),
    },
    {
      path: "/filiere/filiere-varietes/create",
      name: "filiere.filiere-varietes.create",
      components: headFootClusterBackOfficeComponents(FiliereVarieteCreateView),
    },
    {
      path: "/filiere/filiere-varietes/:uuid/edit",
      name: "filiere.filiere-varietes.edit",
      components: headFootClusterBackOfficeComponents(FiliereVarieteEditView),
    },

    /******* MODULE FILLIERE CRUD : End *******/

    /******* MODULE PRODUIT CRUD : Begin *******/
    {
      path: "/produit/produit-fini-types/list",
      name: "produit.produit-fini-types.list",
      components: headFootClusterBackOfficeComponents(ProduitFiniTypeListView),
    },
    {
      path: "/produit/produit-fini-types/create",
      name: "produit.produit-fini-types.create",
      components: headFootClusterBackOfficeComponents(
        ProduitFiniTypeCreateView
      ),
    },
    {
      path: "/produit/produit-fini-types/:uuid/edit",
      name: "produit.produit-fini-types.edit",
      components: headFootClusterBackOfficeComponents(ProduitFiniTypeEditView),
    },

    /******* MODULE PRODUIT CRUD : End *******/
    /******* MODULE PARAMETRAGE CRUD : Begin *******/
    {
      path: "/parametrage/pays/list",
      name: "parametrage.pays.list",
      components: headFootClusterBackOfficeComponents(PayListView),
    },
    {
      path: "/parametrage/departements/list",
      name: "parametrage.departements.list",
      components: headFootClusterBackOfficeComponents(DepartementListView),
    },
    {
      path: "/parametrage/departements/create",
      name: "parametrage.departements.create",
      components: headFootClusterBackOfficeComponents(DepartementCreateView),
    },
    {
      path: "/parametrage/departements/:uuid/edit",
      name: "parametrage.departements.edit",
      components: headFootClusterBackOfficeComponents(DepartementEditView),
    },
    {
      path: "/parametrage/communes/list",
      name: "parametrage.communes.list",
      components: headFootClusterBackOfficeComponents(CommuneListView),
    },
    {
      path: "/parametrage/communes/create",
      name: "parametrage.communes.create",
      components: headFootClusterBackOfficeComponents(CommuneCreateView),
    },
    {
      path: "/parametrage/communes/:uuid/edit",
      name: "parametrage.communes.edit",
      components: headFootClusterBackOfficeComponents(CommuneEditView),
    },
    {
      path: "/parametrage/arrondissements/list",
      name: "parametrage.arrondissements.list",
      components: headFootClusterBackOfficeComponents(ArrondissementListView),
    },
    {
      path: "/parametrage/arrondissements/create",
      name: "parametrage.arrondissements.create",
      components: headFootClusterBackOfficeComponents(ArrondissementCreateView),
    },
    {
      path: "/parametrage/arrondissements/:uuid/edit",
      name: "parametrage.arrondissements.edit",
      components: headFootClusterBackOfficeComponents(ArrondissementEditView),
    },
    {
      path: "/parametrage/villages/list",
      name: "parametrage.villages.list",
      components: headFootClusterBackOfficeComponents(VillageListView),
    },
    {
      path: "/parametrage/villages/create",
      name: "parametrage.villages.create",
      components: headFootClusterBackOfficeComponents(VillageCreateView),
    },
    {
      path: "/parametrage/villages/:uuid/edit",
      name: "parametrage.villages.edit",
      components: headFootClusterBackOfficeComponents(VillageEditView),
    },
    /******* MODULE PARAMETRAGE CRUD : End *******/

    ///////////////////////////ERREUR///////////////////////////////
    {
      path: "/:catchAll(.*)*",
      name: "PageNotFound",
      component: PageNotFound,
    },

    ///////////////////////////EXEMPLE///////////////////////////////
    {
      path: "/",
      alias: "/exemples",
      name: "exemples",
      component: () => import("@/views/BackOffice/Exemple/ExemplesList.vue"),
    },
    {
      path: "/exemples/:uuid",
      name: "exemple-details",
      component: () => import("@/views/BackOffice/Exemple/Exemple.vue"),
    },

    {
      path: "/add",
      name: "add",
      component: () => import("@/views/BackOffice/Exemple/ExempleAdd.vue"),
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

//If you want to check Authorized status everytime a navigating action is trigger,
//just add router.beforeEach() inside src/router.js like this:

/* {
  path: "/pages/myakasi",
  name: "pages.myakasi",
  components: headerFootPageComponents(MyakasiView),
} */

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/",
    "/pages/tools",
    "/pages/nouvelles/:id",
    "/pages/about",
    "/pages/nouvelle",
    "/pages/consulter",
    "/pages/portefeuille/:id",
    "/pages/support",
    "/pages/solutions",
    "/pages/consultations",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  //     // trying to access a restricted page + not logged in
  //     // redirect to login page
  if (authRequired && !loggedIn) {
    next("/auth/login");
  } else {
    next();
  }
});
export default router;
