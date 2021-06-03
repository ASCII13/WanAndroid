import { httpGet, httpPost } from '@/utils/request';

/**
 * 
 * @param { 当前页数，从 1 开始 } currPage 
 * @param { 1 完成，0 未完成，默认全部展示 } status 
 * @param { 1 完成日期的顺序，2 完成日期逆序，3 创建日期顺序，4 创建日期逆序 } orderby 
 */
export function fetchTodoList(currPage = 1, status, orderby = 4) {
    const data = {
        status,
        orderby,
    };
    return httpGet(`/lg/todo/v2/list/${currPage}/json`, data);
}

export function removeTodo(id) {
    return httpPost(`/lg/todo/delete/${id}/json`);
}

export function finishTodo(id, status) {
    const data = {
        status,
    };
    return httpPost(`/lg/todo/done/${id}/json`, data);
}

/**
 * 
 * @param { 标题，必填 } title 
 * @param { 内容，必填 } content 
 * @param { 预定完成日期，不传默认当天 } date 
 * @param { 大于 0 的整数，可选 } type 
 * @param { 大于 0 的整数，可选 } priority 
 */
export function addTodo(obj) {
    return httpPost('/lg/todo/add/json', obj);
}

export function upgradeTodo(id, obj) {
    return httpPost(`/lg/todo/update/${id}/json`, obj);
}