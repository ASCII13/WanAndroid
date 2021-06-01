import { httpPost } from '@/utils/request';

export function star(id) {
    return httpPost(`/lg/collect/${id}/json`);
}

export function unstar(id) {
    return httpPost(`/lg/uncollect_originId/${id}/json`);
}