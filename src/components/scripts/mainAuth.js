/* eslint-disable */
export default {
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

            this.$emit("passUser", this.userData);

        },

        handleClickSignIn() {
            this.$gAuth
                .signIn()
                .then(GoogleUser => {
                    console.log("login successful");
                    this.isSignIn = this.$gAuth.isAuthorized;
                })
                .catch(error => {
                    console.log("login failed");
                });
        },

        handleClickSignOut() {
            this.$gAuth
                .signOut()
                .then(() => {
                    this.$emit("logout");
                    console.log("logout successful");
                    this.isSignIn = this.$gAuth.isAuthorized;
                })
                .catch(error => {
                    console.log("logout failed");
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