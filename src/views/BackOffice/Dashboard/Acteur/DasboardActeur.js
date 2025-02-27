import UserService from "../services/user.service";
export default {
    name: "User",
    data() {
        return {
            content: "",
        };
    },
    mounted() {
        UserService.getUserBoard().then(
            (response) => {
                this.content = response.data;
            },
            (error) => {
                    this.content = (error.response && error.response.data && error.response.data.message) ||  error.message || error.toString();
                }
        );
    },
};
