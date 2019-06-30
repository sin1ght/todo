<template>
  <div id="app">
    <div class="app-content">
        <div>
            <TodoCategoryPage/>
        </div>
        <div>
            <div><TodoListPage/></div>
            <div><TodoDetailPage/></div>
        </div>
    </div>
  </div>
</template>

<script>
import TodoCategoryPage from './components/todo_category'
import TodoListPage from './components/todo_list'
import TodoDetailPage from './components/todo_detail'

import {mapActions} from 'vuex'

export default {
  name: 'app',
  components: {
    TodoCategoryPage,
    TodoListPage,
    TodoDetailPage
  },
  created () {
    // 从数据库获取所有分类
    this.fetchCategorys()
    // 从数据库获取所有todo
    this.fetchTodos()
  },
  methods: {
    ...mapActions(['fetchCategorys', 'fetchTodos'])
  }

}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}

div{
    box-sizing: border-box;
}

#app {
    .app-content{
        display: flex;
        width: 100vw;
        height: 100vh;
        background: url("assets/bg.png") no-repeat  center;
        background-size: cover;

        >div{
            height: 100%;
            // border: 1px solid black;

            &:nth-child(1){
                width: 20%;
            }

            &:nth-child(2){
                width: 80%;
                display: flex;
                background:rgba(250, 250, 250, 0.32);

                >div{
                    height: 100%;

                    &:nth-child(1){
                        width: 40%;
                    }

                    &:nth-child(2){
                        width: 60%;
                    }

                }
            }
        }
    }
}
</style>
