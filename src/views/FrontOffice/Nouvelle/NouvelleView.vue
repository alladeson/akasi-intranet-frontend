<template>
  <div class="">
    <!-- **************** MAIN CONTENT START **************** -->
    <div class="py-5 bg-primary hero-header mb-5">
      <div class="container my-5 py-5 px-lg-5">
        <div class="row g-5 py-5">
          <!-- <div class="col-12 text-center">
                <h1 class="text-white animated zoomIn">Dernières nouvelles</h1>
                <hr class="bg-white mx-auto mt-0" style="width: 90px" />
              </div> -->
          <div class="col-lg-6 text-center text-lg-start">
            <h1 class="text-white mb-4 animated zoomIn">Dernières nouvelles</h1>
            <p class="text-white pb-3 animated zoomIn">
              Nous vous proposons de lire nos derniers articles très
              intéressants.
            </p>
            <!-- <RouterLink
              :to="{ name: 'pages.tools' }"
              class="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft"
              >Akasi ERP</RouterLink
            > -->
          </div>
          <div class="col-lg-6 text-center text-lg-start">
            <img class="img-fluid" src="@/assets/img/nouvel.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- <section class="bg-White py-0 py-sm-5 section-mt">
          <div class="container-fluid py-5 bg-primary hero-header mb-5">
             <div class="container my-5 py-5 px-lg-5">
               <div class="row g-5 py-12">
                  <div class="col-12 text-center">
                  <h2 class="text-white animated zoomIn">Dernières nouvelles</h2>
                  <hr class="bg-white mx-auto mt-0" style="width: 90px" />
                  </div>
              </div>
              </div>
          </div>
      </section> -->
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
    <section>
      <!-- About Start -->
      <div class="container-xxl py-12">
        <div class="container py-12">
          <div
            class="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <h6 class="position-relative d-inline text-primary ps-4">
              LES RECENTES NOUVELLES
            </h6>
          </div>
          <!-- <div class="row g-5"> -->
          <div class="col-lg- wow fadeInUp" data-wow-delay="0.1s">
            <!-- <div class="section-title position-relative mb-4 pb-2">
                              <h6 class="position-relative inline text-secondary ps-4">Les récentes nouvelles</h6> -->
            <!-- <h2 class="mt-2">La meilleure solution informatique avec beaucoup d'expérience</h2> -->
            <!-- </div> -->

            <div class="row  py-12">
              <div
                v-for="(nouve, index) in nouvelles"
                :key="index"
                class="col-md-3 col-sm-6"
              >
                <article>
                  <img
                    class="img-fluid wow zoomIn"
                    data-wow-delay="0.5s"
                    :src="nouve.img"
                  />
                  <h5 class="font-weight-bold t">{{ nouve.titre }}</h5>
                  <p class="k">{{ nouve.texte }}</p>

                  <RouterLink
                    :to="{ name: 'pages.nouvelles', params: { id: nouve.id } }"
                    class="text-white btn btn-primary animated slideInLeft"
                    >Lire plus</RouterLink
                  >
                </article>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <!-- About End -->
    </section>
  </div>
</template>

<script src="./Nouvelle.js"></script>
<!--style src="./Solution.css"></style-->
