class ApiController {

    API_URL = "";
    AccessToken = "";
    isLogin = false;

    constructor(url, token) {
        this.API_URL = url;
        this.AccessToken = token;
    }

    async Login(login, password) {
        let response = await fetch(this.API_URL + "login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain",
            },
            body: JSON.stringify({
                login: login,
                password: password,
            })
        });

        if (response.ok) {
            this.AccessToken = await response;
            this.isLogin = true;
        }
    }

    async GetProjects() {
        let response = await fetch(this.API_URL + "projects", {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        });

        console.log(response);

        return await response.json();
    }
}

export default ApiController;