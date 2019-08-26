import axios from "axios";
import { getJwtFromStorage, isEmptyString } from "../utils/utils";

export const host = "http://localhost:3001";
export const host_api = `${host}/api/`;
// export const ws_host = 'ws://localhost:3001/';
const auth_type = "Bearer";

const instance = axios.create({
    baseURL: host_api
});

export const api = {
    get: url => {
        let jwt = getJwtFromStorage();
        if (!isEmptyString(jwt)) {
            jwt = auth_type + " " + jwt;
        } else {
            jwt = "";
        }
        return instance.get(`${url}`, { headers: { Authorization: jwt } });
    },
    post: (url, req) => {
        let jwt = getJwtFromStorage();
        if (!isEmptyString(jwt)) {
            jwt = auth_type + " " + jwt;
        } else {
            jwt = "";
        }
        return instance.post(`${url}`, req, {
            headers: { Authorization: jwt }
        });
    }
};
