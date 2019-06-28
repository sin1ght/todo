import {todoDB} from '../db'

// 添加todo
export const addTodo = async (todo) => {
  console.log('api addTodo', todo)
  let res = await todoDB.post(todo)
  return res
}

// 获取所有todo
export const getTodos = async () => {
  let docs = await todoDB.allDocs({include_docs: true})
  console.log('api getTodos', docs)
  return docs
}

// 删除todo {id,_rev}
export const deleteTodo = async (payload) => {
  console.log('api deleteTodo', payload)
  let response = await todoDB.remove(payload.id, payload._rev)
  return response
}

// 更新todo
export const updateTodo = async (newTodo) => {
  console.log('api updateTodo', newTodo)
  let res = await todoDB.put(newTodo)
  return res
}
