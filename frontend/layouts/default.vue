<template>
    <div>
        <app-navbar />
        <nuxt />
        <app-footer />
    </div>
</template>

<script>
import navbar from '../components/global/navbar.vue';
import footer from '../components/global/footer.vue';

export default {
    components: {
        appNavbar: navbar,
        appFooter: footer
    }
};
</script>
