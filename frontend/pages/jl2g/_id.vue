<template>
    <div>
        <section class="party-section bg-primary">
            <b-container class="h-100" fluid>
                <b-row class="h-100">
                    <b-col lg="9" class="mt-1 mb-4">
                        <b-card class="shadow h-100">
                            <youtube
                                class="videoBox"
                                id="youtubePlayer"
                                video-id="ScMzIvxBSi4"
                                player-width="100%"
                                player-height="100%"
                                host="https://www.youtube-nocookie.com"
                                :player-vars="{autoplay: 0, controls: 0, disablekb: 1}"
                                @ready="ready"
                                @playing="playing"
                                @ended="ended"
                            ></youtube>
                            <div class="playerControls">
                                <div class="videoLength">
                                    <b-progress
                                        height="6px"
                                        :value="playerControls.currTime"
                                        :max="party.currVideo.length"
                                    ></b-progress>
                                    <input
                                        id="videoLengthRange"
                                        class="videoLengthSlider"
                                        type="range"
                                        step="0.01"
                                        :max="party.currVideo.length"
                                        value="0.00"
                                        @click="onRangeUpdate"
                                    />
                                </div>
                                <button class="video-btn b-right playButton" @click="play">
                                    <!-- IF playing -> Change icon -->
                                    <font-awesome-icon v-if="!playerControls.playing" icon="play" />
                                    <font-awesome-icon v-if="playerControls.playing" icon="pause" />
                                </button>
                                <div class="infoControl">
                                    <span
                                        class="time"
                                    >{{ playerControls.currRealTime }} / {{ playerControls.length }}</span>
                                </div>
                                <div class="volumenControl">
                                    <button
                                        class="video-btn b-right b-left volumenButton"
                                        @click="onVolumenMute"
                                    >
                                        <font-awesome-icon
                                            v-if="!playerControls.mute"
                                            icon="volume-up"
                                        />
                                        <font-awesome-icon
                                            v-if="playerControls.mute"
                                            icon="volume-mute"
                                        />
                                    </button>
                                    <b-form-input
                                        id="volumenRange"
                                        class="volumenSilder"
                                        type="range"
                                        min="0"
                                        max="100"
                                        :value="playerControls.volume"
                                        @change="onVolumeUpdate"
                                    ></b-form-input>
                                </div>
                                <button class="video-btn b-left settingButton">
                                    <font-awesome-icon icon="cog" />
                                </button>
                                <button
                                    class="video-btn b-left fullscreenButton"
                                    @click="onFullscreen"
                                >
                                    <font-awesome-icon icon="expand" />
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
            },

            playerControls: {
                currTime: '0',
                currRealTime: '0',
                length: '0',
                volume: '20',
                mute: false,
                playing: false
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
            if (vm.socket != null && vm.player != null) {
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

        // Chat automatic scroll to bottom
        this.scrollToBottom();

        // -------------------------------------------------------
        // PlayerRangeSilder Mouseover
        var slider = document.getElementById('videoLengthRange');
        var sliderOffsetX = slider.getBoundingClientRect().left - document.documentElement.getBoundingClientRect().left;
        var sliderOffsetY = slider.getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;
        var sliderWidth = slider.offsetWidth;

        slider.addEventListener('mousemove', function(event) {
            var currentMouseXPos = event.clientX + window.pageXOffset - sliderOffsetX;
            var sliderValAtPos = ((currentMouseXPos / sliderWidth) * slider.max).toFixed(2);

            slider.value = sliderValAtPos;
            slider.setAttribute('style', 'display: block;');
        });
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
        // Video Player Control Functions
        startTimeRangeInterval() {
            let vm = this;

            let timeRangeInterval = setInterval(() => {
                vm.playerControls.currTime = vm.player.getCurrentTime();

                let seconds = Math.round(vm.playerControls.currTime);
                vm.playerControls.currRealTime = vm.convertToTime(seconds);
            }, 100);
        },

        stopTimeRangeInterval() {
            clearInterval(this.timeRangeInterval);
        },

        onRangeUpdate(event) {
            console.log('change: playtime to - ' + event.target.value);
            this.player.seekTo(event.target.value);

            // TODO: Sync new Time with Party
        },

        onVolumeUpdate() {
            console.log('change: volume to - ' + event.target.value);
            this.player.setVolume(event.target.value);

            this.playerControls.mute = false;
            this.player.unMute();
        },

        onVolumenMute() {
            if (this.player.isMuted()) {
                this.playerControls.mute = false;
                this.player.unMute();
            } else {
                this.playerControls.mute = true;
                this.player.mute();
            }
        },

        onFullscreen() {
            var iframe = document.getElementById('youtubePlayer');

            let requestFullScreen =
                iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
            if (requestFullScreen) {
                requestFullScreen.bind(iframe)();
            }
        },

        ready(event) {
            this.player = event.target;
            console.log('ready');

            // Autoplay at synced currTime
            setTimeout(() => {
                this.player.seekTo(this.party.currVideo.currTime);
                this.player.setVolume('20');

                // play Kappa
                this.play();

                // set playercontrols
                this.playerControls.playing = true;

                let seconds = Math.round(this.player.getDuration());
                this.playerControls.length = this.convertToTime(seconds);
            }, 500);

            // start sync Time
            this.syncCurrTime();
        },

        play() {
            if (this.playerControls.playing) {
                // PAUSE PLAYBACK
                this.player.pauseVideo();
                this.stopSyncCurrTime();
                this.stopTimeRangeInterval();

                this.playerControls.playing = false;
                console.log('pause');

                // TODO: Sync video pause with Party
            } else {
                // PLAY PLAYBACK
                this.player.playVideo();
                this.startTimeRangeInterval();

                this.playerControls.playing = true;
                console.log('play');

                // TODO: Sync play event with Party
            }
        },

        playing(event) {
            // The player is playing a video.
            console.log('playing');
            console.log(event);

            this.playerControls.playing = true;
        },

        change() {
            // when you change the value, the player will also change.
            // If you would like to change `playerVars`, please change it before you change `videoId`.
            // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
            // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
            this.videoId = 'another video id';

            // TODO: Sync new Video with Party
        },

        stop() {
            this.player.stopVideo();
            this.stopSyncCurrTime();
            this.stopTimeRangeInterval();

            this.playerControls.playing = false;

            console.log('stop');

            // TODO: Sync video stop with Party
        },

        ended() {
            this.stopSyncCurrTime();
            this.stopTimeRangeInterval();

            this.playerControls.playing = false;
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
        // Party Video Functions

        // Sync time to socket server (only if host)
        syncCurrTime() {
            let vm = this;
            this.timeInterval = setInterval(() => {
                if (vm.socket.id === vm.party.host) {
                    vm.socket.emit('syncCurrVideoTime', vm.party.id, vm.player.getCurrentTime());
                }
            }, 1000);
        },

        // Stop Sync time to socket server
        stopSyncCurrTime() {
            clearInterval(this.timeInterval);
        },

        // -------------------------------------------------------
        // DEV SHIT---- TODO: NEEEEEEEED CLEANUP AND SHIT
        convertToTime(seconds) {
            var hours = Math.floor(seconds / 3600);
            var minutes = Math.floor((seconds - hours * 3600) / 60);
            var seconds = seconds - hours * 3600 - minutes * 60;
            var time = '';

            if (hours != 0) {
                time = hours + ':';
            }

            if (minutes != 0 || time !== '') {
                minutes = minutes < 10 && time !== '' ? '0' + minutes : String(minutes);
                time += minutes + ':';
            }

            if (time === '') {
                time = seconds + 's';
            } else {
                time += seconds < 10 ? '0' + seconds : String(seconds);
            }

            return time;
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
