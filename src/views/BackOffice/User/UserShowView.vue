<template>
  <BackOfficeLayoutClusterSlot nomPage="Détails utilisateur">
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
              <div class="text-center profil-img" v-if="bdObjet">
                <div class="img-container profile-user-img">
                  <img
                    v-if="
                      bdObjet.profil == null &&
                      (bdObjet.gender == null || bdObjet.gender == 0)
                    "
                    src="@/assets/images/avatar/14.jpg"
                    alt=""
                    class="img-fluid"
                    style=""
                  />
                  <img
                    v-else-if="bdObjet.profil == null && bdObjet.gender == 1"
                    src="@/assets/images/avatar/13.jpg"
                    alt=""
                    class="img-fluid"
                    style=""
                  />
                  <img
                    v-else-if="bdObjet.profil == null && bdObjet.gender == 2"
                    src="@/assets/images/avatar/15.jpg"
                    alt=""
                    class="img-fluid"
                  />

                  <img
                    v-else
                    :src="`${myBaseLink}` + bdObjet.profil"
                    alt=""
                    class="img-fluid"
                    style=""
                  />
                </div>
              </div>
              <h3 class="profile-username text-center text-capitalize">
                {{ bdObjet.firstname }} {{ bdObjet.lastname }}
              </h3>
              <p class="text-muted text-center text-capitalize">
                {{ bdObjet.title }}
              </p>
              <ul class="list-group list-group-unbordered mb-3">
                <li class="list-group-item">
                  <b>Sexe</b>
                  <a v-if="bdObjet.gender == 1" class="float-right">Masculin</a>
                  <a v-else-if="bdObjet.gender == 2" class="float-right"
                    >Féminin</a
                  >
                  <a v-else class="float-right">InformationNA</a>
                </li>
                <li class="list-group-item" v-if="bdObjet.title != 'DG'">
                  <b>Rapports</b>
                  <a class="float-right"> {{ nombre_rapport }}</a>
                </li>
                <li class="list-group-item" v-if="bdObjet.title != 'DG'">
                  <b>Demandes</b>
                  <a class="float-right">{{ nombre_demande }}</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="card card-primary">
            <div class="card-header">
              <h3 class="card-title">A propos</h3>
            </div>

            <div class="card-body">
              <strong><i class="fas fa-book mr-1"></i> Autres</strong>
              <p class="mt-3" v-if="bdObjet.cv != null">
                <a
                  :href="`${myBaseLink}` + bdObjet.cv"
                  :download="`${myBaseLink}` + bdObjet.cv"
                  target="_blank"
                >
                  <span
                    class="btn btn-sm btn-info me-1 mb-1 mb-md-0"
                    title="Télécharger cv"
                  >
                    Télécharger le cv
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
              <ul class="nav nav-pills">
                <li class="nav-item bg-primary text-white btn">
                  <!-- <a class="nav-link active" href="#activity" data-toggle="tab"
                    >Informations</a
                  > -->
                  Informations
                </li>
                <!-- <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab">Timeline</a></li>
				<li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li> -->
              </ul>
            </div>
            <div class="card-body">
              <div class="tab-content">
                <div class="active tab-pane" id="activity">
                  <div class="row post">
                    <!-- Nom -->
                    <div class="col-md-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Nom</h6>
                      <p class="text-capitalize">{{ bdObjet.firstname }}</p>
                      <!-- <p>{{ curUser.name }}</p> -->
                    </div>
                    <!-- Prenoms -->
                    <div class="col-md-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Prénoms</h6>
                      <p class="text-capitalize">{{ bdObjet.lastname }}</p>
                      <!-- <p>{{ curUser.prenom }}</p> -->
                    </div>
                    <!-- Email -->
                    <div class="col-md-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Email</h6>
                      <p>{{ bdObjet.email }}</p>
                      <!-- <p>{{ curUser.email }}</p> -->
                    </div>

                    <!-- Appartement -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Titre</h6>
                      <p class="text-capitalize">{{ bdObjet.title }}</p>
                      <!-- <p>{{ curUser.adresse_apt }}</p> -->
                    </div>

                    <!-- Code civic -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Code civic</h6>
                      <p>
                        {{
                          bdObjet.civic_code != null
                            ? bdObjet.civic_code
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
                          bdObjet.address != null
                            ? bdObjet.address
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
                          bdObjet.zip_code != null
                            ? bdObjet.zip_code
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
                          bdObjet.phone != null
                            ? bdObjet.phone
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
                          bdObjet.mobile != null
                            ? bdObjet.mobile
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
                          bdObjet.emergency_person1 != null
                            ? bdObjet.emergency_person1
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
                          bdObjet.emergency_person1_relationship != null
                            ? bdObjet.emergency_person1_relationship
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
                          bdObjet.emergency_phone1 != null
                            ? bdObjet.emergency_phone1
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
                          bdObjet.emergency_person2 != null
                            ? bdObjet.emergency_person2
                            : "InformationNA"
                        }}
                      </p>
                    </div>
                    <!-- Tel mobile -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Lien avec personne 2</h6>
                      <p>
                        {{
                          bdObjet.emergency_person2_relationship != null
                            ? bdObjet.emergency_person2_relationship
                            : "InformationNA"
                        }}
                      </p>
                    </div>
                    <!-- Tel mobile -->
                    <div class="col-sm-4 p-1 d-grid">
                      <h6 class="form-label fw-bold">Téléphone personne 2</h6>
                      <p>
                        {{
                          bdObjet.emergency_phone2 != null
                            ? bdObjet.emergency_phone2
                            : "InformationNA"
                        }}
                      </p>
                      <!-- <p>{{ curUser.tel_mobile }}</p> -->
                    </div>
                  </div>
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
<script>
import UserDataService from "@/services/BackOffice/User/UserDataService";
import BackOfficeLayoutClusterSlot from "@/components/Slot/BackOfficeLayoutClusterSlot.vue";
import BreadcrumbClusterComponent from "@/components/Layout/BackOffice/BreadcrumbClusterComponent.vue";
import AlertMessageComponent from "@/components/Alert/AlertMessageComponent.vue";
import DemandeDataService from "@/services/BackOffice/Demande/DemandeDataService";
import RapportDataService from "@/services/BackOffice/Rapport/RapportDataService";
import { useRoute } from "vue-router";

