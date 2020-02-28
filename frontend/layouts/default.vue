<template>
    <div>
        <app-navbar />
        <nuxt />
        <app-footer />
    </div>
</template>

<script>
import Navbar from '../components/global/Navbar.vue';
import Footer from '../components/global/Footer.vue';

export default {
    components: {
        appNavbar: Navbar,
        appFooter: Footer
    }
};
</script>

<style lang="scss" scoped></style>
