<template>
    <!-- mainhead -->
    <b-container class="h-100 first-section">
        <b-row>
            <b-col lg="8" class="text-center">
                <svg
                    id="logo"
                    height="50%"
                    class="img-responsive"
                    viewBox="0 0 986 1096"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xml:space="preserve"
                    xmlns:serif="http://www.serif.com/"
                    style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"
                >
                    <g id="Main">
                        <path
                            d="M270.59,138.236l0,145.156l-111.849,64.576l0,283.103l-125.616,-72.525l0,-283.209l237.465,-137.101Z"
                            style="fill:#808080;"
                        />
                        <path
                            d="M714.776,138.236l0,145.156l111.849,64.576l0,283.103l125.617,-72.525l0,-283.209l-237.466,-137.101Z"
                            style="fill:#808080;"
                        />
                        <path
                            id="JL_right"
                            d="M526.65,247.953l125.241,72.308l0,547.367l174.734,-100.577l0,-63.366l125.617,-72.525l0,208.595l-299.82,173.101l0,0.008l-125.759,72.607l-0.013,0l0,-837.518Z"
                            style="fill:#000;"
                        />
                        <path
                            id="JL_left"
                            d="M333.476,320.013l125.348,-72.37l-0.107,837.828l-0.013,0l-125.759,-72.607l0,-0.008l-299.82,-173.101l0,-208.595l125.616,72.525l0,63.366l174.735,100.577l0,-547.615Z"
                            style="fill:#000;"
                        />
                        <path
                            id="JL_top"
                            d="M333.476,247.399l0,-145.47l82.868,-47.844l76.339,-44.075l159.208,91.919l0,145.718l-125.241,-72.308l0,-0.562l-33.967,-19.61l-33.849,19.543l0,0.313l-125.358,72.376Z"
                            :style="color"
                        />
                    </g>
                </svg>
            </b-col>
            <b-col lg="4" class="text-center">
                <div class="card">
                    <div class="btn-group">
                        <button type="button" class="btn btn-dark" @click="onDarkSwitch">Dark</button>
                        <button type="button" class="btn btn-light" @click="onLightSwitch">Light</button>
                    </div>

                    <div class="card-body text-center d-flex justify-content-center align-items-center flex-column">
                        <p>Choose your Color:</p>
                        <client-only>
                            <chrome-picker v-model="color_picker" @input="updateColor" />
                        </client-only>
                        <br />
                        <button type="button" class="btn btn-dark btn-block" @click="onExport">Export</button>
                    </div>
                </div>
            </b-col>
        </b-row>

        <canvas hidden id="canvas" width="500px" height="500px"></canvas>
    </b-container>
</template>

<script>
import { Chrome } from 'vue-color';

export default {
    layout: 'tool',

    components: {
        'chrome-picker': Chrome
    },

    data() {
        return {
            color_picker: {
                hex: '#FF6600'
            },
            color: {
                fill: '#FF6600'
            }
        };
    },

    computed: {
        updateColor() {
            this.color.fill = this.color_picker.hex;
        }
    },

    methods: {
        onDarkSwitch() {
            document.body.style.backgroundColor = '#FFF';
            document.querySelector('#JL_right').setAttribute('style', 'fill:' + '#000');
            document.querySelector('#JL_left').setAttribute('style', 'fill:' + '#000');
        },

        onLightSwitch() {
            document.body.style.backgroundColor = '#212529';
            document.querySelector('#JL_right').setAttribute('style', 'fill:' + '#FFF');
            document.querySelector('#JL_left').setAttribute('style', 'fill:' + '#FFF');
        },

        // Export Button
        onExport() {
            var canvas = document.getElementById('canvas');
            var svg = document.querySelector('#logo');

            function triggerDownload(imgURI) {
                var evt = new MouseEvent('click', {
                    view: window,
                    bubbles: false,
                    cancelable: true
                });

                var a = document.createElement('a');
                var b = document.getElementById('JL_top');

                a.setAttribute('download', 'JL_Logo_Colored.png');
                a.setAttribute('href', imgURI);
                a.setAttribute('target', '_blank');

                a.dispatchEvent(evt);
            }

            var ctx = canvas.getContext('2d');
            var data = new XMLSerializer().serializeToString(svg);
            var DOMURL = window.URL || window.webkitURL || window;

            var img = new Image();
            var svgBlob = new Blob([data], {
                type: 'image/svg+xml;charset=utf-8'
            });
            var url = DOMURL.createObjectURL(svgBlob);

            img.onload = function() {
                var dx = (img.height - img.width) / 2;
                var t = canvas.height / img.height;

                console.log(dx);
                console.log(t);
                console.log(dx * t);

                ctx.drawImage(img, dx * t, 0);

                DOMURL.revokeObjectURL(url);

                var imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

                triggerDownload(imgURI);
            };

            img.src = url;
        }
    }
};
</script>
