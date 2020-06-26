<template>
    <b-navbar toggleable="lg" fixed="top" id="mainNav">
        <b-container>
            <b-navbar-brand to="/">
                <svg
                    id="logo"
                    height="30px"
                    class="img-responsive"
                    viewBox="0 0 986 1096"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xml:space="preserve"
                    xmlns:serif="http://www.serif.com/"
                    style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"
                >
                    <g id="Main">
                        <path
                            d="M270.59,138.236l0,145.156l-111.849,64.576l0,283.103l-125.616,-72.525l0,-283.209l237.465,-137.101Z"
                            style="fill:#808080;"
                        />
                        <path
                            d="M714.776,138.236l0,145.156l111.849,64.576l0,283.103l125.617,-72.525l0,-283.209l-237.466,-137.101Z"
                            style="fill:#808080;"
                        />
                        <path
                            id="JL_right"
                            d="M526.65,247.953l125.241,72.308l0,547.367l174.734,-100.577l0,-63.366l125.617,-72.525l0,208.595l-299.82,173.101l0,0.008l-125.759,72.607l-0.013,0l0,-837.518Z"
                            style="fill:#fff;"
                        />
                        <path
                            id="JL_left"
                            d="M333.476,320.013l125.348,-72.37l-0.107,837.828l-0.013,0l-125.759,-72.607l0,-0.008l-299.82,-173.101l0,-208.595l125.616,72.525l0,63.366l174.735,100.577l0,-547.615Z"
                            style="fill:#fff;"
                        />
                        <path
                            id="JL_top"
                            d="M333.476,247.399l0,-145.47l82.868,-47.844l76.339,-44.075l159.208,91.919l0,145.718l-125.241,-72.308l0,-0.562l-33.967,-19.61l-33.849,19.543l0,0.313l-125.358,72.376Z"
                            style="fill: #FF6600"
                        />
                    </g>
                </svg>
                Just-Look Network
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/" exact>Home</b-nav-item>
                    <b-nav-item to="/jl2g">JL2G</b-nav-item>
                    <b-nav-item to="/logo">Logo Generator</b-nav-item>
                    <b-nav-item to="/url">URL Shortener</b-nav-item>
                    <b-nav-item
                        href="https://github.com/Just-Look-Network/JL_WebTools/"
                        target="_blank"
                        class="nav-icon"
                    >
                        <font-awesome-icon :icon="['fab', 'github']" />
                    </b-nav-item>
                    <b-nav-item
                        href="http://discord.just-look.net/"
                        target="_blank"
                        class="nav-icon"
                    >
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
