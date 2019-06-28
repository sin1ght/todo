import {categoryDB} from '../db'

// 获取所有分类
export const getCategorys = async () => {
  let docs = await categoryDB.allDocs({include_docs: true})
  console.log('api getCategorys', docs)
  return docs
}

// 添加新的分类
export const addCategory = async (category) => {
  console.log('api addCategory', category)
  let response = await categoryDB.post(category)
  return response
}

// 删除分类
export const deleteCategory = async (payload) => {
  console.log('api deleteCategory', payload)
  let response = await categoryDB.remove(payload.id, payload._rev)
  return response
}

// 更新分类
export const updateCategory = async (newCategory) => {
  console.log('api updateCategory', newCategory)
  let res = await categoryDB.put(newCategory)
  return res
}
