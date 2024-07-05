<template>
  <div class="container">
    <div class="row mt-5">
      <div class="row">
        <div class="col-12">
          <AlertMessageComponent ref="refAlerteMessage" />
        </div>
      </div>
      <div
        class="col-md-6 col-sm-12 align-items-center flex-column-reverse text-center items-center"
      >
        <div class="mt-5">
          <h3 class="justify-content-center text-center mt-5">
            AKASI Consulting Group
          </h3>
          <img
            alt="Image Mot de passe oublié"
            class="mt-5 mb-4 rounded mx-auto d-block"
            src="@/assets/images/login_img.svg"
          />
        </div>
      </div>
      <div class="col-md-6 col-sm-12">
        <div class="card shadow-lg">
          <div class="card-body mt-5 mb-5">
            <h3 class="h3 mb-3 fw-normal text-center fw-bold mt-4 mb-5">
              Récupération du mot de passe
            </h3>
            <form class="form-horizontal mx-5" @submit.prevent="bdObjetSave">
              <div class="form-group row mb-4">
                <div class="col-sm-12">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    required
                    autocomplete="email"
                    placeholder="Email"
                    v-model="bdObjet.email"
                    :disabled="disabled"
                  />
                </div>
              </div>
              <div class="form-group row mb-4">
                <div class="col-sm-12 checkbox mb-3">
                  <button class="w-100 btn btn-lg Sub" type="submit">
                    Soumettre
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./ForgotPassword.js"></script>
<!--style src="./ForgotPassword.css"></style-->
