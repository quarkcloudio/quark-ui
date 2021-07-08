import { history } from 'umi';

export function reload() {
    let query:any = history.location.query;
    query['_timestamp'] = new Date().getTime();
    history.push({ pathname: history.location.pathname, query: query });
}