import { createSlice } from '@reduxjs/toolkit';

export interface CarState {
    make: string,
    model: string,
    year: number,
    color: string,
}

const initialState: CarState = {
    make: 'empty car state',
    model: '',
    year: 0,
    color: ''
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseMake: (state, action) => { state.make = action.payload },
        chooseModel: (state, action) => { state.model = action.payload },
        chooseYear: (state, action) => { state.year = action.payload },
        chooseColor: (state, action) => { state.color = action.payload }
    }
})

export const reducer = rootSlice.reducer;
export const {
    chooseMake,
    chooseModel,
    chooseYear,
    chooseColor
} = rootSlice.actions;