import { httpGet } from '@/utils/request';

export function fetchFavorites(currPage = 0) {
    return httpGet(`/lg/collect/list/${currPage}/json`);
}