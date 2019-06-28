/**
 * 根据categoryid获取对应的todoList
 * check和未check的分开
 * @param {object} state
 */
export const todoListByCategory = (state) => (categoryId) => {
  let checkTodos = state.todoList.filter((val) => {
    return val.categoryId === categoryId && val.isCheck
  })
  let uncheckTodos = state.todoList.filter((val) => {
    return val.categoryId === categoryId && !val.isCheck
  })

  return {
    checkTodos,
    uncheckTodos
  }
}

// 根据todoid获取todo
export const todoById = (state) => (todoId) => {
  if (todoId === -1) {
    return null
  }
  return state.todoList.find((val) => val.id === todoId)
}

// 分割category成 置顶组和非置顶组
export const divideCategorys = (state) => {
  let isTopData = state.categorys.filter((val) => val.isTop).sort((o1, o2) => o2.topSetAt - o1.topSetAt)
  let notTopData = state.categorys.filter((val) => !val.isTop).sort((o1, o2) => o2.createAt - o1.createAt)

  return {
    isTopData,
    notTopData
  }
}
