<template>
    <div>
        <section class="first-section bg-primary">
            <b-container>
                <b-row align-h="center" align-v="center">
                    <b-col lg="12" class="text-center">
                        <h2 class="text-white my-0 py-0">URL Shortener</h2>
                        <hr class="divider light mt-4" />
                    </b-col>
                    <b-col lg="8" class="mt-5">
                        <b-card class="shadow">
                            <b-form @submit.stop.prevent>
                                <b-form-group label="Enter your Url" label-for="baseUrl">
                                    <b-form-input
                                        id="baseUrl"
                                        placeholder="https://"
                                        v-model="form.baseUrl"
                                        type="url"
                                    ></b-form-input>
                                </b-form-group>
                                <b-button type="submit" variant="primary" @click="onSubmitBase(form.baseUrl)">
                                    short... short it now!
                                </b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                    <b-col lg="4" class="mt-5">
                        <b-card class="shadow">
                            <b-form @submit.stop.prevent>
                                <b-form-group label="Enter your Short Url ID" label-for="shortUrl">
                                    <b-form-input id="shortUrl" placeholder="ID" v-model="form.shortUrl"></b-form-input>
                                </b-form-group>
                                <b-button type="submit" variant="primary" @click="onSubmitShort(form.shortUrl)">
                                    Check Url
                                </b-button>
                            </b-form>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <section v-if="showNewUrl" class="page-section bg-primary">
            <b-container>
                <b-row align-h="center">
                    <b-col lg="8" class="text-center">
                        <h2 class="text-white mt-0">Your new and Shorter Url is ready!</h2>
                        <hr class="divider light" />
                        <b-button
                            v-b-tooltip.hover.bottom
                            title="click the button to copy to clipboard!"
                            class="btn-dark btn-xl"
                            v-clipboard:copy="newUrl"
                        >
                            {{ newUrl }}
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <section v-if="checking" class="page-section bg-secondary" id="statistics">
            <b-container>
                <b-row align-h="center">
                    <b-col lg="8" class="">
                        <h2 class="text-white mb-4">Your Url Stats</h2>
                        <b-table
                            striped
                            borderless
                            table-variant="dark"
                            head-variant="light"
                            :fields="fields"
                            :items="stats"
                        >
                        </b-table>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <section class="page-section bg-dark">
            <b-container>
                <b-row align-h="center">
                    <b-col lg="8" class="text-center">
                        <h2 class="text-white mt-0">Your Urls are simply just to large?</h2>
                        <hr class="divider light my-4" />
                        <p class="text-white">
                            just shorten it now, its easy af :) Type in your "to long" and get a new fancy short one
                            back!
                        </p>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
const shortid = require('shortid');

export default {
    transition: 'page',

    data() {
        return {
            form: {
                baseUrl: '',
                shortUrl: ''
            },
            checking: false,
            showNewUrl: false,
            newUrl: '',
            fields: ['baseUrl', 'shortUrl', 'clicks'],
            stats: [{ baseUrl: '', shortUrl: '', clicks: '' }]
        };
    },

    computed: {},

    methods: {
        checkValidShorUrl(shortUrl, callback) {
            const vm = this;
            this.$axios
                .$get('/urls?shortUrl_eq=' + shortUrl)
                .then(res => {
                    if (res.length === 0) {
                        callback(shortUrl);
                    } else {
                        this.checkValidShorUrl(shortid.generate(), callback);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },

        requiredFieldsChecked(input) {
            // Check if right url format
            var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
            var regex = new RegExp(expression);

            if (input.match(regex)) {
                return true;
            } else {
                return false;
            }
        },

        onSubmitBase(input) {
            if (!this.requiredFieldsChecked(input)) {
                swal('Please Enter a valid Url', '', 'error');
                return;
            }
            this.checkValidShorUrl(shortid.generate(), url => {
                const vm = this;

                const obj = {
                    baseUrl: input,
                    shortUrl: url
                };

                this.$axios
                    .$post('/urls', obj)
                    .then(res => {
                        console.log('Url submitted');
                        swal('You did it!', '', 'success');
                        this.showNewUrl = true;
                        //this.newUrl = 'https://jln.net/' + res.shortUrl;
                        this.newUrl = 'https://polli.online/' + res.shortUrl;
                    })
                    .catch(err => {
                        if (error.response.status === 400) {
                            this.errorAvailable = true;

                            if (error.response.data.message.length > 0) {
                                this.errorText = error.response.data.message[0].messages[0].message;
                            }
                            setTimeout(function() {
                                vm.errorAvailable = false;
                                vm.errorText = '';
                            }, 3000);
                        }

                        swal('Something went wrong :(', 'error');
                        console.log(error.response);
                    });
            });
        },

        onSubmitShort(id) {
            console.log(id);
            const vm = this;
            this.$axios
                .$get('/urls?shortUrl_eq=' + id)
                .then(res => {
                    if (res.length === 0) {
                        swal('Please Enter a valid Short Url', '', 'error');
                        return;
                    } else {
                        this.stats[0].baseUrl = res[0].baseUrl;
                        this.stats[0].shortUrl = '/' + res[0].shortUrl;
                        this.stats[0].clicks = res[0].clicks;

                        this.checking = true;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
