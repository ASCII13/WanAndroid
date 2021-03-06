import { httpGet } from '@/utils/request';

export function fetchTabs() {
    return httpGet('/wxarticle/chapters/json');
}

export function fetchArticles(id, currPage = 1) {
    return httpGet(`/wxarticle/list/${id}/${currPage}/json`)
}

export function search(id, currPage = 1, str) {
    return httpGet(`/wxarticle/list/${id}/${currPage}/json?k=${str}`);
}