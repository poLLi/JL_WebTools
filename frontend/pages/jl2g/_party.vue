<template>
    <div>
        <section class="party-section bg-dark">
            <b-container fluid>
                <b-row>
                    <b-col lg="9" class="mt-1">
                        <b-card class="shadow">
                            <div class="videoBox">VIDEO</div>
                        </b-card>
                    </b-col>

                    <b-col lg="3" class="mt-1">
                        <b-card class="shadow">
                            <span>User Connected: {{ party.user.length }}</span>
                            <hr />
                            <div class="chatBox">
                                <ul ref="messages" class="messages">
                                    <li
                                        v-for="(message, index) in messages"
                                        :key="index"
                                        class="message"
                                    >{{ message}}</li>
                                </ul>

                                <input
                                    v-model="message"
                                    class="inputMessage"
                                    type="text"
                                    placeholder="Type here..."
                                    @keyup.enter="sendMessage"
                                />
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <section class="page-section bg-primary">
            <b-container>
                <b-row align-h="center text-center text-white">
                    <b-col lg="8">
                        <h2 class="mt-0">Socket.IO Test</h2>
                        <hr class="divider light mt-4" />asdasd
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    transition: 'page',

    head: {
        title: 'JLN | Just-Look 2 Gether Party'
    },

    data() {
        return {
            socket: null,
            message: '',
            messages: [],
            party: {
                id: this.$route.params.party,
                name: '',
                user: []
            }
        };
    },

    watch: {
        messages: 'scrollToBottom'
    },

    mounted() {
        // Open Socket Connection & Room Join
        // TODO: Check if room exsits - if not - push to /jl2g for creation (error swal)
        this.socket = io(process.env.WS_URL);
        this.socket.emit('joinParty', this.$route.params.party);

        // Socket Events
        this.socket.on('messageRecived', this.messageRecived);

        // Chat automatic scroll to bottom
        this.scrollToBottom();
    },

    destroyed() {
        // Close Socket Connection
        this.socket.close();
    },

    methods: {
        messageRecived(msg) {
            console.log(msg);
            this.messages.push(msg);
        },

        joinParty() {
            this.socket.emit('joinParty', this.party.id);
        },

        sendMessage() {
            this.socket.emit('sendMessage', this.party.id, this.message);
            this.message = '';
        },

        scrollToBottom() {
            this.$nextTick(() => {
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            });
        }
    }
};
</script>

<style>
.chatBox {
    position: relative;
    min-height: calc(100vh - 250px);
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
}

.videoBox {
    background-color: red;
    position: relative;
    min-height: calc(100vh - 200px);
    width: 100%;
}

.messages {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 70px;
    margin: 0;
    overflow-y: scroll;
    padding: 10px 20px 10px 20px;
    list-style: none;
    word-wrap: break-word;
}

.inputMessage {
    position: absolute;
    height: 60px;
    outline: none;
    bottom: 0;
    width: 100%;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px;
}
</style>
