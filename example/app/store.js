/**
 * Created by yangjiankang on 4/22/16.
 */




const value = {
    count: 0
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by middlewares
// for debugging purposes.
const mutations = {
    INCREMENT (state) {
        state.count++
    },
    DECREMENT (state) {
        state.count--
    }
}


export default new Vuex.Store({
    value,
    mutations
})
