
<template>
    <!-- Header START -->
	<header class="navbar-light navbar-sticky">
		<!-- Logo Nav START -->
		<nav class="navbar navbar-expand-lg Zidex fixed-top transparent" id="custNav">
			<div class="container-fluid m-n3">
				<!-- Logo START -->
				<router-link class="navbar-brand me-0" :to="{ name: 'pages.accueil'}">
					<!-- <img class="light-mode-item navbar-brand-item" src="../../assets/images/dbau_logo.svg" alt="logo"> -->
					<img
								alt="Vue logo"
								class="logo"
								src="@/assets/images/Logo eAGROTRACE withe2 1.svg" 
								width="100"
								height="100"
								/>
					<!-- <img class="dark-mode-item navbar-brand-item" src="../../assets/images/logoX.svg" alt="logo"> -->
				</router-link>
				<!-- <a class="navbar-brand" href="#">Navbar w/ text</a> -->
				<button class="navbar-toggler btn-hov" type="button"  data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
				</button>

				<!-- Main navbar START -->
				<div class="navbar-collapse collapse Zidex" id="navbarText">

					<!-- Nav Search END -->
					<ul class="navbar-nav navbar-nav-scroll mx-auto">
						<li class="nav-item"><RouterLink :to="{ name: 'pages.solution'}" class="nav-link px-2 ml-4 link-secondary"> {{ $t('page.solutions.titre') }}</RouterLink></li>
						<li class="nav-item"><RouterLink :to="{ name: 'pages.clusters'}" class="nav-link px-2 ml-4  link-secondary">{{ $t('page.membres.titre') }}</RouterLink></li>
						<li class="nav-item"><RouterLink :to="{ name: 'pages.support'}" class="nav-link px-2 ml-4  link-secondary"> {{ $t('page.support.titre') }}</RouterLink></li>
						
						<li class="nav-item"><RouterLink :to="{ name: 'auth.register'}" class="nav-link px-2 ml-4  link-secondary">{{ $t('menu.devenez-membres') }}</RouterLink></li>
						<li class="nav-item" id="disp__state0"><RouterLink :to="{ name: 'auth.login'}" class="nav-link px-2 ml-4 link-secondary">{{ $t('Se Connecter') }}</RouterLink></li>
						<span class="navbar-text ml-5 me-5 pl-5 pe-5">
							<!-- Navbar text with an inline element -->
						</span>
						
					</ul>
					
					<span class=" float-end me-4" id="disp__state1" v-if="!currentUser">
						<router-link :to="{ name: 'auth.login'}"><button class="btn btn-md Sub shadow mb-0 ifi pl-4 pe-4"> Login </button></router-link>
					</span>
					<span class=" float-end me-4" id="disp__state1" v-else>
						<router-link :to="{ name: 'dashboard'}"><button class="btn btn-md Sub shadow mb-0 ifi pl-4 pe-4"> Espace cluster </button></router-link>
					</span>
				</div>
				<!-- Main navbar END -->
				

			</div>
		</nav>
		<!-- Logo Nav END -->
	</header>
	<!-- Header END -->    
</template>
<script>
	import UserService from "@/services/user.service";
	
	export default {
		setup() {
			function scrollHeader(){
				const scrollY = window.pageYOffset
				const nav = document.getElementById('custNav')
				// When the scroll is greater than 80 viewport height, add the bg-nav-scroll class to the header tag
				if(nav){
					if(this.scrollY >= 80) nav.classList.add('bg-nav-scroll'); else nav.classList.remove('bg-nav-scroll')
				}
			}
				
			window.addEventListener('scroll', scrollHeader);

			return {
                currentUser: UserService.currentUser(),
			}
		}
	}


	</script>
<style scoped>
	.navbar-nav a.router-link-active,
	.navbar-nav a.router-link-exact-active {
	   background-color: #62B32C!important;
	   border-radius: 5px;
	   box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
	   color: #fff !important;
   }

</style>
