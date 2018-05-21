import {SERVER_URL} from "../constants";

const fetchJson = (url, init = {}) => fetch(url, {
    ...init,
    "Accept": 'application/json',
    "Content-Type": 'application/json',
})
    .then(resp => resp.json())
    .then(resp => {
        if (resp.status === "error") {
            throw new Error(resp.error);
        }
        return resp;
});

export class Users {
    getList = () => fetchJson(`${SERVER_URL}/api/users/`, {
        method: "GET",
    });
    getUser = user => fetchJson(`${SERVER_URL}/api/users/${user}/`);
    putUser = (user, name) => fetchJson(`${SERVER_URL}/api/users/${user}/`, {
        method: "PUT",
        body: JSON.stringify({username: name})
    });
}