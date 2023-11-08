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

        let projects = await response.json() 
        return projects;
    }

    async AddProject(title, description) {
        let response = await fetch(this.API_URL + "projects", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });
        response = await response.json;
        return response;
    }

    async RemoveProject() {

    }
}

export default ApiController;