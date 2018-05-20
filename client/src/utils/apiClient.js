import {SERVER_URL} from "../constants";

const fetchJson = (url, init) => fetch(url, {
    ...init,
    Accept: 'application/json',
}).then(resp => resp.json());

export class Users {
    getList = () => fetchJson(`${SERVER_URL}/api/users/`, {
        method: "GET",
    });
    getUser = user => fetchJson(`${SERVER_URL}/api/users/${user}/`);
    putUser = (user, name) => fetchJson(`${SERVER_URL}/api/users/${user}/`, {
        method: "PUT",
        body: { username: name }
    });
}