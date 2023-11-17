class ApiController {

    login = "";
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
            this.AccessToken = await response.text();
            this.isLogin = true;
        }
    }

    async ChangePassword(password, newPassword) {
        let response;

        try {
            response = await fetch(this.API_URL + "login/changePassword", {
                method: "POST",
                mode: "cors",
                headears: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain",
                },
                body: JSON.stringify({
                    password: password,
                    newPassword: newPassword,
                })
            });
        } catch {
            return false;
        }

        if (response.ok) {
            this.AccessToken = await response.text();
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

        if (!response.ok) {
            return false;
        }

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
                "Authorization": "Bearer " + this.AccessToken,
            },
            body: JSON.stringify({
                title: title,
                description: description,
                image_1: image_1,
                image_2: image_2,
                image_3: image_3
            })
        });

        if (!response.ok) {
            return false;
        }

        response = await response.json();
        return response;
    }

    async UpdateProject(project) {

        let response;

        try {
            response = await fetch(this.API_URL + "projects/" + project.id, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.AccessToken,
                },
                body: JSON.stringify(project)
            });
        } catch {
            return false;
        }

        return response;
    }

    async RemoveProject(projectId) {
        let response;

        try {
            response = await fetch(this.API_URL + "projects/" + projectId, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.AccessToken,
                }
            });
        } catch {
            return false;
        }

        return response;
    }

    async ChangeProjectOrder(current, projectId) {
        let response;
        try {
            response = await fetch(this.API_URL + "projects/ord/" + projectId + "/" + current, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + this.AccessToken,
                }
            });
        } catch {
            return false;
        }

        return response;
    }

    async GetAdverts() {
        let response = await fetch(this.API_URL + "advert", {
            method: "GET",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            return false;
        }

        let adverts = await response.json();
        return adverts;
    }

    async AddAdvert(image) {
        let response = await fetch(this.API_URL + "advert", {
            method: "POST",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.AccessToken,
            },
            body: JSON.stringify({
                image: image,
            }),
        });

        if (!response.ok) {
            return false;
        }

        let result = await response.json();
        return result;
    }

    async RemoveAdvert(advertId) {
        let response = await fetch(this.API_URL + "advert/" + advertId, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.AccessToken,
            }
        });

        if (!response.ok) {
            return false;
        }

        return response;
    }
}

export default ApiController;