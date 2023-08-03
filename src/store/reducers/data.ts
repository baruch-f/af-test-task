import { createReducer } from '@reduxjs/toolkit'
import { setContents, setError, setLoading } from '../actions/data'
import { User } from '../../types/mockapi'

interface DataReducer {
    contents: User[];
    loading: boolean;
    error: string;
}

const initialState: DataReducer = {
    contents: [],
    loading: false,
    error: ''
}

const dataReducer = createReducer<DataReducer>(initialState, (builder) => {
    builder.addCase(setContents, (state, action) => {
        state.contents = action.payload
    })
    builder.addCase(setLoading, (state, action) => {
        state.loading = action.payload
    })
    builder.addCase(setError, (state, action) => {
        state.error = action.payload
    })
})

export default dataReducer
