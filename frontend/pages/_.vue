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
                    // increse click counter
                    var clicksNum = parseInt(res[0].clicks);
                    const obj = {
                        clicks: (clicksNum += 1)
                    };

                    this.$axios
                        .$put('/urls/' + res[0].id, obj)
                        .then(res => {
                            // Redirect to new website
                            const url = res.baseUrl;
                            window.location.href = url;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(err => {
                console.log(err);

                swal('Something went wrong!', 'please contact a developer on our Discord', 'error').then(result => {
                    this.$router.push('/');
                });
            });
    }
};
</script>
