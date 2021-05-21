import { httpGet, httpPost } from '../utils/request';


export function getBanner() {
    return httpGet('/banner/json');
}

export function getArticles(currPage = 0) {
    return httpGet(`/article/list/${currPage}/json`);
}