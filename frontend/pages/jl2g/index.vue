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
                                    ></b-form-input>
                                </b-form-group>
                                <b-button type="submit" variant="primary">
                                    Start your awesome Party now!
                                </b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                    <b-col lg="4" class="mt-5">
                        <b-card class="shadow">
                            <b-form @submit.stop.prevent>
                                <b-form-group label="Enter Party ID" label-for="roomID">
                                    <b-form-input id="roomID" placeholder="Party ID"></b-form-input>
                                </b-form-group>
                                <b-button type="submit" variant="primary">
                                    Join the fkn awesome Party!
                                </b-button>
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
                        <div class="chatArea">
                            <ul ref="messages" class="messages">
                                <li v-for="(message, index) in messages" :key="index" class="message text-white">
                                    <i :title="message.date"> {{ message.date.split('T')[1].slice(0, -2) }} </i>:
                                    {{ message.text }}
                                </li>
                            </ul>
                        </div>
                        <input
                            v-model="message"
                            class="inputMessage"
                            type="text"
                            placeholder="Type here..."
                            @keyup.enter="sendMessage"
                        />
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
export default {
    transition: 'page',
    data() {
        return {
            messages: [],
            message: ''
        };
    },
    watch: {
        messages: 'scrollToBottom'
    },
    mounted() {
        this.socket = this.$nuxtSocket({
            name: 'jl2g',

            reconnection: false
        });
    },
    methods: {
        sendMessage() {
            if (!this.message.trim()) {
                return;
            }

            const message = {
                date: new Date().toJSON(),
                text: this.message.trim()
            };

            this.messages.push(message);
            this.message = '';
            this.socket.emit('sendMessage', message);
        }
    },
    head: {
        title: 'JLN | Just-Look 2 Gether Party'
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
