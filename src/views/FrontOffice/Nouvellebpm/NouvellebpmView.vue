<template>
  <!-- **************** MAIN CONTENT START **************** -->
  <main>
    <!-- =======================
        Page intro START -->
    <!-- <section class="bg-White py-0 py-sm-5 section-mt"> -->
    <!-- <div class="container"> -->
    <div class="py-5 bg-primary hero-header mb-5">
      <div class="container my-5 py-5 px-lg-5">
        <div class="row g-5 py-5">
          <div class="col-lg-6 text-center text-lg-start">
            <h1 class="text-white mb-4 animated zoomIn">{{ nouve.titre }}</h1>
            <p class="text-white pb-3 animated zoomIn">
              {{ nouve.p1 }}
            </p>
          </div>
          <div class="col-lg-6 text-center text-lg-start">
            <img class="img-fluid" :src="nouve.img0" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <!-- </section> -->
    <!-- =======================
        Page intro END -->

    <!-- Full Screen Search Start -->
    <div class="modal fade" id="searchModal" tabindex="-1">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content" style="background: rgba(29, 29, 39, 0.7)">
          <div class="modal-header border-0">
            <button
              type="button"
              class="btn bg-white btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body d-flex align-items-center justify-content-center"
          >
            <div class="input-group" style="max-width: 600px">
              <input
                type="text"
                class="form-control bg-transparent border-light p-3"
                placeholder="Type search keyword"
              />
              <button class="btn btn-light px-4">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Full Screen Search End -->

    <!-- About Start -->
    <div class="container-xxl py-5">
      <div class="container px-lg-5">
        <div class="row">
          <div class="col-8" style="padding-right: 30px">
            <div
              class="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <h6 class="position-relative d-inline text-primary ps-4">
                {{ nouve.titre }}
              </h6>
            </div>
            <p>
              <img
                class="img-fluid wow zoomIn"
                data-wow-delay="0.5s"
                :src="nouve.img"
                style="width: 100%; height: 400px; object-fit: cover"
              />
            </p>

            <p class="text-justify">
              {{ nouve.p2 }}
            </p>

            <h6 class="text-blue">{{ nouve.p3 }}</h6>
            <p class="text-justify">
              {{ nouve.p4 }}
            </p>

            <h6 class="text-blue">{{ nouve.p5 }}</h6>
            <p class="text-justify">
              {{ nouve.p6 }}
            </p>

            <h6 class="text-blue">{{ nouve.p7 }}</h6>
            <p class="text-justify">
              {{ nouve.p8 }}
            </p>
            <h6 class="text-blue">{{ nouve.p9 }}</h6>
          </div>
          <div class="col-lg-4 art">
            <!-- <div class=" pl-2 pe-2 ml-0 me-0 mb-n4"> -->
            <div class="article0">
              <h6>----[ LES DERNIERES NOUVELLES ]----</h6>
            </div>
            <!-- </div> -->
            <div v-for="(news, index) in allNews" :key="index">
              <div class="row pl-2 pe-2 ml-0 me-0">
                <div class="articles">
                  <h6>{{ news.titre }}</h6>
                  <div class="row">
                    <div class="col-lg-6 ">
                    <router-link
                      :to="{ name: 'pages.nouvelles', params: { id: news.id } }"
                    >
                      <img :src="news.img" alt="" style="width: 400px"
                    /></router-link>
                  </div>
                  <div class="col-lg-6 d-flex align-items-center">
                    <router-link
                      :to="{ name: 'pages.nouvelles', params: { id: news.id } }"
                      class="k"

                    >
                      {{ news.texte }}</router-link
                    >
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                       <h6>Sortez sans vous ruiner avec BUSINESS PROCESS </h6>
                            <div class="col-lg-6">
                            
                              <a href="1"> <img src="@/assets/img/ness1.jpg" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k">
                            <a href="1"> <p>Choisissez un BPMS abordable 
                              qui offre les fonctionnalités 
                              dont</p></a>
                          </div>
                        </div>
                       </div>
                    
                       
                       <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                         <h6>Commencez à l'utiliser rapidement et facilement</h6>
                            <div class="col-lg-6">
                             <a href="2"> <img src="@/assets/img/imag1.png" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="2"> <p>Accélérez la mise sur
                               le marché avec notre
                                plateforme</p></a>
                          </div>
                        </div>
                          
                       </div>
                     
                       <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                       <h6>Consultez la plate-forme d'intégration indépendante </h6>
                            <div class="col-lg-6">
                             <a href="3"> <img src="@/assets/img/pla.jpg" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="3"> <p>Faites confiance à un 
                              partenaire technologique qui 
                              n'est pas </p></a>
                          </div>
                        </div>
                       </div>
                      
                       <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                        <h6>    Obtenez la plate-forme d'intégration la plus transparente</h6>
                            <div class="col-lg-6">
                             <a href="4"> <img src="@/assets/img/ou1.png" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="4"> <p>Avec AKASI ExDATA,
                               assurez-vous que les 
                               intégrations sont</p></a>
                          </div>
                        </div>
                        
                       </div>
                    
                       <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                        <h6>Obtenez la solution complète ici maintenant</h6>
                            <div class="col-lg-6">
                             <a href="5"> <img src="@/assets/img/denier.png" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="5"> <p>Fournissez des connexions 
                              complètes entre vous 
                              et vos clients</p></a>
                          </div>
                        </div>
                       </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->
  </main>
</template>

<script src="./Nouvellebpm.js"></script>
