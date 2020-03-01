<template>
    <div>
        <!-- mainhead -->
        <header class="mainhead">
            <b-container class="h-100">
                <b-row align-h="center" align-content="center" class="h-100 text-center">
                    <b-col lg="10" class="align-self-end">
                        <h1 class="text-uppercase text-white font-weight-bold">
                            Just-Look Network
                        </h1>
                        <h2 class="text-uppercase text-white font-weight-medium">
                            Web Tools
                        </h2>
                        <hr class="divider my-4" />
                    </b-col>
                    <b-col lg="8" class="align-self-baseline">
                        <p class="text-white font-weight-light mb-5">
                            Custom handmade Tools for Just-Look Network
                        </p>
                    </b-col>
                </b-row>
            </b-container>
        </header>

        <!-- What Section  -->
        <section class="page-section bg-primary" id="about">
            <b-container>
                <b-row align-h="center">
                    <b-col lg="8" class="text-center">
                        <h2 class="text-white mt-0">What are we doing?</h2>
                        <hr class="divider light my-4" />
                        <p class="text-white mb-4">
                            Just-Look Network Web Tools is a collection of all kinds of tools we created for our
                            Community. Things like a Logo Generator to get our Logo in a custom color to use it as an
                            avatar or whatever^^
                        </p>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <!-- Info Section -->
        <section class="page-section" id="why">
            <b-container>
                <h2 class="text-center mt-0">Tools we allready made.</h2>
                <hr class="divider my-4" />
                <b-row>
                    <b-col lg="3" md="6" class="text-center">
                        <div class="mt-4">
                            <div style="height: 64px;" class="mb-4">
                                <svg
                                    id="logo"
                                    height="100%"
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
                                            style="fill:#FF6600;"
                                        />
                                        <path
                                            id="JL_left"
                                            d="M333.476,320.013l125.348,-72.37l-0.107,837.828l-0.013,0l-125.759,-72.607l0,-0.008l-299.82,-173.101l0,-208.595l125.616,72.525l0,63.366l174.735,100.577l0,-547.615Z"
                                            style="fill:#FF6600;"
                                        />
                                        <path
                                            id="JL_top"
                                            d="M333.476,247.399l0,-145.47l82.868,-47.844l76.339,-44.075l159.208,91.919l0,145.718l-125.241,-72.308l0,-0.562l-33.967,-19.61l-33.849,19.543l0,0.313l-125.358,72.376Z"
                                            style="fill:#FF6600"
                                        />
                                    </g>
                                </svg>
                            </div>
                            <h3 class="h4 mb-2">Logo Generator</h3>
                            <p class="text-muted mb-0">Customize our Logo for your needs</p>
                        </div>
                    </b-col>
                    <b-col lg="3" md="6" class="text-center">
                        <div class="mt-4">
                            <font-awesome-icon icon="link" class="fa-4x text-primary mb-4" />
                            <h3 class="h4 mb-2">Url Shortener</h3>
                            <p class="text-muted mb-0">Well... you guessed it :) Shorten your URL´s</p>
                        </div>
                    </b-col>
                    <b-col lg="3" md="6" class="text-center">
                        <div class="mt-4">
                            <font-awesome-icon icon="question" class="fa-4x text-primary mb-4" />
                            <h3 class="h4 mb-2">SOON</h3>
                            <p class="text-muted mb-0">maybe you have an idea of what todo next?</p>
                        </div>
                    </b-col>
                    <b-col lg="3" md="6" class="text-center">
                        <div class="mt-4">
                            <font-awesome-icon icon="question" class="fa-4x text-primary mb-4" />
                            <h3 class="h4 mb-2">SOON</h3>
                            <p class="text-muted mb-0">maybe you have an idea of what todo next?</p>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </section>

        <!-- Need Section  -->
        <section class="page-section bg-dark" id="about">
            <b-container>
                <b-row align-h="center">
                    <b-col lg="8" class="text-center">
                        <h2 class="text-white mt-0">You need somthing else?</h2>
                        <hr class="divider light my-4" />
                        <p class="text-white mb-4">
                            You have an idea for a new Tool we should make? contact us on Discord or more simply fill
                            out an Issue form for Feature request on Github.
                        </p>
                        <a class="btn btn-light btn-xl" href="https://github.com/Just-Look-Network/JL_WebTools/issues">
                            Github Issue´s
                        </a>
                    </b-col>
                </b-row>
            </b-container>
        </section>
    </div>
</template>

<script>
export default {
    transition: 'page'
};
</script>
