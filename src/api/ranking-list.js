import { httpGet } from '@/utils/request';

export function fetchRankingList(currPage = 1) {
    return httpGet(`/coin/rank/${currPage}/json`);
}

export function fetchSelfInfo() {
    return httpGet('/lg/coin/userinfo/json');
}