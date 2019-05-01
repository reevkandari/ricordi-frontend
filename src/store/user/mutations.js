/*
export function someMutation (state) {
}
*/


export function profileUpdate (state,payload) {
    state.profile = payload;
}

export function statsUpdate (state,payload) {
    state.stats = payload;
}

export function followingUpdate(state,payload) {
    state.following = payload;
}
