import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {setErrorAction} from "../store/reducers/commonSlice";
import {setViewsAction, setRevisionsAction, setRevisionAction} from "../store/reducers/searchSlice";
import endpoints from "./../endpoints";
import IOption from "../types/option";
import IView from "../types/view";
import moment from "moment";
import IRevision from "../types/revision";
import {revisionParse} from "../utils/parsing";


export const wikiAPI = createApi({
    reducerPath: 'wikiAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
        prepareHeaders: (headers: Headers) => {
            // headers.set('Accept', 'application/json')
        }
    }),
    endpoints: (builder) => ({
        searchAutoComplete: builder.mutation<IOption[], string>({
            query: (query) => {
                return {
                    url: endpoints.wikiApi,
                    method: 'GET',
                    params: {
                        action: 'opensearch',
                        namespace: 0,
                        format: 'json',
                        search: query,
                        limit: 20,
                        origin: '*'
                    }
                }
            },
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data: result, meta} = await queryFulfilled

                    // if (!result.success) {
                    //     dispatch(setErrorAction('Search error'))
                    //     return;
                    // }

                } catch(e: any) {
                    dispatch(setErrorAction('Search error'))
                }
            },
            transformResponse: (response: any[]) => {
                return response[1].reduce((accum: IOption[], cur: string, index: number) => {
                    accum.push({
                        title: cur,
                        url: response[3][index]
                    })
                    return accum;
                }, [])
            },
        }),
        checkRedirect: builder.mutation<string | boolean, string>({
            query: (title) => {
                return {
                    url: endpoints.wikiApi,
                    method: 'GET',
                    params: {
                        action: 'query',
                        redirects: '',
                        format: 'json',
                        titles: title,
                        origin: '*'
                    }
                }
            },
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data: result, meta} = await queryFulfilled

                } catch(e: any) {

                } finally {

                }
            },
            transformResponse: (response: any) => {
                if (response['query'] && response['query']['redirects'] && Array.isArray(response['query']['redirects'])) {
                    const redirects = response['query']['redirects']
                    const lastRedirect = redirects[redirects.length - 1]
                    if (lastRedirect['to']) {
                        return lastRedirect['to'];
                    }
                }

                return false;
            }
        }),
        getViewsData: builder.mutation<IView[], string>({
            query: (slug) => {
                const toDate = moment()
                const fromDate = moment().subtract(1, 'months')

                const url = endpoints.getViews
                    .replace('{slug}', slug)
                    .replace('{from}', fromDate.format('YYYYMMDD'))
                    .replace('{to}', toDate.format('YYYYMMDD'))

                return {
                    url: url,
                    method: 'GET'
                }
            },
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data: result, meta} = await queryFulfilled

                    dispatch(setViewsAction(result))

                } catch(e: any) {
                    dispatch(setViewsAction([]))
                    dispatch(setErrorAction('View stat error'))
                }
            },
            transformResponse: (response: any) => {
                if (!response['items']) {
                    return [];
                }

                return response['items'].reduce((accum: IView[], cur: any) => {
                    const timeStamp = cur['timestamp']

                    accum.push({
                        count: cur['views'],
                        date:  `${timeStamp[6]}${timeStamp[7]}/${timeStamp[4]}${timeStamp[5]}/${timeStamp[0]}${timeStamp[1]}${timeStamp[2]}${timeStamp[3]}`
                    })
                    return accum;
                }, [])
            },
        }),
        getRevisions: builder.mutation<IRevision[], string>({
            query: (slug) => {
                const url = endpoints.getRevisions.replace('{slug}', slug)

                return {
                    url: url,
                    method: 'GET'
                }
            },
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data: result, meta} = await queryFulfilled

                    dispatch(setRevisionsAction(result))

                } catch(e: any) {
                    dispatch(setRevisionsAction([]))
                    dispatch(setErrorAction('Revisions error'))
                }
            },
            transformResponse: (response: any) => {
                if (!response['revisions']) {
                    return [];
                }

                return response['revisions'].slice(0, 10).reduce((accum: IRevision[], cur: any) => {
                    const timeStamp = cur['timestamp']

                    accum.push({
                        id: cur['id'],
                        date: moment(cur['timestamp'], moment.defaultFormat).format('hh:mm:ss DD/MM/YYYY'),
                        username: cur['user']['name'],
                        size: cur['size'],
                        changeSize: cur['delta'],
                    })
                    return accum;
                }, [])
            },
        }),
        getRevision: builder.mutation<string[], number>({
            query: (id) => {
                const url = endpoints.getRevision.replace('{id}', `${id}`)

                return {
                    url: url,
                    method: 'GET',
                }
            },
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                try {
                    const {data: result, meta} = await queryFulfilled

                    dispatch(setRevisionAction(result))

                } catch(e: any) {
                    dispatch(setErrorAction('Revision error'))
                }
            },
        }),
    })
})