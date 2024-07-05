<template>
  <BackOfficeLayoutClusterSlot nomPage="Editer mon profil">
    <template v-slot:Breadcrumb>
      <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs" />
    </template>
    <template v-slot:MainContent>
      <div class="row">
        <div class="col-12">
          <AlertMessageComponent ref="refAlerteMessage" />
        </div>
      </div>
      <!-- {{ bdObjet }} -->
      <div class="card">
        <div class="card-header border-transparent">
          <h3 class="card-title"></h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 col-md-12">
              <form
                @submit.prevent="bdObjetSave"
                class="row col-lg-12 col-md-12"
                id="form-premier"
              >
                <div class="col col-lg-6 col-md-6">
                  <fieldset>
                    <legend>Informations de base</legend>
                    <div class="form-group">
                      <AgBaseInputTextComponent
                        nom="lastname"
                        label="Nom"
                        :required="true"
                        v-model="bdObjet.lastname"
                        minlength="3"
                        maxlength="125"
                      />
                    </div>
                    <div class="form-group">
                      <AgBaseInputTextComponent
                        nom="firstname"
                        label="Prénom"
                        :required="true"
                        v-model="bdObjet.firstname"
                        minlength="3"
                        maxlength="125"
                      />
                    </div>
                    <div class="form-group">
                      <label for="gender"
                        >Genre <span class="text-danger">*</span>
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        class="form-control"
                        v-model="bdObjet.gender"
                        required
                      >
                        <option value="1">Masculin</option>
                        <option value="2">Féminin</option>
                        <option value="0">Autres</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <AgBaseInputNumberComponent
                        nom="mobile"
                        label="Téléphone mobile"
                        v-model="bdObjet.mobile"
                        minlength="7"
                        maxlength="15"
                      />
                    </div>
                    <div class="form-group">
                      <AgBaseInputNumberComponent
                        nom="phone"
                        label="Téléphone"
                        :required="true"
                        v-model="bdObjet.phone"
                        minlength="7"
                        maxlength="15"
                      />
                    </div>
                    <div class="form-group">
                      <label for="profil">
                        Modifier votre photo de profil
                      </label>
                      <input
                        id="profil"
                        class="form-control"
                        type="file"
                        @change="onProfilSelected"
                        accept=".jpg, .jpeg, .png"
                      />
                    </div>
                    <div class="form-group">
                      <label for="cv"> Ajouter votre cv </label>
                      <input
                        id="cv"
                        class="form-control"
                        type="file"
                        @change="onCvSelected"
                        accept=".pdf"
                      />
                    </div>
                    <div class="form-group">
                      <AgBaseInputTextComponent
                        nom="address"
                        label="Adresse"
                        v-model="bdObjet.address"
                        minlength="3"
                        maxlength="125"
                      />
                    </div>
                  </fieldset>
                </div>
                <div class="col col-lg-6 col-md-6">
                  <fieldset>
                    <legend>Autres informations</legend>
                    <div class="form-group">
                      <div class="form-group">
                        <AgBaseInputTextComponent
                          nom="zip_code"
                          label="Code Postal"
                          v-model="bdObjet.zip_code"
                          minlength="3"
                          maxlength="10"
                        />
                      </div>
                      <AgBaseInputTextComponent
                        nom="civic_code"
                        label=" Code Civic"
                        v-model="bdObjet.civic_code"
                      />
                    </div>
                    <div class="form-group">
                      <AgBaseInputTextComponent
                        nom="emergency_person1"
                        label="Personne d'urgence à contacter 1"
                        v-model="bdObjet.emergency_person1"
                        minlength="3"
                      />
                    </div>
                    <div class="form-group">
                      <AgBaseInputNumberComponent
                        nom="emergency_phone1"
                        label="Téléphone personne 1"
                        v-model="bdObjet.emergency_phone1"
                        minlength="7"
                        maxlength="15"
                      />
                    </div>

                    <div class="form-group">
                      <AgBaseInputTextComponent
                        nom="emergency_person1_relationship"
                        label="Lien avec personne 1"
                        v-model="bdObjet.emergency_person1_relationship"
                      />
                    </div>
                    <div class="form-group">
                      <AgBaseInputTextComponent
                        nom="emergency_person2"
                        label="Personne d'urgence à contacter 2"
                        v-model="bdObjet.emergency_person2"
                        minlength="3"
                      />
                    </div>
                    <div class="form-group">
                      <AgBaseInputNumberComponent
                        nom="emergency_phone2"
                        label="Téléphone personne 2"
                        v-model="bdObjet.emergency_phone2"
                        minlength="7"
                        maxlength="15"
                      />
                    </div>

                    <div class="form-group">
                      <AgBaseInputTextComponent
                        nom="emergency_person2_relationship"
                        label="Lien avec personne 2"
                        v-model="bdObjet.emergency_person2_relationship"
                      />
                    </div>
                  </fieldset>
                </div>
                <div class="form-group">
                  <AgBaseButtonSubmitComponent
                    buttonText="Enregistrer"
                    class="float-start"
                    :loading="loading"
                  />
                  <router-link
                    :to="{
                      name: 'profil.show',
                    }"
                  >
                    <div class="btn btn-danger ml-2 mt-3 p-2">Annuler</div>
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficeLayoutClusterSlot>
</template>

<script src="./ProfilEditView.js"></script>
