import * as types from './mutation-types'
import {getCategorys, addCategory, deleteCategory, updateCategory} from '../api/category'
import {addTodo, getTodos, deleteTodo, updateTodo} from '../api/todo'

// 获取所有分类
export const fetchCategorys = ({commit, dispatch}) => {
  getCategorys().then((docs) => {
    let data = []
    let isTopCategorys = []
    let notTopCategorys = []

    for (let row of docs.rows) {
      let n = {
        id: row.id,
        ...row.doc
      }

      if (row.doc.isTop) {
        isTopCategorys.push(n)
      } else {
        notTopCategorys.push(n)
      }
    }
    isTopCategorys.sort((o1, o2) => o2.topSetAt - o1.topSetAt)
    notTopCategorys.sort((o1, o2) => o2.createAt - o1.createAt)
    data = [].concat(isTopCategorys, notTopCategorys)

    commit(types.ADD_CATEGORY, {categorys: data})
    console.log('fetchCategorys Action', data)

    // 设置初始选择的分类 选择最新置顶的分类或者最新的普通分类
    dispatch('chooseTopCategory')
    // let activeCategoryId = -1
    // if (isTopCategorys.length) {
    //   activeCategoryId = isTopCategorys[0].id
    // } else if (notTopCategorys.length) {
    //   activeCategoryId = notTopCategorys[0].id
    // }
    // console.log('istop', isTopCategorys)
    // console.log('nottop', notTopCategorys)
    // commit(types.CHOOSE_CATEGORY, {id: activeCategoryId})
  })
}

// 设置初始选择的分类 选择最新置顶的分类或者最新的普通分类
export const chooseTopCategory = ({commit, state}) => {
  let isTopData = state.categorys.filter((val) => val.isTop).sort((o1, o2) => o2.topSetAt - o1.topSetAt)
  let notTopData = state.categorys.filter((val) => !val.isTop).sort((o1, o2) => o2.createAt - o1.createAt)

  let activeCategoryId = -1
  if (isTopData.length) {
    activeCategoryId = isTopData[0].id
  } else if (notTopData.length) {
    activeCategoryId = notTopData[0].id
  }
  commit(types.CHOOSE_CATEGORY, {id: activeCategoryId})
}

// 添加新的分类
export const postCategory = ({commit, dispatch}, payload) => {
  addCategory(payload.category).then((response) => {
    commit(types.ADD_CATEGORY, {categorys: {id: response.id, ...payload.category}})
    console.log('postCategory Action', response)

    dispatch('chooseTopCategory')
  })
}

// 删除分类
export const removeCategory = ({commit, dispatch, state}, payload) => {
  deleteCategory(payload).then((res) => {
    // 要同时删除此分类下的所有todo
    let todos = state.todoList.filter((val) => val.categoryId === res.id)
    for (let todo of todos) {
      dispatch('removeTodo', todo)
    }

    commit(types.DELETE_CATEGORY, {id: res.id})
    console.log('removeCategory Action', res)

    dispatch('chooseTopCategory')
  })
}

/**
 * 更新分类
 * @param {*} payload {newCategory,changeKey}
 */
export const renewCategory = ({commit, dispatch}, payload) => {
  updateCategory(payload.newCategory).then((res) => {
    console.log('renewCategory Action', res)
    if (payload.changeKey === 'isTop') {
      // 切换isTop值 更新topSetAt
      commit(types.TOGGLE_TOP_CATEGORY, {id: res.id, topSetAt: payload.newCategory.topSetAt})

      dispatch('chooseTopCategory')
    }
    // 更新_rev
    commit(types.UPDATE_REV_CATEGORY, {id: res.id, _rev: res.rev})
  })
}

/**
 * 更新todo
 * @param {*} payload {newTodo,changeKey}
 */
export const renewTodo = ({commit}, payload) => {
  updateTodo(payload.newTodo).then((res) => {
    console.log('renewTodo Action', res)
    if (payload.changeKey === 'isCheck') {
      // 切换isCheck值
      commit(types.TOGGLE_TODO_CHECK, {id: res.id})
    } else if (payload.changeKey === 'detail') {
      // 更新detail
      commit(types.UPDATE_DETAIL_TODO, {id: res.id, detail: payload.newTodo.detail})
    }
    // 更新_rev
    commit(types.UPDATE_REV_TODO, {id: res.id, _rev: res.rev})
  })
}

// 添加新的todo
export const postTodo = ({commit}, payload) => {
  addTodo(payload.todo).then((res) => {
    commit(types.ADD_TODO, {todos: {id: res.id, ...payload.todo}})
    console.log('postTodo Action', res)
  })
}

// 获取所有todo
export const fetchTodos = ({commit}) => {
  getTodos().then((docs) => {
    let data = []

    for (let row of docs.rows) {
      data.push({
        id: row.id,
        ...row.doc
      })
    }

    commit(types.ADD_TODO, {todos: data})
    console.log('fetchTodos Action', data)
  })
}

// 删除todo
export const removeTodo = ({commit}, payload) => {
  deleteTodo(payload).then((res) => {
    commit(types.DELETE_TODO, {id: res.id})
    console.log('removeTodo Action', res)
  })
}
