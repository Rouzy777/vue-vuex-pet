import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      todos: [],
      doneTodos: []
  },
  mutations: {
      showTodos(state, todos) {
          todos[0] !== null ? state.todos = todos[0] : false
          todos[1] !== null ? state.doneTodos = todos[1] : false
      },
      mutateTodos(state, todo) {
          state.todos.push(todo)
          localStorage.setItem('todos', JSON.stringify(state.todos))
      },
      mutateDoneTodos(state, index) {
          state.doneTodos.unshift(state.todos[index])
          state.todos.splice(index, 1)
          localStorage.setItem('todos', JSON.stringify(state.todos))
          localStorage.setItem('doneTodos', JSON.stringify(state.doneTodos))
      },
      mutateDeleteTask(state, fromAndIndex) {
          state[fromAndIndex[0]].splice(fromAndIndex[1], 1)
          localStorage.setItem(fromAndIndex[0], JSON.stringify(state[fromAndIndex[0]]))
      },
      mutateRestoreTask(state, index) {
          state.todos.push(state.doneTodos[index])
          state.doneTodos.splice(index, 1)
          localStorage.setItem('todos', JSON.stringify(state.todos))
          localStorage.setItem('doneTodos', JSON.stringify(state.doneTodos))
      },
      mutateTask(state, data) {
          state.todos[data.index].date = data.date
          state.todos[data.index].description = data.description
          localStorage.setItem('todos', JSON.stringify(state.todos))
      }
  },
  actions: {
      fetchTodos({commit}, todos) {
          commit('showTodos', todos)
      },
      addTask({commit}, task) {
          commit('mutateTodos', task)
      },
      doneTask({commit}, index) {
          commit('mutateDoneTodos', index)
      },
      deleteTask({commit}, fromAndIndex) {
          commit('mutateDeleteTask', fromAndIndex)
      },
      restoreTask({commit}, index) {
          commit('mutateRestoreTask', index)
      },
      editTask({commit}, data) {
          commit('mutateTask', data)
      }
  }
})
