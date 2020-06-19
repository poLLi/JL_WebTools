<template>
    <div>
        <section class="first-section bg-primary">
            <b-container>
                <b-row align-h="center" align-v="center">
                    <b-col lg="12" class="text-center">
                        <h2 class="text-white my-0 py-0">It´s JL2G Party time!</h2>
                        <hr class="divider light mt-4" />
                    </b-col>
                    <b-col lg="8" class="mt-5">
                        <b-card class="shadow text-center p-4">
                            <b-form @submit.stop.prevent>
                                <b-button
                                    type="submit"
                                    variant="primary btn-xl "
                                    @click="createParty()"
                                >Start your awesome Party now!</b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                    <b-col lg="4" class="mt-5">
                        <b-card class="shadow">
                            <b-form @submit.stop.prevent>
                                <b-form-group label="Enter Party ID" label-for="roomID">
                                    <b-form-input
                                        id="roomID"
                                        placeholder="Party ID"
                                        v-model="party.id"
                                    ></b-form-input>
                                </b-form-group>
                                <b-button
                                    type="submit"
                                    variant="primary"
                                    @click="joinParty()"
                                >Join the fkn awesome Party!</b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <section class="page-section bg-dark">
            <b-container>
                <b-row align-h="center">
                    <b-col lg="8" class="text-center text-white">
                        <h2 class="mt-0">What is Just-Look together?</h2>
                        <hr class="divider light mt-4" />blalba
                        <!-- blablab info here -->
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
    transition: 'page',

    head: {
        title: 'JLN | Just-Look 2 Gether Party'
    },

    computed: mapGetters({
        socket: 'jl2g/get'
    }),

    data() {
        return {
            inParty: false,
            party: {
                id: ''
            }
        };
    },

    mounted() {
        // Socket Events
        let vm = this;
        let interval = setInterval(() => {
            if (vm.socket != null) {
                vm.socket.on('partyCreated', vm.partyCreated);

                clearInterval(interval);
            }
        }, 100);
    },

    methods: {
        createParty() {
            this.socket.emit('createParty');
            console.log(this.socket);
        },

        partyCreated(id) {
            this.$router.push('/jl2g/' + id);
        },

        joinParty() {
            this.$router.push('/jl2g/' + this.party.id);
        }
    }
};
</script>