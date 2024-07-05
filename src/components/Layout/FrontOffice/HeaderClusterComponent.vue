
<template>
       <!-- Header START -->
       <header class="navbar-light navbar-sticky">
        <!-- Logo Nav START -->
        <nav class="navbar navbar-expand-lg Zidex fixed-top transparent" id="custNav">
            <div class="container-fluid">
                <!-- Logo START -->
                <router-link class="navbar-brand me-0 " :to="{ name: 'pages.accueil'}">
                    <!-- <img class="light-mode-item navbar-brand-item" src="../../assets/images/dbau_logo.svg" alt="logo"> -->
                    <img
                                alt="Vue logo"
                                class="logo"
                                src="@/assets/images/clustlogo.svg" 
                                width="150"
                                height="150"
                                />
                    <!-- <img class="dark-mode-item navbar-brand-item" src="../../assets/images/logoX.svg" alt="logo"> -->
                </router-link>
                <!-- <a class="navbar-brand" href="#">Navbar w/ text</a> -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-collapse collapse Zidex" id="navbarText">

                    <!-- Nav Search END -->
                    <ul class="navbar-nav navbar-nav-scroll col-12 col-md-auto d-flex ml-5 mb-md-0">
                    <!-- <ul class="nav col-12 col-md-auto justify-content-center mb-md-0"> -->
                        <li><RouterLink :to="{ name: 'pages.cluster'}" class="nav-link px-2 ml-4 link-secondary"> {{ $t('page.accueil.titre') }}</RouterLink></li>
                        <li><RouterLink :to="{ name: 'pages.consulter'}" class="nav-link px-2 ml-4 link-secondary"> {{ $t('page.consultations.titre') }}</RouterLink></li>
                        <li class="nav-item" id="disp__state2"><RouterLink :to="{ name: 'auth.login'}" class="nav-link px-2 ml-4 link-secondary">{{ $t('Se Connecter') }}</RouterLink></li>
                    </ul>
                </div>
                <span class="navbarText me-4 float-end" id="disp__state3">
                    <router-link :to="{ name: 'auth.login'}"><button class="btn btn-md Sub shadow mb-0 ifi pl-4 pe-4">{{ $t('page.connexion.titre') }}</button></router-link>
                </span>
                
                
        
		</div>
	</nav>
	<!-- Logo Nav END -->
</header>
</template>
