<template>
    <div>
        <section class="party-section bg-primary">
            <b-container class="h-100" fluid>
                <b-row class="h-100">
                    <b-col lg="9" class="mt-1 mb-4">
                        <b-card class="shadow h-100">
                            <youtube
                                class="videoBox"
                                video-id="ScMzIvxBSi4"
                                player-width="100%"
                                player-height="100%"
                                host="https://www.youtube-nocookie.com"
                                :player-vars="{autoplay: 0, controls: 0, disablekb: 1}"
                                @ready="ready"
                                @playing="playing"
                            ></youtube>
                            <div class="playerControls">
                                <div class="videoLength">
                                    <input
                                        id="videoLengthRange"
                                        class="videoLengthSlider"
                                        type="range"
                                        :max="party.currVideo.length"
                                        :value="party.currVideo.currTime"
                                    />
                                </div>
                                <button class="video-btn b-right playButton" @click="play">
                                    <!-- IF playing -> Change icon -->
                                    <font-awesome-icon icon="play" />
                                </button>
                                <button class="video-btn b-right stopButton" @click="pause">
                                    <font-awesome-icon icon="pause" />
                                </button>
                                <div class="infoControl">
                                    <span class="time">1:23 / 1:31:54</span>
                                </div>
                                <div class="volumenControl">
                                    <button class="video-btn b-right b-left volumenButton">
                                        <font-awesome-icon icon="volume-up" />
                                    </button>
                                    <b-form-input
                                        id="volumenRange"
                                        class="volumenSilder"
                                        type="range"
                                        min="0"
                                        max="100"
                                        value="50"
                                    ></b-form-input>
                                </div>
                                <button class="video-btn b-left settingButton">
                                    <font-awesome-icon icon="cog" />
                                </button>
                            </div>
                        </b-card>
                    </b-col>

                    <b-col lg="3" class="mb-4 mt-1 d-none d-lg-block d-xl-block">
                        <b-card class="shadow h-100">
                            <div class="chatbox">
                                <span>User Connected: {{ party.user }}</span>
                                <hr />

                                <ul ref="messages" class="messages">
                                    <li
                                        v-for="(message, index) in messages"
                                        :key="index"
                                        class="message"
                                    >
                                        <span class="chatUser">{{ message.username}}</span>
                                        <p class="chatMsg">{{ message.msg}}</p>
                                    </li>
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
                <b-row align-h="center" class="text-center text-white">
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
import { mapMutations, mapGetters } from 'vuex';

export default {
    transition: 'page',

    head: {
        title: 'JLN | Just-Look 2 Gether Party'
    },

    data() {
        return {
            message: '',
            messages: [],

            timeInterval: null,

            party: {
                id: '',
                host: '',
                user: '',
                currPlayer: '',

                currVideo: {
                    id: '',
                    length: '',
                    currTime: ''
                },

                prevVideo: {
                    id: '',
                    length: ''
                },

                queue: {
                    yt: [
                        {
                            videoId: '',
                            title: ''
                        }
                    ]
                }
            }
        };
    },

    watch: {
        messages: 'scrollToBottom'
    },

    computed: mapGetters({
        socket: 'jl2g/getSocket',
        username: 'jl2g/getUsername'
    }),

    mounted() {
        this.party.id = this.$route.params.id;

        // -------------------------------------------------------
        // Socket Events
        let vm = this;
        let interval = setInterval(() => {
            if (vm.socket != null) {
                // initial Party join check
                vm.socket.emit('joinParty', vm.party.id, vm.username);
                vm.socket.on('partyDontExists', vm.partyDontExists);

                // Sync Data
                vm.socket.on('syncInitPartyData', vm.syncInitPartyData);
                vm.socket.on('userCount', vm.partyUserCount);

                // Party Chat
                vm.socket.on('messageRecived', vm.messageRecived);

                clearInterval(interval);
            }
        }, 100);

        // Video Curr Time Bar color stuff :D
        document.getElementById('videoLengthRange').oninput = function() {
            this.style.background =
                'linear-gradient(to right, #FF6600 0%, #FF6600 ' +
                this.value +
                '%, #bbb ' +
                this.value +
                '%, #bbb 100%)';
        };

        // Chat automatic scroll to bottom
        this.scrollToBottom();
    },

    methods: {
        // -------------------------------------------------------
        // Party dont Exsists
        partyDontExists() {
            swal('Please Enter a valid Party ID', '', 'error').then(result => {
                this.$router.push('/jl2g');
            });
            return;
        },

        // -------------------------------------------------------
        // Synce Party Data
        syncInitPartyData(party) {
            this.party.host = party.host;
            this.party.currPlayer = party.currPlayer;
            this.party.currVideo = party.currVideo;
            this.party.prevVideo = party.prevVideo;
            this.party.queue = party.queue;
        },

        partyUserCount(count) {
            this.party.user = count;
        },

        // -------------------------------------------------------
        // Party Chat
        sendMessage() {
            this.socket.emit('sendMessage', this.party.id, this.message);
            this.message = '';
        },

        messageRecived(username, msg) {
            console.log(username + ': ' + msg);
            this.messages.push({ username, msg });
        },

        scrollToBottom() {
            this.$nextTick(() => {
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            });
        },

        // -------------------------------------------------------
        // Party Video Functions
        ready(event) {
            this.player = event.target;
            console.log('ready');

            let vm = this;
            this.timeInterval = setInterval(() => {
                vm.socket.emit('syncCurrentTime', vm.party.id, vm.player.getCurrentTime());
            }, 500);

            this.player.seekTo(this.party.currTime);
            setTimeout(() => {
                this.play();
            }, 500);
        },

        // -------------------------------------------------------
        // DEV SHIT---- TODO: NEEEEEEEED CLEANUP AND SHIT

        ended() {
            clearInterval(this.timeInterval);
        },

        playing(event) {
            // The player is playing a video.
            console.log('playing');
            console.log(event);
        },
        play() {
            // The player is playing a video.
            this.player.playVideo();
            console.log(this.player.getCurrentTime());
            console.log('play');
        },
        change() {
            // when you change the value, the player will also change.
            // If you would like to change `playerVars`, please change it before you change `videoId`.
            // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
            // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
            this.videoId = 'another video id';
        },
        stop() {
            this.player.stopVideo();
            console.log('stop');
            console.log(this.player);
        },
        pause() {
            this.player.pauseVideo();
            console.log('pause');
            console.log(this.player);
        }
    }
};
</script>

<style lang="scss" scoped>
.videoBox {
    height: calc(100% - 40px);
}

.chatbox {
    height: 100%;
    position: relative;
}

.messages {
    position: absolute;
    top: 45px;
    bottom: 40px;
    width: 100%;
    margin: 0;
    overflow-y: scroll;
    padding: 0px 5px 5px 0px;
    list-style: none;
    word-wrap: break-word;
    visibility: hidden;

    &:hover {
        visibility: visible;
    }

    &::-webkit-scrollbar {
        width: 3px;
        background-color: transparent;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #555;
    }
}

.message {
    background: rgba(0, 0, 0, 0.2);
    padding: 5px;
    margin-bottom: 6px;
    visibility: visible;

    .chatUser {
        padding: 0;
        margin: 0;
        font-size: 0.8rem;
        font-weight: 600;
        color: #ff6600;

        &::after {
            content: ':';
        }
    }

    .chatMsg {
        border-left: 4px solid #a1a1a1;
        padding: 8px;
        margin: 0;
    }
}

.inputMessage {
    position: absolute;
    bottom: 0;
    height: 40px;
    outline: none;
    width: 100%;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
