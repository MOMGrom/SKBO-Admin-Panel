
let API_URL = "https://localhost:7166/api"

export async function Login(login, password) {
        let response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                "Accept": "text/plain",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: login,
                password: password,
            })
        });

    if (!response.ok) {
        return false;
    }

    let token = await response.text();
    return token
}

export async function GetProjects() {
        let response = await fetch(
            this.API_URL + "/Projects",
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer" + this.jwtBearer
                }
            }
        )

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const projects = await response.json();
        return projects;
    }

export async function GetProjectById(id) {
        let response = await fetch(
            this.API_URL + "/projects/" + id,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer" + this.jwtBearer
                }
            }
        )

        if(!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const project = await response.json();
        return project;
    }

export async function CreateProject() {

    }

export async function UpdateProject(id) {

    }

export async function RemoveProject(id) {

    }