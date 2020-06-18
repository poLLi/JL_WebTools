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
                        <b-card class="shadow">
                            <b-form @submit.stop.prevent>
                                <b-form-group label="Enter your Party Name" label-for="roomName">
                                    <b-form-input
                                        id="roomName"
                                        placeholder="Cool Video Party Group"
                                        type="url"
                                        v-model="party.name"
                                    ></b-form-input>
                                </b-form-group>
                                <b-button
                                    type="submit"
                                    variant="primary"
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
                    <b-col lg="8">
                        <h2 class="text-white mt-0">Socket.IO Test</h2>
                        <hr />

                        <ul class="pages">
                            <li class="chat page">
                                <div class="chatArea">
                                    <ul ref="messages" class="messages">
                                        <li
                                            v-for="(message, index) in messages"
                                            :key="index"
                                            class="message"
                                        >{{ message}}</li>
                                    </ul>
                                </div>
                                <input
                                    v-model="message"
                                    class="inputMessage"
                                    type="text"
                                    placeholder="Type here..."
                                    @keyup.enter="sendMessage"
                                />
                            </li>
                        </ul>
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
                id: '',
                name: ''
            }
        };
    },
    watch: {
        messages: 'scrollToBottom'
    },
    mounted() {
        // Open Socket Connection
        this.socket = io(process.env.WS_URL);

        this.socket.on('messageRecived', this.messageRecived);
        this.socket.on('createdParty', this.createdParty);

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

        createParty() {
            this.socket.emit('createParty', this.party.name);
        },

        createdParty(id) {
            this.party.id = id;
            console.log(this.party.id);
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
.chatArea {
    height: 500px;
}
.messages {
    height: 100%;
    margin: 0;
    overflow-y: scroll;
    padding: 10px 20px 10px 20px;
    list-style: none;
    word-wrap: break-word;
}
/* Input */
.inputMessage {
    border: 10px solid #000;
    height: 60px;
    outline: none;
    right: 0;
    width: 100%;
}
</style>
