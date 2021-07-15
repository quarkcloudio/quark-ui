import { history } from 'umi';

export function reload() {
    const {query}: any = history.location

    // @ts-ignore
    history.replace({
        pathname: history.location.pathname,
        query: {
            ...query,
            timestamp : new Date().getTime()
        }
    })
}