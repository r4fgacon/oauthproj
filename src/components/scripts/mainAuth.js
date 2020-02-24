/* eslint-disable */
export default {
    name: "HelloWorld",
    props: {
        msg: String

    },
    data() {
        return {
            isInit: false,
            isSignIn: false,
            userData: {
                name: null,
                pictureUrl: null
            }
        };
    },
    methods: {
        login(){
            this.userData.name = this.$gAuth.GoogleAuth.currentUser.get().getBasicProfile().Ad;
            this.userData.pictureUrl = this.$gAuth.GoogleAuth.currentUser.get().getBasicProfile().jL;
            //console.log(this.userData);
            this.$emit("passUser", this.userData);
            //this.handleClientLoad();
            //this.initClient();

           // this.makeRequest();

        },

        handleClickSignIn() {
            this.$gAuth
                .signIn()
                .then(GoogleUser => {
                    //on success do something
                    console.log("GoogleUser", GoogleUser);
                    console.log("getId", GoogleUser.getId());
                    console.log("getBasicProfile", GoogleUser.getBasicProfile());
                    console.log("getAuthResponse", GoogleUser.getAuthResponse());
                    console.log(
                        "getAuthResponse",
                        this.$gAuth.GoogleAuth.currentUser.get().getAuthResponse()
                    );
                    this.isSignIn = this.$gAuth.isAuthorized;
                })
                .catch(error => {
                    //on fail do something
                });
        },

        handleClickSignOut() {
            this.$gAuth
                .signOut()
                .then(() => {
                    //on success do something
                    this.isSignIn = this.$gAuth.isAuthorized;
                })
                .catch(error => {
                    //on fail do something
                });
        }
    },
    created() {
        let that = this;
        let checkGauthLoad = setInterval(function() {
            that.isInit = that.$gAuth.isInit;
            that.isSignIn = that.$gAuth.isAuthorized;
            if (that.isInit) clearInterval(checkGauthLoad);
        }, 1000);
    }



};