export const Category = function (title) {
  this.isTop = false
  this.topSetAt = null
  this.title = title
  this.createAt = Date.now()
}

export const Todo = function (categoryId, title) {
  this.categoryId = categoryId
  this.title = title
  this.createAt = Date.now()
  this.isCheck = false
  this.detail = ''
}
