<template>
    <b-navbar toggleable="lg" fixed="top" id="mainNav">
        <b-container>
            <b-navbar-brand href="#">Just-Look Network</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/" exact>Home</b-nav-item>
                    <b-nav-item to="/logo">Logo Generator</b-nav-item>
                    <b-nav-item to="/url">URL Shortener</b-nav-item>
                    <b-nav-item
                        href="https://github.com/Just-Look-Network/JL_WebTools/"
                        target="_blank"
                        class="nav-icon"
                    >
                        <font-awesome-icon :icon="['fab', 'github']" />
                    </b-nav-item>
                    <b-nav-item href="http://discord.just-look.net/" target="_blank" class="nav-icon">
                        <font-awesome-icon :icon="['fab', 'discord']" />
                    </b-nav-item>
                    <b-nav-item
                        href="https://twitter.com/justlooknetwork"
                        target="_blank"
                        class="nav-icon nav-icon-last"
                    >
                        <font-awesome-icon :icon="['fab', 'twitter']" />
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
export default {
    mounted() {
        window.addEventListener('scroll', navbarCollapse);

        var navbar = document.getElementById('mainNav');
        var offset = 100;

        function navbarCollapse() {
            if (window.pageYOffset >= offset) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }

        navbarCollapse();
    }
};
</script>

<style lang="scss" scoped></style>
