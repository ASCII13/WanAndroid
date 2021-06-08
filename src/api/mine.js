import { httpGet } from '@/utils/request';

export function fetchSelfInfo() {
    return httpGet('/lg/coin/userinfo/json');
}