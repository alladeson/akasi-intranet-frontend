
<template>
    <div class="container">
    <div class="row mt-5">
        <div class="col-md-6 col-sm-12 align-items-center flex-column-reverse text-center items-center">
            <div class="mt-5">
                <h3 class="justify-content-center text-center mt-5">
                    eAgroTrace, la solution pour la traçabilité et le suivi de vos produits
                </h3>
                <img
                    alt="Image Mot de passe oublié"
                    class="mt-5 mb-4 rounded mx-auto d-block"
                    src="@/assets/images/Bouteilles_0000_Calque-2-178x300.png"
                    />
            </div>
        </div>
        <div class="col-md-6 col-sm-12">
            <div class="card shadow-lg">
                <div class="card-body mt-3 mb-3">
                    <h3 class="h3 mb-3 fw-normal text-center fw-bold mt-4 mb-5">Consultations</h3>
                    <form class="form-horizontal mx-5">
                        <div class="form-group row mb-4">
                            <div class="col-sm-12">
                                <input id="email" type="email" class="form-control" name="email" required autocomplete="email" placeholder="Email" />
                            </div>
                        </div>
                        <div class="form-group row mb-4">
                            <div class="col-sm-12 checkbox mb-3">
                                <button class="w-100 btn btn-lg btn-success" type="submit">Se connecter</button>
                            </div>
                        </div>
                        <div class="d-flex col-lg-12 col-md-12 col-sm-12 mt-4 p-5 text-center">
                            <div class="col-4">
                                <img src="@/assets/images/codebar.png" class="card-img-top img-fluid me-5" alt="">
                            </div>
                            <div class="col-4">
                                <img src="@/assets/images/Pjy.jpg" class="card-img-top ms-5" alt="">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>

</template>

<script src="./Consulter.js"></script>
<!--style src="./Consulter.css"></style-->
