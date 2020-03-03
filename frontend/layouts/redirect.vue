<template>
    <div>
        <nuxt />
        <app-footer />
    </div>
</template>

<script>
import footer from '../components/global/footer.vue';

export default {
    components: {
        appFooter: footer
    }
};
</script>
