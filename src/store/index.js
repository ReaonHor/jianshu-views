import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          // 只储存state中的assessmentData
          username: val.username,
          avatar: val.avatar,
        }
      },
    }),
  ],
  state: {
    username: "",
    avatar: "",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsIl9pZCI6IjYzODQ3MWVlOTE2MWQ1ZTYxMjBiZWM4NyIsImlhdCI6MTY2OTc4OTcxNCwiZXhwIjoxNjcwMzk0NTE0fQ.v-mH2DlmZLSMfvxY87IjR7wLz3tbiKNERqQFfAeXvEE",
  },
  getters: {},
  mutations: {
    getToken(state, token) {
      state.token = token
    },
    getUsername(state, user) {
      state.username = user
    },
    getAvatar(state, avatar) {
      state.avatar = avatar
    },
  },
  actions: {
    //获取该用户的资料
  },
  modules: {},
})
