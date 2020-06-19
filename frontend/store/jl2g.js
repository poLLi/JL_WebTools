export const state = () => ({
    socket: null,
    username: null
});

export const mutations = {
    setSocket(state, socket) {
        state.socket = socket;
    },
    setUsername(state, username) {
        state.username = username;
    }
}

export const getters = {
    getSocket(state) {
        return state.socket;
    },

    getUsername(state) {
        return state.username;
    }
}