import { httpGet } from '@/utils/request';

export function fetchBanner() {
    return httpGet('/banner/json');
}

export function fetchArticles(currPage = 0) {
    return httpGet(`/article/list/${currPage}/json`);
}