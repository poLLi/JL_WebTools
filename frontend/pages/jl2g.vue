<template>
    <nuxt-child />
</template>

<script>
import io from 'socket.io-client';
import { mapMutations, mapGetters } from 'vuex';

export default {
    computed: mapGetters({
        socket: 'jl2g/getSocket'
    }),

    mounted() {
        if (this.socket == null) {
            let socket = io(process.env.WS_URL);
            this.$store.commit('jl2g/setSocket', socket);
            console.log('socket mounted');
        }
    }
};
</script>