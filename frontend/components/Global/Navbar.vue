<template>
    <b-navbar toggleable="lg" fixed="top" id="mainNav">
        <b-container>
            <b-navbar-brand href="#">Just-Look Network</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#" active>Home</b-nav-item>
                    <b-nav-item href="#">Logo Generator</b-nav-item>
                    <b-nav-item href="#">URL Shortener</b-nav-item>
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
