<template>
  <!-- ======= Header ======= -->
  <header id="header " class="header fixed-top">
    <div
      id=""
      class="container-fluid container-xl d-flex align-items-center justify-content-between"
    >
      <router-link to="/">
        <div class="logo d-flex align-items-center he">
          <img src="@/assets/img/log1.png" alt="" />
        </div>
      </router-link>

      <nav id="navbar" class="navbar">
        <ul>
          <!-- 
          <li>
            <RouterLink
              :to="{ name: 'pages.accueil' }"
              class="nav-link active"
              >{{ $t("page.accueil.titre") }}</RouterLink
            >
          </li> -->
          <li>
            <RouterLink :to="{ name: 'pages.about' }" class="nav-link active">{{
              $t("page.about.titre")
            }}</RouterLink>
          </li>

          <!-- <li>
            <RouterLink :to="{ name: 'pages.product' }" class="nav-link">{{
              $t("page.product.titre")
            }}</RouterLink>
          </li> -->
          <li>
            <RouterLink :to="{ name: 'pages.tools' }" class="nav-link">{{
              $t("page.tools.titre")
            }}</RouterLink>
          </li>
          <!-- <li>
            <RouterLink :to="{ name: 'pages.clients' }" class="nav-link">{{
              $t("page.clients.titre")
            }}</RouterLink>
          </li>  -->
          <li>
            <RouterLink :to="{ name: 'pages.nouvelle' }" class="nav-link">{{
              $t("page.nouvelle.titre")
            }}</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'auth.login' }" class="btn getstarted">{{
              $t("page.myakasi.titre")
            }}</RouterLink>
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle" @click="showMenu"></i>
      </nav>
      <!-- .navbar -->
    </div>
    <div className="sidenav">
      <ul>
        <li @click="showMenu">
          <RouterLink :to="{ name: 'pages.about' }" class="nav-link active">{{
            $t("page.about.titre")
          }}</RouterLink>
        </li>
        <li @click="showMenu">
          <RouterLink :to="{ name: 'pages.tools' }" class="nav-link">{{
            $t("page.tools.titre")
          }}</RouterLink>
        </li>
        <li @click="showMenu">
          <RouterLink :to="{ name: 'pages.nouvelle' }" class="nav-link">{{
            $t("page.nouvelle.titre")
          }}</RouterLink>
        </li>
        <li @click="showMenu">
          <RouterLink :to="{ name: 'auth.login' }" class="btn getstarted">{{
            $t("page.myakasi.titre")
          }}</RouterLink>
        </li>
      </ul>
    </div>
  </header>
  <!-- End Header -->
</template>
<script>
import UserService from "@/services/user.service";

export default {
  setup() {
    /* function scrollHeader() {
      const scrollY = window.pageYOffset;
      const nav = document.getElementById("custNav");
      // When the scroll is greater than 80 viewport height, add the bg-nav-scroll class to the header tag
      if (nav) {
        if (this.scrollY >= 80) nav.classList.add("bg-nav-scroll");
        else nav.classList.remove("bg-nav-scroll");
      }
    } 

    window.addEventListener("scroll", scrollHeader);*/

    return {
      currentUser: UserService.currentUser(),
    };
  },
  methods: {
    showMenu() {
      let sidenav = document.getElementsByClassName("sidenav");
      if (sidenav[0].style.display == "block") {
        sidenav[0].style.display = "none";
      } else {
        sidenav[0].style.display = "block";
      }
    },
  },
};
</script>
<style scoped>
* {
  position: relative;
}

.sidenav {
  display: none ;
  border-top: 1px solid #ececec;
  transition: 25s !important;
  transform-origin: top;
}

.sidenav ul li{
  margin-left: 0 !important;

}
.sidenav .nav-link{
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.sidenav .getstarted{
  margin-left: 0 !important;
}
.navbar a.router-link-active,
.navbar a.router-link-exact-active {
  color: #4154f1 !important;
  font-weight: bold !important;
}

.navbar a.router-link-exact-active::after {
  content: "";
  position: absolute;
  background-color: #4154f1 !important;
  font-weight: bold;
  left: 0;
  width: 100%;
  bottom: 0;
  height: 2px;
}

/*--------------------------------------------------------------
  # Header
  --------------------------------------------------------------*/
.header {
  position: fixed !important ;
  transition: 35.5s;
  z-index: 997;
  padding: 20px 0;
  background: #fff;
  padding: 15px 0;
  box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
}

.header.header-scrolled {
  background: #fff;
  padding: 15px 0;
  box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
}

.header .logo {
  line-height: 0;
}

.header .logo img {
  max-height: 40px;
  margin-right: 6px;
}

.header .logo span {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 1px;
  /* color: #012970; */
  font-family: "Nunito", sans-serif;
  margin-top: 3px;
}

/*--------------------------------------------------------------
  # Navigation Menu
  --------------------------------------------------------------*/
/**
  * Desktop Navigation 
  */
.navbar {
  padding: 0;
}

.navbar ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
}

