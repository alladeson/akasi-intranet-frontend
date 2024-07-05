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
            <h1 class="text-white mb-4 animated zoomIn">
              AKASI CONSULTING GROUP
            </h1>
            <p class="text-white pb-3 animated zoomIn">
              Nous innovons avec professionnalisme pour l'accompagnement de nos
              partenaires
            </p>
            <RouterLink
              :to="{ name: 'pages.tools' }"
              class="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft"
              >Akasi ERP</RouterLink
            >
          </div>
          <div class="col-lg-6 text-center text-lg-start">
            <img class="img-fluid" src="@/assets/img/hero(2).png" alt="" />
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
        <div class="row g-5">
          <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="section-title position-relative mb-4 pb-2">
              <h6 class="position-relative text-primary ps-4">
                AKASI CONSULTING GROUP
              </h6>
              <!-- <h2 class="mt-2">La meilleure solution informatique avec beaucoup d'expérience</h2> -->
            </div>

            <p class="text-justify">
              <span>AKASI Consulting Group</span>, est un Etablissement de
              Services d'Infrastructures Réseaux et Sécurité de Systèmes
              d'Information agréé par l’Etat du Bénin. Elle est une firme internationale et
              multidisciplinaire dont le siège est basé aux Etats-Unis et qui a
              fait ses preuves à plusieurs centaines de clients dans ses 4
              dommaines d'expertise: les Télécommunications, les Conseils et
              Solutions en Technologie de l'information, les Infrastructures BTP,
              l'Electrification Rurale et les Solutions d'Energie Solaire.
            </p>
            <RouterLink
              :to="{ name: 'pages.about' }"
              class="btn btn-primary animated slideInLeft"
              >En savoir plus</RouterLink
            >
            <div class="row g-3"></div>
          </div>
          <div class="col-lg-6">
            <img
              class="img-fluid wow zoomIn"
              data-wow-delay="0.5s"
              src="@/assets/img/about.jpg"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->

    <!-- Newsletter Start -->
    <div
      class="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <h6 class="position-relative d-inline text-primary ps-4">
        QUELQUES MOTS SUR AKASI CONSULTING GROUP
      </h6>
    </div>
    <div
      class="container-fluid bg-primary newsletter my-5 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div class="container px-lg-5">
        <div class="row align-items-center news-responsive">
          <div class="col-12 col-md-6">
            <h1>AKASI CONSULTING GROUP</h1>
            <p class="text-white text-justify">
              AKASI Consulting Group est un cabinet indépendant de conseil en
              technologie entreprise qui aide les entreprises et les
              gouvernements à intégrer les affaires avec technologies par
              l'innovation, la conception et la mise en œuvre dans les bonnes
              solutions.
            </p>
            <p>
              <routerLink
                :to="{ name: 'pages.about' }"
                class="btn btn-default animated slideInLeft"
                >En savoir plus</routerLink
              >
            </p>
          </div>
          <div class="col-md-6 text-center mb-n5 d-none d-md-block">
            <img
              class="img-fluid mt-5"
              style="height: 250px"
              src="@/assets/img/newsletter.png"
            />
          </div>
        </div>
      </div>
    </div>
    <br /><br />

    <div class="container-xxl py-5">
      <div class="container px-lg-5">
        <div
          class="section-title position-relative text-center mb-5 pb-2 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <h6 class="position-relative d-inline text-primary ps-4">
            LES PORTEFEUILLES DU GROUPE AKASI HOLDING
          </h6>
        </div>
        <div class="row g-5">
          <div
            v-for="(article, index) in articles"
            :key="index"
            class="col-lg-3 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <article>
              <img
                class="img-fluid wow zoomIn"
                data-wow-delay="0.5s"
                :src="article.img" 
              />

              <h5 class="font-weight-bold t">{{ article.titre }}</h5>
              <!-- {{ article.titre }} -->

              <p class="k">{{ article.texte }}</p>
              <!-- {{ article.texte }} -->

              <p>
                <RouterLink
                  :to="{
                    name: 'pages.portefeuille',
                    params: { id: article.id },
                  }"
                  class="btn btn-primary animated slideInLeft"
                  >Lire plus</RouterLink
                >
              </p>
            </article>
            
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script src="./Accueil.js"></script>
