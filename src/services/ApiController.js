class ApiController {

    API_URL = "";
    AccessToken = "";
    isLogin = false;

    constructor(url, token, isLogin) {
        this.API_URL = url;
        this.AccessToken = token;
        this.isLogin = isLogin;
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

    async AddProject(title, description, image_1, image_2, image_3) {
        let response = await fetch(this.API_URL + "projects", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                image_1: image_1,
                image_2: image_2,
                image_3: image_3
            })
        });
        response = await response.json;
        return response;
    }

    async UpdateProject(project) {
        let response = await fetch(this.API_URL + "projects/" + project.id, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project)
        });

        return response;
    }

    async RemoveProject(projectId) {

        let response = await fetch(this.API_URL + "projects/" + projectId, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        return response;
    }

    async GetAdvert() {
        let response = await fetch(this.API_URL + "advert", {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        let adverts = await response.json();
        return adverts;
    }

    async AddAdvert(advert) {
        let response = await fetch(this.API_URL + "advert", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(advert),
        });

        let result = await response.json();
        return result;
    }

    async RemoveAdvert(advert) {
        let response = await fetch(this.API_URL + "projects/" + advert.id, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        return response;
    }
}

export default ApiController;