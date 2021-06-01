import { httpPost } from '@/utils/request';

export function star(id) {
    return httpPost(`/lg/collect/${id}/json`);
}

/**
 * 适用于普通文章列表
 * @param {*} id 
 */
export function unstar(id) {
    return httpPost(`/lg/uncollect_originId/${id}/json`);
}

/**
 * 适用于收藏文章列表
 * @param {*} id 
 * @param {*} originId 
 */
export function unfavorite(id, originId) {
    const data = {
        originId,
    };
    return httpPost(`/lg/uncollect/${id}/json`, data);
}