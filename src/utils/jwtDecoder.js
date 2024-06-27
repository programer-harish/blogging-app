import { jwtDecode } from "jwt-decode";

export const jwtDecoder = (token) => {
    console.log(token)
    return jwtDecode(token);
}