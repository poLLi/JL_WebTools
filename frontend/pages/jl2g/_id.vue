<template>
    <div>
        <section
            class="party-section"
            v-bind:class="{'bg-secondary': darkMode, 'bg-primary': !darkMode}"
        >
            <b-container class="h-100" fluid>
                <b-row class="h-100">
                    <b-col lg="9" class="mt-1 mb-4">
                        <b-card
                            class="shadow h-100"
                            v-bind:class="{'bg-dark text-white': darkMode, '': !darkMode}"
                        >
                            <youtube
                                class="videoBox"
                                id="youtubePlayer"
                                :video-id="party.currVideo.id"
                                player-width="100%"
                                player-height="100%"
                                host="https://www.youtube-nocookie.com"
                                :player-vars="{autoplay: 0, controls: 0, disablekb: 1}"
                                @ready="ready"
                                @paused="paused"
                                @playing="playing"
                                @buffering="buffering"
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

                                <b-dropdown
                                    variant="link"
                                    class="settingsButton"
                                    toggle-class="text-decoration-none video-btn b-left"
                                    dropup
                                    right
                                    no-caret
                                >
                                    <template v-slot:button-content>
                                        <font-awesome-icon icon="cog" />
                                    </template>

                                    <b-dropdown-header id="dropdown-header-label">Settings</b-dropdown-header>

                                    <b-button
                                        id="popover-quallity"
                                        variant="primary"
                                        ref="button"
                                        class="text-left"
                                        block
                                    >Quallity</b-button>

                                    <b-button
                                        id="popover-speed"
                                        variant="primary"
                                        ref="button"
                                        class="text-left"
                                        block
                                    >Playback</b-button>

                                    <b-popover
                                        target="popover-quallity"
                                        triggers="hover"
                                        placement="left"
                                    >
                                        <b-button
                                            class="btn-block btn-player-settings"
                                            @mousedown="setQuality('hd1080')"
                                        >1080p</b-button>
                                        <b-button
                                            class="btn-block btn-player-settings"
                                            @mousedown="setQuality('hd720')"
                                        >720p</b-button>
                                        <b-button
                                            class="btn-block btn-player-settings"
                                            @mousedown="setQuality('tiny')"
                                        >480p</b-button>
                                    </b-popover>

                                    <b-popover
                                        target="popover-speed"
                                        triggers="hover"
                                        placement="left"
                                    >
                                        <b-button
                                            class="btn-block btn-player-settings"
                                            @mousedown="setPlaybackRate(0.25)"
                                        >0.25x</b-button>
                                        <b-button
                                            class="btn-block btn-player-settings"
                                            @mousedown="setPlaybackRate(0.5)"
                                        >0.50x</b-button>
                                        <b-button
                                            class="btn-block btn-player-settings"
                                            @mousedown="setPlaybackRate(1)"
                                        >Normal</b-button>
                                        <b-button
                                            class="btn-block btn-player-settings"
                                            @mousedown="setPlaybackRate(1.5)"
                                        >1.50x</b-button>
                                        <b-button
                                            class="btn-block btn-player-settings"
                                            @mousedown="setPlaybackRate(2)"
                                        >2x</b-button>
                                    </b-popover>
                                </b-dropdown>

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
                        <b-card
                            class="shadow h-100"
                            v-bind:class="{'bg-dark text-white': darkMode, '': !darkMode}"
                        >
                            <div class="sidebar">
                                <b-button
                                    squared
                                    variant="outline-primary"
                                    @click="selected = 'playlistTab'"
                                >Videos</b-button>
                                <b-button
                                    squared
                                    variant="outline-primary"
                                    @click="selected = 'chatTab'"
                                >Chat</b-button>
                                <b-button
                                    squared
                                    variant="outline-primary float-right"
                                    @click="selected = 'settingsTab'"
                                >
                                    <font-awesome-icon icon="cog" />
                                </b-button>
                                <hr />

                                <!--------- SIDEBAR: Playlist --------->
                                <div v-if="selected == 'playlistTab'">
                                    <b-form-input
                                        v-model="searchbar"
                                        type="text"
                                        placeholder="Type new Video ID here..."
                                        @keyup.enter="change"
                                        autocomplete="off"
                                        v-bind:class="{'bg-dark text-white': darkMode, '': !darkMode}"
                                    ></b-form-input>
                                </div>

                                <!--------- SIDEBAR: Chat --------->
                                <div v-if="selected == 'chatTab'">
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
                                        v-bind:class="{'bg-dark text-white': darkMode, '': !darkMode}"
                                    />
                                </div>

                                <!--------- SIDEBAR: User --------->
                                <div v-if="selected == 'settingsTab'">
                                    <span>
                                        Connected User in Party:
                                        <strong>{{ party.user }}</strong>
                                    </span>
                                    <hr />
                                    <b-form-checkbox
                                        switch
                                        size="lg"
                                        v-model="darkMode"
                                    >Dark Background</b-form-checkbox>
                                    <br />
                                    <b-form-checkbox switch>adsa</b-form-checkbox>
                                    <b-form-checkbox switch>asdasda</b-form-checkbox>
                                    <b-form-checkbox switch>asdasd</b-form-checkbox>
                                    <b-form-checkbox switch>asdasda</b-form-checkbox>
                                </div>
                            </div>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <section class="page-section" v-bind:class="{'bg-primary': darkMode, 'bg-dark': !darkMode}">
            <b-container>
                <b-row align-h="center" class="text-center text-white">
                    <b-col lg="8">
                        <h2 class="mt-0">Just-Look Togehter</h2>
                        <hr class="divider light mt-4" />
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt perferendis voluptatibus pariatur sit a quo sapiente, labore totam eveniet veritatis?</p>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <section
            class="page-section"
            v-bind:class="{'bg-dark': darkMode, 'bg-secondary': !darkMode}"
        >
            <b-container>
                <b-row align-h="center" class="text-center text-white">
                    <b-col lg="8">
                        <h2 class="mt-0">Just-Look Togehter</h2>
                        <hr class="divider light mt-4" />
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt perferendis voluptatibus pariatur sit a quo sapiente, labore totam eveniet veritatis?</p>
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
            darkMode: false,
            selected: 'playlistTab',

            message: '',
            messages: [],

            searchbar: '',

            timeOffset: 0,
            timeOffsetInterval: null,
            buff: true,

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

                // SYNC Stuff
                vm.socket.on('hostSync', vm.hostSync);
                vm.socket.on('clientSync', vm.clientSync);
                vm.socket.on('syncInitPartyData', vm.syncInitPartyData);
                vm.socket.on('userCount', vm.partyUserCount);

                vm.socket.on('play', vm.syncPlay);
                vm.socket.on('pause', vm.syncPause);
                vm.socket.on('jump', vm.syncJump);
                vm.socket.on('playbackRate', vm.syncPlaybackRate);

                vm.socket.on('change', vm.syncChangeVideo);

                // Party Chat
                vm.socket.on('messageRecived', vm.messageRecived);

                clearInterval(interval);
            }
        }, 100);

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

    beforeDestroy() {
        this.stopTimeRangeInterval();
        clearInterval(this.timeOffsetInterval);
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
            this.socket.emit('syncJump', this.party.id, event.target.value);
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

        setQuality(q) {
            this.player.setPlaybackQuality(q);
            console.log('change: quality to - ' + q);
        },

        setPlaybackRate(rate) {
            this.socket.emit('syncPlaybackRate', this.party.id, rate);
        },

        ready(event) {
            this.player = event.target;
            console.log('ready');

            setTimeout(() => {
                this.player.playVideo();

                this.player.setVolume('20');
                this.playerControls.playing = true;
            }, 100);
        },

        play() {
            if (this.playerControls.playing) {
                // PAUSE PLAYBACK
                this.socket.emit('syncPause', this.party.id);
            } else {
                // PLAY PLAYBACK
                this.socket.emit('syncPlay', this.party.id);
            }
        },

        paused() {
            // sync pause when clicked in video
            this.socket.emit('syncPause', this.party.id);
        },

        playing(event) {
            if (this.buff) {
                setTimeout(() => {
                    // test diff in sync time
                    let vm = this;
                    this.timeOffset = 0;
                    this.timeOffsetInterval = setInterval(() => {
                        vm.timeOffset++;
                    }, 1);

                    this.socket.emit('syncHost', this.party.id);
                    console.log('BUFFFFF sync host');
                }, 1000);

                this.buff = false;
            }

            // Set Video Duration Time
            let seconds = Math.round(this.player.getDuration());
            this.playerControls.length = this.convertToTime(seconds);

            // Set Video progressbar / RangeSlider
            this.party.currVideo.length = this.player.getDuration();

            // Start Video timestamp
            this.startTimeRangeInterval();

            this.playerControls.playing = true;
            console.log('playing');

            // DEV
            console.log(event);
        },

        change() {
            this.socket.emit('syncPause', this.party.id);
            this.socket.emit('changeCurrVideo', this.party.id, this.searchbar);
            this.searchbar = '';

            console.log('change: New Video!');
            // TODO: Sync new Video with Party
        },

        buffering() {
            console.log('buffering');
            this.buff = true;
        },

        stop() {
            this.player.stopVideo();
            this.stopTimeRangeInterval();

            this.playerControls.playing = false;

            console.log('stop');

            // TODO: Sync video stop with Party
        },

        ended() {
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

        hostSync() {
            if (this.socket.id === this.party.host) {
                console.log('HOST SYNC !!!!!');
                this.socket.emit(
                    'setHostTime',
                    this.party.id,
                    this.player.getCurrentTime(),
                    this.playerControls.playing
                );
            }
        },

        clientSync(time, playing) {
            if (this.socket.id === this.party.host) {
                return;
            } else {
                if (!(this.player.getCurrentTime() <= time + 1 && this.player.getCurrentTime() >= time - 1)) {
                    // test diff in sync time
                    console.log('diff: ' + this.timeOffset);

                    this.party.currVideo.currTime = time;
                    this.player.seekTo(time + this.timeOffset / 1000);

                    if (this.playerControls.playing != playing) {
                        if (!playing) {
                            this.syncPause();
                        } else {
                            this.syncPlay();
                        }
                    }

                    if (this.timeOffsetInterval != null) {
                        clearInterval(this.timeOffsetInterval);
                        this.timeOffsetInterval = null;
                    }
                }
            }
        },

        syncPlay() {
            this.player.playVideo();
            console.log('play');
        },

        syncPause() {
            this.player.pauseVideo();

            //this.stopSyncToServer();
            this.stopTimeRangeInterval();
            this.playerControls.playing = false;

            console.log('pause');
        },

        syncChangeVideo(newVideo) {
            console.log('NEW VIDEO');
            console.log(newVideo);
            this.party.currVideo.currTime = newVideo.currTime;
            this.party.currVideo.id = newVideo.id;

            this.play();
        },

        syncJump(newTime) {
            this.player.seekTo(newTime);

            console.log('change: seekTo - ' + newTime);
        },

        syncPlaybackRate(rate) {
            this.player.setPlaybackRate(rate);
            console.log('change: playbackrate to - ' + rate);
        },

        partyUserCount(count) {
            this.party.user = count;
        },

        // -------------------------------------------------------
        // Settings Tab
        darkModeToggle() {
            if (this.darkMode) {
                this.darkMode = false;
            } else {
                this.darkMode = true;
            }
            console.log('asdasdasda');
        },

        // -------------------------------------------------------
        // Time converter
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

.sidebar {
    height: 100%;
    position: relative;
}

.messages {
    position: absolute;
    top: 65px;
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
