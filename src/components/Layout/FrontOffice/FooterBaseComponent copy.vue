<template>
        <!-- =======================
    Footer START -->
    <footer class="pt-5 bg-dark">
        <div class="container">
            <!-- Row START -->
            <div class="row g-4">

                <!-- Widget 1 START -->
                <div class="col-lg-3">
                    <!-- logo -->
                    <a class="me-0" href="index.html">
                        <img class="light-mode-item h-40px" src="@/assets/images/Logo eAGROTRACE light.png" alt="logo">
                        <!-- <img class="dark-mode-item h-40px" src="@/assets/images/Logo eAGROTRACE light.png" alt="logo"> -->
                    </a>
                    <h5 class="my-3"><small>eAgroTrace est une Plateforme de traçabilité de l’ananas du Bénin</small></h5>
                    <!-- Social media icon -->
                    <!-- <ul class="list-inline mb-0 mt-3">
                        <li class="list-inline-item"> <a class="btn btn-white btn-sm shadow px-2 text-facebook" href="#"><i class="fab fa-fw fa-facebook-f"></i></a> </li>
                        <li class="list-inline-item"> <a class="btn btn-white btn-sm shadow px-2 text-instagram" href="#"><i class="fab fa-fw fa-instagram"></i></a> </li>
                        <li class="list-inline-item"> <a class="btn btn-white btn-sm shadow px-2 text-twitter" href="#"><i class="fab fa-fw fa-twitter"></i></a> </li>
                        <li class="list-inline-item"> <a class="btn btn-white btn-sm shadow px-2 text-linkedin" href="#"><i class="fab fa-fw fa-linkedin-in"></i></a> </li>
                    </ul> -->
                </div>
                <!-- Widget 1 END -->
                <!-- Widget 2 START -->
                <div class="col-lg-2">
                </div>
                <div class="col-lg-4">
                    <div class="row g-4">
                        <!-- Link block -->
                        <div class="col-6 col-md-6 ">
                            <h5 class="mb-2 mb-md-4">MENU</h5>
                            <div class="mb-2">
                                <div class="p-1">
                                    <router-link class="nav-link textWhite p-1" :to="{name: 'pages.solution'}">Nos Solutions</router-link>
                                </div>
                                <div class="p-1">
                                <router-link class="nav-link textWhite p-1" to="/pages/clusters">Membres</router-link>
                                </div>
                                <div class="p-1">
                                    <router-link class="nav-link textWhite p-1" to="/pages/support">Support</router-link>
                                </div>
                                <div class="p-1">
                                    <router-link class="nav-link textWhite p-1" to="/auth/register">Devenez Membre</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Widget 2 END -->

                <!-- Widget 3 START -->
                <div class="col-lg-3">
                    <h5 class="mb-2 mb-md-4">Contact</h5>
                    <!-- Time -->
                    <div class="mb-2">
                        <div class="p-1">
                            <font-awesome-icon icon="map-location" class="nav-icon"/><span class="h6 fw-light ms-2">eAgroTrace avenue Dahomey.</span>
                        </div>
                        <div class="p-1">
                            <font-awesome-icon icon="phone" class="nav-icon"/><span class="h6 fw-light ms-2"> +229 71717171 </span>
                        </div>
                        <div class="p-1">
                            <font-awesome-icon icon="mail-bulk" class="nav-icon"/><span class="h6 fw-light ms-2">contact@eagrotrace.bj</span>
                        </div>
                    </div>                     
                </div> 
                <!-- Widget 3 END -->
                
                <!-- Widget 3 END -->
            </div><!-- Row END -->

            <!-- Divider -->
            <hr class="mt-4 mb-0">

            <!-- Bottom footer -->
            <div class=" bg-dark">
                
            </div>
        </div>
    </footer>
    <div class="section-footer">
        <div class="container px-0">
            <div class="d-lg-flex justify-content-between align-items-center py-3 text-center text-md-left">
                <!-- copyright text -->
                <div class="text-primary-hover">Copyright © 2022 eagrotrace.bj    Tous droits réservés     |     Politique de confidentialité     |     Terms et Conditions</div>
            </div>
        </div>
    </div>
    <!-- =======================
    Footer END -->
</template>
