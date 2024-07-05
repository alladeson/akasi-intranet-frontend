<template scoped>
  <section
    class="p-0 d-flex align-items-center position-relative overflow-hidden"
  >
    <div class="container-fluid">
      <div class="row">
        <!-- left -->
        <div
          class="col-12 col-lg-6 d-md-flex align-items-center justify-content-center vh-lg-100"
        >
          <div class="p-3 p-lg-5">
            <!-- Title -->
            <div class="text-center">
              <h3>AKASI Consulting Group</h3>
            </div>
            <!-- SVG Image -->
            <div class="text-center screenAdtp">
              <img
                src="@/assets/images/login_img.svg"

                class="mt-5"
                alt="Image Connexion"
              />
             
            </div>
          </div>
        </div>

        <!-- Right -->
        <div class="col-12 col-lg-6 m-auto">
          <div class="row my-5">
            <div class="col-sm-10 col-xl-8 m-auto">
              <div class="card card-body shadow p-4 p-sm-5">
                <!-- Form START -->
                <Form
                  @submit="handleLogin"
                  :validation-schema="schema"
                  class="form"
                >
                  <!-- <span class="mb-0 fs-1">👋</span> -->
                  <h1 class="fs-2 text-center mb-4">Connexion</h1>
                  <!-- <p class="lead mb-4">Nice to see you! Please log in with your account.</p> -->
                  <!-- Email -->
                  <div class="mb-4 mt-3">
                    <div v-if="message" class="alert alert-danger" role="alert">
                      {{ message }}
                    </div>
                  </div>
                  <div class="mt-5">
                    <div class="form__div col-sm-12">
                      <Field
                        name="email"
                        type="email"
                        class="form__input"
                        value="test@tenant.com"
                        autocomplete="email"
                        placeholder=" "
                      />
                      <!-- <ErrorMessage name="username" class="error-feedback" /> -->
                      <label for="" class="form__label">Email</label>
                    </div>
                  </div>
                  <!-- Password -->
                  <div>
                    <div class="form__div col-sm-12">
                      <Field
                        name="password"
                        type="password"
                        class="form__input"
                        value="MotDeP@sse!"
                        placeholder=" "
                        required
                      />
                      <!-- <ErrorMessage name="password" class="error-feedback" /> -->
                      <label for="" class="form__label">Mot de passe</label>
                    </div>
                  </div>
                  <!-- Email modele standart-->
                  <!-- <div class="">
                                        <div class="form__div col-sm-12">
                                            <input type="email" name="email" class="form__input" required placeholder=" ">
                                            <label for="" class="form__label">Email</label>
                                        </div>
                                    </div> -->
                  <!-- Check box -->
                  <div class="mb-4 d-flex justify-content-between mb-4">
                    <div class="form-check">
                      <label class="control-label">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          name="remember_me"
                        />
                        <p>Se souvenir de moi</p>
                      </label>
                    </div>
                  </div>
                  <!-- Button -->
                  <div class="d-grid">
                    <button
                      type="submit"
                      class="btn Sub mb-0"
                      :disabled="loading"
                    >
                      <span
                        v-show="loading"
                        class="spinner-border spinner-border-sm"
                      ></span>
                      <span>SE CONNECTER</span>
                    </button>
                  </div>

                  <!-- Sign up link -->
                  <div class="mt-4 text-center">
                    <div class="text-primary-hover">
                      <!-- <a href="forgot-password.html" class="text-secondary"> -->
                      <router-link :to="{ name: 'auth.forgot-password' }"
                        >{{ $t("password") }} oublié ?</router-link
                      >
                      <!-- </a> -->
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <!-- Row END -->
        </div>
      </div>
      <!-- Row END -->
    </div>
  </section>
</template>

<script src="./Login.js"></script>
<style scoped>
a:hover {
  color: #0b3a85 !important;
  text-decoration: none;
}
a {
  color: #2068d9 !important;
  text-decoration: underline;
}
</style>
