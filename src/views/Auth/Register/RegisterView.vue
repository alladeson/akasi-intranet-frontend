
<template scoped>
    <div class="container">
    <div class="row mt-5 mb-5">
      
        <div class="col-md-6 col-sm-12">
            <div class="card shadow-lg">
                <div class="card-body">
                    <h3 class="h3 mb-3 fw-normal text-center fw-bold mt-4 mb-5">Inscription Membre</h3>
                    <form class="form-horizontal mx-5">
                        <div class="form__div col-sm-12">
                            <Field id="name" type="text" class="form__input" value="" required autocomplete="Nom" placeholder=" "/>
                            <!-- <ErrorMessage name="username" class="error-feedback" /> -->
                            <label for="" class="form__label">Nom</label>
                        </div>
                        <div class="form__div col-sm-12">
                            <Field id="surname" type="text" class="form__input" value="" required autocomplete="surname" placeholder=" "/>
                            <!-- <ErrorMessage name="username" class="error-feedback" /> -->
                            <label for="" class="form__label">Prénoms</label>
                        </div>
                        <div class="form__div col-sm-12">
                            <Field id="email" type="text" class="form__input" value="" required autocomplete="email" placeholder=" "/>
                            <!-- <ErrorMessage name="username" class="error-feedback" /> -->
                            <label for="" class="form__label">Email</label>
                        </div>
                        <div class="form__div col-sm-12">
                            <Field id="cluster" type="text" class="form__input" value="" required autocomplete="cluster" placeholder=" "/>
                            <!-- <ErrorMessage name="username" class="error-feedback" /> -->
                            <label for="" class="form__label">cluster</label>
                        </div>
                        <!-- <div class="form__div"> -->
                            <div class="form__div col-sm-12 p-0">
                                <select class="form-select form__select" aria-label="Default select example">
                                    <option selected>Catégorie</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        <!-- </div> -->
                        <!-- <div class="form-group row"> -->
                            <div class="form__div col-sm-12 p-0">
                                <select class="form-select form__select" aria-label="Default select example">
                                    <option selected>Rôle dans l'entreprise</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        <!-- </div> -->
                        <!-- <div class="form-group row"> -->
                            <div class="form__div col-sm-12 p-0">
                                <select class="form-select form__select" aria-label="Default select example">
                                    <option selected>Département</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        <!-- </div> -->
                        <div class="form-group row">
                            <div class="col-sm-12 checkbox mb-3">
                                <button class="w-100 btn btn-lg btn-success" type="submit">Suivant</button>
                            </div>
                        </div>
                        <div class="mb-2 text-center">
                            <span>Déjà membre ? <RouterLink :to="{ name: 'auth.login'}">Se connecter</RouterLink></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>

</template>

<script src="./Register.js"></script>
<!--style src="./Login.css"></style-->
<style   scoped>
    
    a:hover {
        color: #38780e!important;
        text-decoration: none;
    }
    a {
        color: #2068D9!important;
        text-decoration: underline;
    }
    </style>
