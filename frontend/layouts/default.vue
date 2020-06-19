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
import { mapMutations, mapGetters } from 'vuex';

export default {
    components: {
        appNavbar: navbar,
        appFooter: footer
    },

    computed: mapGetters({
        socket: 'jl2g/get'
    }),

    watch: {
        $route() {
            if (!this.$route.name.includes('jl2g')) {
                if (this.socket != null) {
                    this.socket.close();
                    this.$store.commit('jl2g/set', null);
                    console.log('socket closed');
                }
            }
        }
    },

    methods: {
        ...mapMutations({
            jl2gSocket: 'jl2g/set'
        })
    }
};
</script>
