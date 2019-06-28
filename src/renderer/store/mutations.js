import * as types from './mutation-types'
import Vue from 'vue'

export const mutations = {
  // 选择查看的分类
  [types.CHOOSE_CATEGORY] (state, payload) {
    state.activeCategoryId = payload.id
    state.activeTodoId = -1
    // 将查看的todo设置为此分类的todoList的第一个
    // let todos = state.todoList.filter((val) => val.categoryId === payload.id)
    // let checkTodos = todos.filter((val) => val.isCheck)
    // let uncheckTodos = todos.filter((val) => !val.isCheck)

    // if (uncheckTodos.length) { // 首选项 展示未check的todo详情
    //   state.activeTodoId = uncheckTodos[0].id
    // } else if (checkTodos.length) {
    //   state.activeTodoId = checkTodos[0].id
    // } else {
    //   state.activeTodoI = -1
    // }
  },

  // 添加分类 从db中获取的 或者 新添加的
  [types.ADD_CATEGORY] (state, payload) {
    state.categorys = state.categorys.concat(payload.categorys) // 添加多个或者单个
  },

  // 删除分类
  [types.DELETE_CATEGORY] (state, payload) {
    let index = state.categorys.findIndex((val) => val.id === payload.id)
    if (index !== -1) {
      state.categorys.splice(index, 1)
    } else {
      console.log('DELETE_CATEGORY mutation 失败,id为负数', payload)
    }
  },

  // 更新分类的_rev
  [types.UPDATE_REV_CATEGORY] (state, payload) {
    let index = state.categorys.findIndex((val) => val.id === payload.id)
    Vue.set(state.categorys[index], '_rev', payload._rev)
  },

  // 切换分类isTop状态 更新topSetAt
  [types.TOGGLE_TOP_CATEGORY] (state, payload) {
    let index = state.categorys.findIndex((val) => val.id === payload.id)
    Vue.set(state.categorys[index], 'isTop', !state.categorys[index]['isTop'])
    Vue.set(state.categorys[index], 'topSetAt', payload.topSetAt)
  },

  // 切换todo的isCheck状态
  [types.TOGGLE_TODO_CHECK] (state, payload) {
    let index = state.todoList.findIndex((val) => val.id === payload.id)
    Vue.set(state.todoList[index], 'isCheck', !state.todoList[index]['isCheck'])
  },

  // 更新todo的_rev
  [types.UPDATE_REV_TODO] (state, payload) {
    let index = state.todoList.findIndex((val) => val.id === payload.id)
    Vue.set(state.todoList[index], '_rev', payload._rev)
  },

  // 更新todo的detail {id,detail}
  [types.UPDATE_DETAIL_TODO] (state, payload) {
    let index = state.todoList.findIndex((val) => val.id === payload.id)
    Vue.set(state.todoList[index], 'detail', payload.detail)
  },

  // 选择查看的todo
  [types.CHOOSE_TODO] (state, payload) {
    state.activeTodoId = payload.id
  },

  // 添加todo 从db中获取的 或者 新添加的
  [types.ADD_TODO] (state, payload) {
    state.todoList = state.todoList.concat(payload.todos) // 添加多个或者单个
  },

  // 删除todo
  [types.DELETE_TODO] (state, payload) {
    let index = state.todoList.findIndex((val) => val.id === payload.id)
    if (index !== -1) {
      state.todoList.splice(index, 1)
    } else {
      console.log('DELETE_TODO mutation 失败,id为负数', payload)
    }
  }
}
