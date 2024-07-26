import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import IView from "../../types/view";
import IRevision from "../../types/revision";

export type TSearchState = {
    views: IView[],
    revisions: IRevision[],
    revision: string[]
}

const initialState: TSearchState = {
    views: [],
    revisions: [],
    revision: []
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setViewsAction: (state, action: PayloadAction<IView[]>) => {
            state.views = action.payload
        },
        setRevisionsAction: (state, action: PayloadAction<IRevision[]>) => {
            state.revisions = action.payload
        },
        setRevisionAction: (state, action: PayloadAction<string[]>) => {
            state.revision = action.payload
        },
    }
})

export const {setViewsAction, setRevisionsAction, setRevisionAction} = searchSlice.actions
export default searchSlice.reducer