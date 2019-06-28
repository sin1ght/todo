import PouchDB from 'pouchdb'

export const categoryDB = new PouchDB('category', {
  // adapter: 'leveldb'
})
export const todoDB = new PouchDB('todo', {
  // adapter: 'leveldb'
})

console.log(categoryDB.adapter)