export default {
  name: "ProfilShowView",
  components: {
    BackOfficeLayoutClusterSlot,
    BreadcrumbClusterComponent,
    AlertMessageComponent,
  },
  data() {
    return {
      myBaseLink: import.meta.env.VITE_FILE_BASE_URL,
      isLoadingTable: true,
      loading: false,
      bdObjet: {},
      nombre_demande: 0,
      nombre_rapport: 0,
      isLoadingSpinner: true,
      listeBreadcrumbs: [
        { texte: "Tableau de bord", nomRoute: "dashboard", parametres: {} },
        { texte: "Utilisateurs", nomRoute: "user.list", parametres: {} },
        { texte: "Profil", nomRoute: "", parametres: {} },
      ],
    };
  },
  methods: {
    bdObjetGet(id) {
      UserDataService.show(id)
        .then((response) => {
          this.bdObjet = response.data.user;
          this.id = id;
          this.obtenirListe();
        })
        .catch((e) => {
          if (e.response.data.message == "Unauthenticated.") {
              this.$store.dispatch("auth/logout");
              this.$router.push({ name: "auth.login" });
            }
        });
    },
    obtenirListe() {
      RapportDataService.getAll()
        .then((response) => {
          this.isLoadingTable = false;
          this.nombre_rapport = response.data.reports.filter(
            (rep) => rep.user.id == this.bdObjet.id
          ).length;
        })
        .catch((e) => {});

      DemandeDataService.getAll()
        .then((response) => {
          this.isLoadingTable = false;
          this.nombre_demande = response.data.requests.filter(
            (req) => req.user.id == this.bdObjet.id
          ).length;;
        })
        .catch((e) => {});
    },
  },
  computed: {},
  mounted() {
    const route = useRoute();
    this.bdObjetGet(route.params.id);
  },
};
</script>
