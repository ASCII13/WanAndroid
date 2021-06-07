import { httpGet, httpPost } from '@/utils/request';

export function register(username, password, repassword) {
    const data = {
        username,
        password,
        repassword
    };
    return httpPost('/user/register', data);
}

export function signIn(username, password) {
    const data = {
        username,
        password,
    };
    return httpPost('/user/login', data);
}

export function signOut() {
    return httpGet('/user/logout/json');
}