/*
export function someMutation (state) {
}
*/


export function logMeIn (state) {
    state.loggedIn = true;
    state.expire = Date.now() + (1500 * 1000);
}

export function logMeOut (state) {
    state.loggedIn = false;
    state.expire = Date.now() - 1;
}