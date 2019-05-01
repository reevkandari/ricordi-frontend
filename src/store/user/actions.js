/*
export function someAction (context) {
}
*/

export function loadProfile (context,payload) {
    for(var element in payload){
        context.commit(element+'Update', eval('payload.'+element));
    }
}