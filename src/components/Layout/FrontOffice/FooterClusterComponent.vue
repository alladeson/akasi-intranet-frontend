<template>
        <footer>
            <!-- Section: Links  -->
            <section class="BgfooterClust">
                <div class="container text-center text-md-start mt-5">
                <!-- Grid row -->
                <div class="row mt-3 p-2">
                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 text-justify ">
                    <!-- Content -->
                    <h5 class="text-uppercase fw-bold mb-4">Accueil</h5>
                        <p>
                            <RouterLink :to="{ name: 'pages.cluster'}" class="align-items-center textfooterClust mb-md-0 me-md-auto text-decoration-none">Cluster</RouterLink>
                        </p>
                        <p>
                            <RouterLink :to="{ name: 'pages.accueil'}" class="align-items-center textfooterClust mb-md-0 me-md-auto text-decoration-none">eAgroTrace</RouterLink>
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 text-justify">
                    <!-- Links -->
                    <h5 class="justify-content-center">Consultations</h5>
                        <p>
                            <RouterLink :to="{ name: 'pages.consulter'}" class="align-items-center textfooterClust mb-md-0 me-md-auto text-decoration-none">Consulter</RouterLink>
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 text-justify ">
                    <!-- Links -->
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-justify ">
                    <!-- Links -->
                    <h5 class="justify-content-center">Souscrire à la Newsletter</h5>
                        <p class="me-4">Abonnez-vous  la Newsletter pour recevoir  nos dernières actualités</p>
                        <div class="input-group mb-5">
                            <input type="email" class="form-control bg-none" placeholder="Adresse email" aria-label="Adresse email" aria-describedby="basic-addon2">
                            <span class="input-group-text" id="basic-addon2">Souscrire</span>
                        </div>
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
                </div>
            </section>
            <!-- Section: Links  -->
            <div class="BgNoir row">
                <div class="col-lg-6 col-md-6 col-sm 6 p-5">
                    <RouterLink :to="{ name: 'pages.cluster'}" class="d-flex align-items-center text-decoration-none">
                        <img
                            alt="Vue logo"
                            class="logo"
                            src="@/assets/images/clustlogoWhite.svg"
                            width="200"
                            height="200"
                            />
                    </RouterLink>
                </div>
                <div class="col-lg-6 col-md-6 col-sm 6">
                    <div class="float-right p-5">
                        <RouterLink :to="{ name: 'pages.cluster'}" class="me-2">
                            <img 
                                src="@/assets/images/TwitterWhite.svg"
                                />
                        </RouterLink>
                        <RouterLink :to="{ name: 'pages.cluster'}" class="me-2">
                            <img 
                                src="@/assets/images/facebookWhite.svg"
                                />
                        </RouterLink>
                        <RouterLink :to="{ name: 'pages.cluster'}" class="me-2">
                            <img 
                                src="@/assets/images/instagramWhite.svg"
                                />
                        </RouterLink>
                        <RouterLink :to="{ name: 'pages.cluster'}" class="me-2">
                            <img 
                                src="@/assets/images/LinkedinWhite.svg"
                                />
                        </RouterLink>
                    </div>
                </div>
            </div>
        </footer>
</template>