.navbar li {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link {
  display: block;
  margin: 0.5rem 1rem;
  padding: 0 !important;
}

.navbar a,
.navbar a:focus {
  display: flex;
  align-items: center;
  justify-content: center;
  /*   padding: 10px 0 10px 30px;
 */
  font-family: "Nunito", sans-serif;
  font-size: 14.5px;
  font-weight: 400;
  color: #000;
  white-space: nowrap;
  transition: 0.3s;
  text-transform: uppercase;
  padding: 5px 0 !important;
}

.navbar a i,
/* .navbar a:focus i {
  font-size: 12px;
  line-height: 0;
  margin-left: 5px;
} */

.navbar a:hover,
.navbar li:hover > a {
  color: #4154f1;
}

.navbar .getstarted,
.navbar .getstarted, .sidenav .getstarted  {
  background: #fff;
  padding: 7px 20px !important;
  margin-left: 30px;
  border-radius: 4px;
  color: #000;
  border: 1px solid #4154f1;
}

.navbar .getstarted:focus, .sidenav .getstarted:focus {
  color: #fff;
  background: #020841;
  padding: 7px 20px !important;
  transform: translate(1.05);
}

.navbar .getstarted:hover,
.navbar .getstarted:focus:hover, .sidenav .getstarted:hover,
.sidenav .getstarted:focus:hover {
  color: #fff;
  background: #5969f3;
  padding: 7px 20px !important;
}

.navbar .dropdown ul {
  display: block;
  position: absolute;
  left: 14px;
  top: calc(100% + 30px);
  margin: 0;
  padding: 10px 0;
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  background: #fff;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
  transition: 0.3s;
  border-radius: 4px;
}

.navbar .dropdown ul li {
  min-width: 200px;
}

.navbar .dropdown ul a {
  padding: 10px 20px;
  font-size: 15px;
  text-transform: none;
  font-weight: 600;
}

.navbar .dropdown ul a i {
  font-size: 12px;
}

.navbar .dropdown ul a:hover,
.navbar .dropdown ul .active:hover,
.navbar .dropdown ul li:hover > a {
  color: #4154f1;
}

.navbar .dropdown:hover > ul {
  opacity: 1;
  top: 100%;
  visibility: visible;
}

.navbar .dropdown .dropdown ul {
  top: 0;
  left: calc(100% - 30px);
  visibility: hidden;
}

.navbar .dropdown .dropdown:hover > ul {
  opacity: 1;
  top: 0;
  left: 100%;
  visibility: visible;
}

@media (max-width: 1366px) {
  .navbar .dropdown .dropdown ul {
    left: -90%;
  }

  .navbar .dropdown .dropdown:hover > ul {
    left: -100%;
  }
}

/**
  * Mobile Navigation 
  */
.mobile-nav-toggle {
  color: #012970;
  font-size: 28px;
  cursor: pointer;
  display: none;
  line-height: 0;
  transition: 0.5s;
}

.mobile-nav-toggle.bi-x {
  color: #fff;
}

@media (max-width: 991px) {
  .mobile-nav-toggle {
    display: block;
  }

  .navbar ul {
    display: none;
  }
}

.navbar-mobile {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(1, 22, 61, 0.9);
  transition: 0.3s;
}

.navbar-mobile .mobile-nav-toggle {
  position: absolute;
  top: 15px;
  right: 15px;
}

.navbar-mobile ul {
  display: block;
  position: absolute;
  top: 55px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  padding: 10px 0;
  border-radius: 10px;
  background-color: #fff;
  overflow-y: auto;
  transition: 0.3s;
}

.navbar-mobile a,
.navbar-mobile a:focus {
  padding: 10px 20px;
  font-size: 15px;
  color: #012970;
}

.navbar-mobile a:hover,
.navbar-mobile .active,
.navbar-mobile li:hover > a {
  color: #4154f1;
}

.navbar-mobile .getstarted,
.navbar-mobile .getstarted:focus {
  margin: 15px;
}

.navbar-mobile .dropdown ul {
  position: static;
  display: none;
  margin: 10px 20px;
  padding: 10px 0;
  z-index: 99;
  opacity: 1;
  visibility: visible;
  background: #fff;
  box-shadow: 0px 0px 30px rgba(127, 137, 161, 0.25);
}

.navbar-mobile .dropdown ul li {
  min-width: 200px;
}

.navbar-mobile .dropdown ul a {
  padding: 10px 20px;
}

.navbar-mobile .dropdown ul a i {
  font-size: 12px;
}

.navbar-mobile .dropdown ul a:hover,
.navbar-mobile .dropdown ul .active:hover,
.navbar-mobile .dropdown ul li:hover > a {
  color: #4154f1;
}

.navbar-mobile .dropdown > .dropdown-active {
  display: block;
}
</style>
