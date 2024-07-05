<template>
  <div class="wrapper">
    <TopbarClusterComponent />
    <SidebarClusterComponent />

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0">{{ nomPage }}</h1>
            </div>
            <!-- /.col -->
            <div class="col-sm-6">
              <slot name="Breadcrumb"> </slot>
            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <slot name="MainContent"> </slot>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
      <div class="p-3">
        <slot name="ControlSidebar">
          <h5>Comment ça marche ?</h5>
          <p>Petites astuces sur l'utilisation de la plateforme...</p>
        </slot>
      </div>
    </aside>
    <!-- /.control-sidebar -->

    <FooterClusterComponent />
  </div>
</template>

<script>
import "@/assets/template/js/jquery.min.js";
import "@/assets/template/js/bootstrap.bundle.min.js";
import "@/assets/template/js/adminlte.min.js";

import UserService from "@/services/user.service";
import TopbarClusterComponent from "@/components/Layout/BackOffice/TopbarClusterComponent.vue";
import SidebarClusterComponent from "@/components/Layout/BackOffice/SidebarClusterComponent.vue";
import FooterClusterComponent from "@/components/Layout/BackOffice/FooterClusterComponent.vue";

export default {
  name: "BackOfficeLayoutClusterSlot",
  components: {
    TopbarClusterComponent,
    SidebarClusterComponent,
    FooterClusterComponent,
  },
  props: {
    nomPage: {
      type: String,
      default: "Nom de la page",
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "auth.login" });
    },
  },
  mounted() {
    document.body.classList.add(
      "layout-navbar-fixed",
      "layout-fixed",
      "sidebar-mini"
    );
  },
};
//https://vuejs.org/guide/components/slots.html#named-slots
</script>

<style lang="css">
@import "@/assets/template/css/adminlte.min.css";
</style>
