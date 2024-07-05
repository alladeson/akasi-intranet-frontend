
<template>
    <!-- **************** MAIN CONTENT START **************** -->
    <div class="container">
        <section>
            <div class="container">
                <div class="row mt-5">
                    <div class="col col-lg-6 col-md-6 col-sm-12 mt-4">
                        <h1 class="text-uppercase fw-bold">TRACABILITE</h1>
                        <p class="fs-5 mb-5">Bienvenue sur eAgroTrace, la plateforme de traçabilité de l'ananas du Bénin</p>
                        <RouterLink :to="{ name: 'pages.consulter'}" class="btn btn-success rounded-pill bg-opacity-50">CONSULTER</RouterLink>
                        <a href="#" class="text-success text-decoration-none fw-bold ms-5" target="_blank">Télécharger l'application</a>
                    </div>
                    <div class="col col-lg-6 col-md-6 col-sm-12 me-auto px-4">
                        <img src="@/assets/images/Group170imageSlide.png" class="float-start img-fluid" alt="Image de bannière Accueil" />
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="d-flex mb-5">
                <div class="col col-lg-6 col-md-6 col-sm-12">
                    <img src="@/assets/images/img_629ef2c61f85b.jpg" class="float-start img-fluid" alt="Image de bannière" />
                </div>
                <div class="col col-lg-6 col-md-6 col-sm-12 text-center pt-4 px-4 bg-success shadow-1-strong rounded text-white">
                    <h3 class="pb-4">A propos de eAgroTrace</h3>
                    <p class="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, velit ab doloribus perferendis officiis impedit minima amet facilis fugit nostrum dolor accusamus cumque sed quam delectus, culpa tempore libero sequi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus quas odio impedit amet possimus quidem tenetur fuga quo asperiores maiores excepturi, aliquam deserunt ab? Voluptas ipsa excepturi molestiae aliquid corporis?</p>
                </div>
            </div>
        </section>

        <section>
            <h3 class="fw-bold text-center mb-4">SERVICES</h3>
            <div class="row mb-5">
                <div class="d-flex justify-center">
                    <div class="card col-lg-2 col-md-3 col-sm-4 me-auto">
                        <img src="@/assets/images/XVM229c582e-b95b-11e5-91b9-78e7d6d8aa43.webp" class="card-img-top" alt="...">
                        <div class="card-body text-center">
                            <h6 class="card-title text-success">GESTION DE LA PRODUCTION</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div class="card col-lg-2 col-md-3 col-sm-4 ms-auto me-auto">
                        <img src="@/assets/images/ananas-ananas-bresiliens-vendre-au-supermarche_491130-3174.jpg" class="card-img-top mb-3" alt="...">
                        <div class="card-body text-center">
                            <h6 class="card-title text-success">GESTION DU TRANSPORT</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div class="card col-lg-2 col-md-3 col-sm-4 ms-auto me-auto">
                        <img src="@/assets/images/usine.jpg" class="card-img-top mb-3" alt="...">
                        <div class="card-body text-center">
                            <h6 class="card-title text-success">GESTION DE LA TRANSFORMATION</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div class="card col-lg-2 col-md-3 col-sm-4 ms-auto me-auto">
                        <img src="@/assets/images/suivi-positionnement-1.jpg" class="card-img-top mb-3" alt="...">
                        <div class="card-body text-center">
                            <h6 class="card-title text-success">ASSURANCE QUALITE</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div class="card col-lg-2 col-md-3 col-sm-4 ms-auto">
                        <img src="@/assets/images/jus-ananas.png" class="card-img-top mb-3" alt="...">
                        <div class="card-body text-center">
                            <h6 class="card-title text-success">GESTION DE LA LIVRAISON</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <h3 class="fw-bold text-center mb-4">ACTEURS DE TRACABILITE</h3>
            <div class="row mb-5">
                <div class="d-flex justify-center">
                    <div class="col col-lg-2 col-md-3 col-sm-4me-auto">
                        <div class="text-center">
                            <img src="@/assets/images/EyT2B_oXMAASaX7.jpg" class="card-img-top mb-2" alt="...">
                            <h6 class="text-success">PRODUCTEURS</h6>
                            <div class="card-body text-center">
                                <p class="card-text">Some quick example text to build on the card title and .</p>
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-2 col-md-3 col-sm-4 ms-auto me-auto">
                        <div class="text-center">
                            <img src="@/assets/images/EyT2B_oXMAASaX7.jpg" class="card-img-top mb-2" alt="...">
                            <h6 class="text-success">CLUSTERS</h6>
                            <div class="card-body text-center">
                                <p class="card-text">Some quick example text to build on the card.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-2 col-md-3 col-sm-4 ms-auto me-auto">
                        <div class="text-center">
                            <img src="@/assets/images/EyT2B_oXMAASaX7.jpg" class="card-img-top mb-2" alt="...">
                            <h6 class="text-success">TRANSFORMATEURS</h6>
                            <div class="card-body text-center">
                                <p class="card-text">Some quick example text to build on the card title and make up the .</p>
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-2 col-md-3 col-sm-4 ms-auto me-auto">
                        <div class="text-center">
                            <img src="@/assets/images/EyT2B_oXMAASaX7.jpg" class="card-img-top mb-2" alt="...">
                            <h6 class="text-success">EXPORTATEURS </h6>
                            <div class="card-body text-center">
                                <p class="card-text">Some quick example text to build on the card title and make up t.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-2 col-md-3 col-sm-4 ms-auto">
                        <div class="text-center">
                            <img src="@/assets/images/EyT2B_oXMAASaX7.jpg" class="card-img-top mb-2" alt="...">
                            <h6 class="text-success">DISTRIBUTEURS</h6>
                            <div class="card-body text-center">
                                <p class="card-text">Some quick example text to build on the card title and ma.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <h3 class="fw-bold text-center mb-4">APPLICATION MOBILE</h3>
            <div class="bg-success p-2 text-dark bg-opacity-50">
                <div class="d-flex mb-5">
                    <div class="col col-lg-6 col-md-6 col-sm-12 text-justify mt-5 px-5">
                        <h4 class="fw-bold mb-4">Télécharger l'application mobile</h4>
                        <div class="col-3">
                            <img src="@/assets/images/Logo eAGROTRACE light.png" class="card-img-top mb-3" alt="">
                        </div>
                        <p class="text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus ut officiis vitae soluta ad inventore sint, a asperiores, neque itaque iusto dolorem magnam numquam aliquid. Architecto voluptatibus voluptate dolorem?</p>
                        <div class="d-flex">
                            <div class="col-3 mx-2">
                                <img src="@/assets/images/coopera.jpg" class="card-img-top" alt="">
                            </div>
                            <div class="col-3">
                                <img src="@/assets/images/coopera.jpg" class="card-img-top" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="col col-lg-6 col-md-6 col-sm-12">
                        <div class="col-6">
                            <img src="@/assets/images/Gravity-Scene-iPhone-12-Mockup.png" class="card-img-top" alt="Image de bannière" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="container d-flex bg-dark text-white">
                <div class="col col-lg-4 col-md-4 col-sm-4 d-flex text-center">
                    <h1 class="fw-bold fs-5">98.5%</h1>
                    <p>Assurance qualité</p>
                </div>
                <div class="col col-lg-4 col-md-4 col-sm-4 d-flex text-center">
                    <h1 class="fw-bold fs-5">98.5%</h1>
                    Agriculteurs locaux
                </div>
                <div class="col col-lg-4 col-md-4 col-sm-4 d-flex text-center">
                    <h1 class="fw-bold fs-5">98.5%</h1>
                    <p>Clusters locaux</p>
                </div>
            </div>
        </section>
        <!-- **************** MAIN CONTENT END **************** -->
    </div>
</template>

<script src="./Accueil.js"></script>
<!--style src="./Accueil.css"></style-->
