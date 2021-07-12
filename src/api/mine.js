import { httpGet } from '@/utils/request';

export function fetchSelfInfo() {
    return httpGet('/lg/coin/userinfo/json');
}

export function fetchUnreadMsgCount() {
    return httpGet('/message/lg/count_unread/json');
}

export function fetchUnreadMsgs(query = 1) {
    return httpGet(`/message/lg/unread_list/${query}/json`);
}

export function fetchReadMsgs(query = 1) {
    return httpGet(`/message/lg/readed_list/${query}/json`);
}