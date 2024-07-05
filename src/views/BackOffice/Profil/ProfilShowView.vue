<template>
  <BackOfficeLayoutClusterSlot nomPage="Informations de Profil">
    <template v-slot:Breadcrumb>
      <BreadcrumbClusterComponent :listeBreadcrumbs="listeBreadcrumbs" />
    </template>
    <template v-slot:MainContent>
      <div class="row">
        <div class="col-12">
          <AlertMessageComponent ref="refAlerteMessage" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <div class="card card-primary card-outline">
            <div class="card-body box-profile">
              <div class="text-center profil-img" v-if="currentUser">
                <div class="img-container profile-user-img">
                  <img
                    v-if="
                      currentUser.profil == null &&
                      (currentUser.gender == null || currentUser.gender == 0)
                    "
                    src="@/assets/images/avatar/14.jpg"
                    alt=""
                    class="img-fluid"
                    style=""
                  />
                  <img
                    v-else-if="
                      currentUser.profil == null && currentUser.gender == 1
                    "
                    src="@/assets/images/avatar/13.jpg"
                    alt=""
                    class="img-fluid"
                    style=""
                  />
                  <img
                    v-else-if="
                      currentUser.profil == null && currentUser.gender == 2
                    "
                    src="@/assets/images/avatar/15.jpg"
                    alt=""
                    class="img-fluid"
                  />

                  <img
                    v-else
                    :src="`${myBaseLink}` + currentUser.profil"
                    alt=""
                    class="img-fluid"
                    style=""
                  />
                </div>
              </div>
              <h3 class="profile-username text-center text-capitalize">
                {{ currentUser.firstname }} {{ currentUser.lastname }}
              </h3>
              <p class="text-muted text-center text-capitalize">
                {{ currentUser.title }}
              </p>
              <ul class="list-group list-group-unbordered mb-3">
                <li class="list-group-item">
                  <b>Sexe</b>
                  <a v-if="currentUser.gender == 1" class="float-right"
                    >Masculin</a
                  >
                  <a v-else-if="currentUser.gender == 2" class="float-right"
                    >Féminin</a
                  >
                  <a v-else class="float-right">InformationNA</a>
                </li>
                <li class="list-group-item">
                  <b>Rapports</b>
                  <a class="float-right"> {{ nombre_rapport }}</a>
                </li>
                <li class="list-group-item">
                  <b>Demandes</b>
                  <a class="float-right">{{ nombre_demande }}</a>
                </li>
                <!-- <li class="list-group-item">
				<b>Friends</b> <a class="float-right">13,287</a>
				</li> -->
              </ul>
              <router-link
                v-if="currentUser.id"
                :to="{
                  name: 'profil.edit',
                  params: { id: currentUser.id },
                }"
                class="btn Sub btn-block"
                ><b>Modifier mes informations</b></router-link
              >
            </div>
          </div>

          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">A propos</h3>
            </div>

            <div class="card-body">
              <strong><i class="fas fa-book mr-1"></i> Autres</strong>
              
              <p class="text-muted" v-if="currentUser.cv == null">
                Information à proposer
              </p>
              <p v-else class="mt-3">
                <a
                  :href="`${myBaseLink}` + currentUser.cv"
                  :download="`${myBaseLink}` + currentUser.cv"
                  target="_blank"
                >
                  <span
                    class="btn btn-sm btn-info me-1 mb-1 mb-md-0"
                    title="Télécharger cv"
                  >
                    Télécharger mon cv
                    <font-awesome-icon icon="download" class="nav-icon pl-2" />
                  </span>
                </a>
              </p>
              <!-- <strong><i class="fas fa-book mr-1"></i> Education</strong>
				<p class="text-muted">
				B.S. in Computer Science from the University of Tennessee at Knoxville
				</p> -->
              <hr />
              <!-- <strong><i class="fas fa-map-marker-alt mr-1"></i> Location</strong>
				<p class="text-muted">Malibu, California</p>
				<hr>
				<strong><i class="fas fa-pencil-alt mr-1"></i> Skills</strong>
				<p class="text-muted">
				<span class="tag tag-danger">UI Design</span>
				<span class="tag tag-success">Coding</span>
				<span class="tag tag-info">Javascript</span>
				<span class="tag tag-warning">PHP</span>
				<span class="tag tag-primary">Node.js</span>
				</p>
				<hr>
				<strong><i class="far fa-file-alt mr-1"></i> Notes</strong>
				<p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p> -->
            </div>
          </div>
        </div>

        <div class="col-md-9">
          <div class="card">
            <div class="card-header p-2">
              <ul class="nav nav-pills justify-content-start">
                <li class="nav-item bg-primary text-white btn">
                  <!-- <a class="nav-link active" href="#activity" data-toggle="tab"
                    >Informations</a
                  > -->
                  Informations
                </li>
                <li class="nav-item" v-if="currentUser.id">
                  <router-link
                    :to="{
                      name: 'profil.password',
                      params: { id: currentUser.id },
                    }"
                    class="nav-link"
                    data-toggle="tab"
                    >Modifier mon mot de passe</router-link
                  >
                </li>
                <!--<li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li> -->
              </ul>
            </div>
            <div class="card-body">
              <div class="tab-content">
                <div class="active tab-pane" id="activity">
                  <div class="row post">
                    <!-- Nom -->
                    <div class="col-md-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Nom</h6>
                      <p class="text-capitalize">{{ currentUser.firstname }}</p>
                      <!-- <p>{{ curUser.name }}</p> -->
                    </div>
                    <!-- Prenoms -->
                    <div class="col-md-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Prénoms</h6>
                      <p class="text-capitalize">{{ currentUser.lastname }}</p>
                      <!-- <p>{{ curUser.prenom }}</p> -->
                    </div>
                    <!-- Email -->
                    <div class="col-md-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Email</h6>
                      <p>{{ currentUser.email }}</p>
                      <!-- <p>{{ curUser.email }}</p> -->
                    </div>

                    <!-- Appartement -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Titre</h6>
                      <p class="text-capitalize">{{ currentUser.title }}</p>
                      <!-- <p>{{ curUser.adresse_apt }}</p> -->
                    </div>

                    <!-- Code civic -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Code civic</h6>
                      <p>
                        {{
                          currentUser.civic_code != null
                            ? currentUser.civic_code
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.adresse_code_civic }}</p> -->
                    </div>

                    <!-- Adresse -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Adresse</h6>
                      <p>
                        {{
                          currentUser.address != null
                            ? currentUser.address
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.adresse_rue }}</p> -->
                    </div>

                    <!-- Code postal -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Code postal</h6>
                      <p>
                        {{
                          currentUser.zip_code != null
                            ? currentUser.zip_code
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.adresse_code_postal }}</p> -->
                    </div>

                    <!-- Tel -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Téléphone</h6>
                      <p>
                        {{
                          currentUser.phone != null
                            ? currentUser.phone
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.tel }}</p> -->
                    </div>

                    <!-- Tel mobile -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Téléphone mobile</h6>
                      <p>
                        {{
                          currentUser.mobile != null
                            ? currentUser.mobile
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.tel_mobile }}</p> -->
                    </div>

                    <!-- Tel mobile -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">
                        Personne d'urgence à contacter 1
                      </h6>
                      <p>
                        {{
                          currentUser.emergency_person1 != null
                            ? currentUser.emergency_person1
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.tel_mobile }}</p> -->
                    </div>
                    <!-- Tel mobile -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Lien avec personne 1</h6>
                      <p>
                        {{
                          currentUser.emergency_person1_relationship != null
                            ? currentUser.emergency_person1_relationship
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.tel_mobile }}</p> -->
                    </div>
                    <!-- Tel mobile -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Téléphone personne 1</h6>
                      <p>
                        {{
                          currentUser.emergency_phone1 != null
                            ? currentUser.emergency_phone1
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.tel_mobile }}</p> -->
                    </div>
                    <!-- Tel mobile -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">
                        Autre personne d'urgence à contacter
                      </h6>
                      <p>
                        {{
                          currentUser.emergency_person2 != null
                            ? currentUser.emergency_person2
                            : "InformationNA"
                        }}
                      </p>
                    </div>
                    <!-- Tel mobile -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Lien avec personne 2</h6>
                      <p>
                        {{
                          currentUser.emergency_person2_relationship != null
                            ? currentUser.emergency_person2_relationship
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.tel_mobile }}</p> -->
                    </div>
                    <!-- Tel mobile -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Téléphone personne 2</h6>
                      <p>
                        {{
                          currentUser.emergency_phone2 != null
                            ? currentUser.emergency_phone2
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.tel_mobile }}</p> -->
                    </div>
                  </div>

                  <!-- <div class="post">
				<div class="user-block">
				<img class= img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
				<span class="username">
				<a href="#">Jonathan Burke Jr.</a>
				<a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
				</span>
				<span class="description">Shared publicly - 7:30 PM today</span>
				</div>
				
				<p>
				Lorem ipsum represents a long-held tradition for designers,
				typographers and the like. Some people hate it and argue for
				its demise, but others ignore the hate as they create awesome
				tools to help create filler text for everyone from bacon lovers
				to Charlie Sheen fans.
				</p>
				<p>
				<a href="#" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</a>
				<a href="#" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i> Like</a>
				<span class="float-right">
				<a href="#" class="link-black text-sm">
				<i class="far fa-comments mr-1"></i> Comments (5)
				</a>
				</span>
				</p>
				<input class="form-control form-control-sm" type="text" placeholder="Type a comment">
				</div> -->
                </div>

                <div class="tab-pane" id="timeline">
                  <div class="timeline timeline-inverse">
                    <div class="time-label">
                      <span class="bg-danger"> 10 Feb. 2014 </span>
                    </div>

                    <div>
                      <i class="fas fa-envelope bg-primary"></i>
                      <div class="timeline-item">
                        <span class="time"
                          ><i class="far fa-clock"></i> 12:05</span
                        >
                        <h3 class="timeline-header">
                          <a href="#">Support Team</a> sent you an email
                        </h3>
                        <div class="timeline-body">
                          Etsy doostang zoodles disqus groupon greplin oooj voxy
                          zoodles, weebly ning heekya handango imeem plugg
                          dopplr jibjab, movity jajah plickers sifteo edmodo
                          ifttt zimbra. Babblely odeo kaboodle quora plaxo
                          ideeli hulu weebly balihoo...
                        </div>
                        <div class="timeline-footer">
                          <a href="#" class="btn btn-primary btn-sm"
                            >Read more</a
                          >
                          <a href="#" class="btn btn-danger btn-sm">Delete</a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <i class="fas fa-user bg-info"></i>
                      <div class="timeline-item">
                        <span class="time"
                          ><i class="far fa-clock"></i> 5 mins ago</span
                        >
                        <h3 class="timeline-header border-0">
                          <a href="#">Sarah Young</a> accepted your friend
                          request
                        </h3>
                      </div>
                    </div>

                    <div>
                      <i class="fas fa-comments bg-warning"></i>
                      <div class="timeline-item">
                        <span class="time"
                          ><i class="far fa-clock"></i> 27 mins ago</span
                        >
                        <h3 class="timeline-header">
                          <a href="#">Jay White</a> commented on your post
                        </h3>
                        <div class="timeline-body">
                          Take me to your leader! Switzerland is small and
                          neutral! We are more like Germany, ambitious and
                          misunderstood!
                        </div>
                        <div class="timeline-footer">
                          <a href="#" class="btn btn-warning btn-flat btn-sm"
                            >View comment</a
                          >
                        </div>
                      </div>
                    </div>

                    <div class="time-label">
                      <span class="bg-success"> 3 Jan. 2014 </span>
                    </div>

                    <div>
                      <i class="fas fa-camera bg-purple"></i>
                      <div class="timeline-item">
                        <span class="time"
                          ><i class="far fa-clock"></i> 2 days ago</span
                        >
                        <h3 class="timeline-header">
                          <a href="#">Mina Lee</a> uploaded new photos
                        </h3>
                        <div class="timeline-body">
                          <img src="https://placehold.it/150x100" alt="..." />
                          <img src="https://placehold.it/150x100" alt="..." />
                          <img src="https://placehold.it/150x100" alt="..." />
                          <img src="https://placehold.it/150x100" alt="..." />
                        </div>
                      </div>
                    </div>

                    <div>
                      <i class="far fa-clock bg-gray"></i>
                    </div>
                  </div>
                </div>

                <div class="tab-pane" id="settings">
                  <form class="form-horizontal">
                    <div class="form-group row">
                      <label for="inputName" class="col-sm-2 col-form-label"
                        >Name</label
                      >
                      <div class="col-sm-10">
                        <input
                          type="email"
                          class="form-control"
                          id="inputName"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputEmail" class="col-sm-2 col-form-label"
                        >Email</label
                      >
                      <div class="col-sm-10">
                        <input
                          type="email"
                          class="form-control"
                          id="inputEmail"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputName2" class="col-sm-2 col-form-label"
                        >Name</label
                      >
                      <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputName2"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label
                        for="inputExperience"
                        class="col-sm-2 col-form-label"
                        >Experience</label
                      >
                      <div class="col-sm-10">
                        <textarea
                          class="form-control"
                          id="inputExperience"
                          placeholder="Experience"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="inputSkills" class="col-sm-2 col-form-label"
                        >Skills</label
                      >
                      <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputSkills"
                          placeholder="Skills"
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="offset-sm-2 col-sm-10">
                        <div class="checkbox">
                          <label>
                            <input type="checkbox" /> I agree to the
                            <a href="#">terms and conditions</a>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="offset-sm-2 col-sm-10">
                        <button type="submit" class="btn btn-danger">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:ControlSidebar> </template>
  </BackOfficeLayoutClusterSlot>
</template>

<style scoped>
.callout-success {
  border-left-color: #2068d9;
}
</style>
<script src="./ProfilShowView.js"></script>
