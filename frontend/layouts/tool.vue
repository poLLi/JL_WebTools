<template>
    <div>
        <app-navbar />
        <nuxt />
    </div>
</template>

<script>
import navbar from '../components/global/navbar.vue';

export default {
    components: {
        appNavbar: navbar
    }
};
</script>
