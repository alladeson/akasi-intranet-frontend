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
              {{ article.titre1 ? article.titre1 : "" }}
            </h1>

            <p class="text-white pb-3 animated zoomIn">
              {{ article.p1 ? article.p1 : "" }}
            </p>
          </div>
          <div class="col-lg-6 text-center text-lg-start">
            <img class="img-fluid" :src="article.img0" alt="" />
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
                {{ article.titre1 }}
              </h6>
            </div>
            <p>
              <img
                class="img-fluid wow zoomIn"
                style="width: 100%; height: 400px; object-fit: cover"
                data-wow-delay="0.5s"
                :src="article.img"
              />
            </p>

            <p class="text-justify">
              {{ article.p2 }}
            </p>

            <h6 class="text-blue">{{ article.p3 }}</h6>
            <p class="text-justify">
              {{ article.p4 }}
            </p>

            <h6 class="text-blue">{{ article.p5 }}</h6>
            <p class="text-justify">
              {{ article.p6 }}
            </p>

            <h6 class="text-blue">{{ article.p7 }}</h6>
            <p class="text-justify">
              {{ article.p8 }}
            </p>
            <h6 class="text-blue">{{ article.p9 }}</h6>
          </div>
          <!-- <div class="col-1">

                  </div> -->

          <div class="col-lg-4 art">
            <div class="article0">
              <h6>--[ TOUS LES ARTICLES ]--</h6>
            </div>

            <!-- <br /><br /><br /> -->
            <!-- <h6 class="text-center" >TOUS LES ARTICLES </h6> -->
            <div v-for="(arti, index) in allArticles" :key="index">
              <div class="row pl-2 pe-2 ml-0 me-0">
                <div class="articles">
                  <h6>{{ arti.titre }}</h6>
                  <div class="row">
                    <div class="col-lg-6">
                      <RouterLink
                        :to="{
                          name: 'pages.portefeuille',
                          params: { id: arti.id },
                        }"
                      >
                        <img :src="arti.img" alt="" style="width: 400px"
                      /></RouterLink>
                    </div>
                    <div class="col-lg-6 d-flex align-items-center">
                      <RouterLink
                        :to="{
                          name: 'pages.portefeuille',
                          params: { id: arti.id },
                        }"
                        class="k"
                      >
                        {{ arti.texte }}</RouterLink
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- <br/> -->
            </div>
            <!-- <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                       <h6>RENFORCEMENT DES CAPACITES </h6>
                            <div class="col-lg-6">
                            
                              <a href="1"> <img src="@/assets/img/ren.jpg" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k">
                            <a href="1"> <p>L'éducation est l'arme la plus puissante 
                              que vous puissiez
                               </p></a>
                          </div>
                        </div>
                       </div><br><br><br><br>
                  
                       
                       <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                         <h6>SYSTEMES D'ENERGIES</h6>
                            <div class="col-lg-6">
                             <a href="2"> <img src="@/assets/img/sys.jpg" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="2"> <p>Akasi installe la meilleure 
                              technologie disponible 
                              sur</p></a>
                          </div>
                        </div>
                          
                       </div><br><br><br><br>
                     
                       <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                       <h6>AKASI TELECOMMUNICATIONS </h6>
                            <div class="col-lg-6">
                             <a href="3"> <img src="@/assets/img/computing.jpeg" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="3"> <p>Si vous rencontrez des 
                              difficultés avec vos 
                              technologies sans</p></a>
                          </div>
                        </div>
                       </div><br><br><br><br>
                      
                       <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                        <h6>   AKASI GROUP SOLUTION BPM</h6>
                            <div class="col-lg-6">
                             <a href="4"> <img src="@/assets/img/bpm3.jpg" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="4"> <p>Une solution logicielle unique 
                              pour gérer l'ensemble 
                              de l'entreprise</p></a>
                          </div>
                        </div>
                        
                       </div><br><br><br><br>
                    
                       <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                        <h6>GENIE CIVIL: TRAVAUX PUBLICS</h6>
                            <div class="col-lg-6">
                             <a href="5"> <img src="@/assets/img/ge3.jpg" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="5"> <p>Le domaine d'application
                               du génie civil 
                               est très vaste</p></a>
                          </div>
                        </div>
                       </div><br><br><br><br>

                       <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                       <h6>DEVELOPPEMENT PERSONNEL </h6>
                            <div class="col-lg-6">
                             <a href="6"> <img src="@/assets/img/dev2.jpg" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="6"><p>Le développement personnel 
                              est un ensemble hétéroclite 
                              de </p></a>
                          </div>
                        </div>
                       </div> <br><br><br><br>
                      <div class="row pl-2 pe-2 ml-0 me-0">
                        <div class="articles m-0 mt-n5 mb-n4">
                       <h6>FORMATION EN LEADERSHIP </h6>
                            <div class="col-lg-6">
                             <a href="7"> <img src="@/assets/img/lea.jpg" alt=""  style="width: 400px ;"></a>
                            </div>
                          <div class="col-lg-6 k ">
                            <a href="7"> <p>Le leadership est la 
                              capacité à entraîner
                               avec soi </p></a>
                          </div>
                        </div>
                       </div> 
                        -->
          </div>
        </div>
      </div>
    </div>

    <!-- About End -->
  </main>
</template>

<script src="./Portefeuille.js"></script>
