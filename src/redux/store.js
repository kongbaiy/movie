import { legacy_createStore as createStore } from 'redux';

const initalState = {
    token: null
};

export const reducers = (state = initalState, action) => {
    const newState = { ...state };
    const { type, data } = action;

    switch (type) {
        case 'SET_TOKEN':
            newState.token = data?.token;
            return newState
        default:
            return state
    }
}
const store = createStore(reducers);

export default store;