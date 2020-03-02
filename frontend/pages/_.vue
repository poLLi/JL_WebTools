<template>
    <div>
        <header class="mainhead">
            <b-container class="h-100">
                <b-row align-h="center" align-content="center" class="h-100 text-center">
                    <b-col lg="10" class="align-self-end">
                        <h1 class="text-uppercase text-white font-weight-bold">
                            Redirecting...
                        </h1>
                        <hr class="divider my-4" />
                    </b-col>
                    <b-col lg="8" class="align-self-baseline">
                        <p class="text-white font-weight-light mb-5">
                            Thanks for using our super extreme cool fancy awesome hyper mega af url shortener!
                        </p>
                    </b-col>
                </b-row>
            </b-container>
        </header>
    </div>
</template>
<script>
export default {
    layout: 'redirect',

    mounted() {
        if (!this.$route.params.pathMatch) {
            return;
        }

        console.log(this.$route.params.pathMatch);
        const id = this.$route.params.pathMatch;

        this.$axios
            .$get('/urls?shortUrl_eq=' + id)
            .then(res => {
                if (res.length === 0) {
                    swal('Please Enter a valid Short Url', '', 'error').then(result => {
                        this.$router.push('/url');
                    });

                    return;
                } else {
                    const url = res[0].baseUrl;
                    window.location.href = url;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};
</script>
