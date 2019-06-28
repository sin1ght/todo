<template>
    <div class="todo-list-page">
        <Dropdown trigger="contextMenu" v-for="item in todoListByCategory(activeCategoryId).uncheckTodos" :key="item.id" @on-click="handleDropdownClick(item,$event)">
            <TodoListItem :item="item"/>
            <DropdownMenu slot="list">
                <DropdownItem name="rename">重命名</DropdownItem>
                <DropdownItem name="delete">删除</DropdownItem>
            </DropdownMenu>
        </Dropdown>

        <Dropdown trigger="contextMenu" v-for="item in todoListByCategory(activeCategoryId).checkTodos" :key="item.id" @on-click="handleDropdownClick(item,$event)">
            <TodoListItem :item="item"/>
            <DropdownMenu slot="list">
                <DropdownItem name="rename">重命名</DropdownItem>
                <DropdownItem name="delete">删除</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <!-- <TodoListItem v-for="item in todoListByCategory(activeCategoryId).uncheckTodos" :key="item.id" :item="item"/> -->
        <!-- <TodoListItem v-for="item in todoListByCategory(activeCategoryId).checkTodos" :key="item.id" :item="item"/> -->
    
        <footer class="action">
            <i class="fa fa-send-o"></i>
            <p @click="newTodoModal=!newTodoModal">新建todo</p>
        </footer>

        <!-- 新建todo modal -->
        <Modal
            v-model="newTodoModal"
            title="新建Todo"
            @on-ok="addNewTodo">
            <Input v-model="newTodoTitle" placeholder="输入todo标题"/>
        </Modal>
    </div>
</template>

<script>
import TodoListItem from './TodoListItem'
import {mapGetters, mapState, mapActions} from 'vuex'
import {Todo} from '../../model'

export default {
  name: 'todo-list-page',
  components: {
    TodoListItem
  },
  data () {
    return {
      newTodoModal: false,
      newTodoTitle: ''
    }
  },
  computed: {
    ...mapState(['activeCategoryId']),
    ...mapGetters(['todoListByCategory'])
  },
  methods: {
    ...mapActions(['postTodo', 'removeTodo']),
    addNewTodo () {
      if (this.activeCategoryId === -1) {
        // 没有选择分类
        this.$Message.error({
          content: '请选择分类或者新建分类',
          duration: 2
        })
        return
      }
      let newTodo = new Todo(this.activeCategoryId, this.newTodoTitle)
      this.postTodo({todo: newTodo})
    },
    handleDropdownClick (item, name) {
      console.log('DropdownItemClick', item, name)
      if (name === 'delete') {
        this.removeTodo({id: item.id, _rev: item._rev})
      }
    }

  }
}
</script>


<style lang="scss">
.todo-list-page{
    width: 100%;
    height: 100%;
    border-right: 1px solid #e4e3e3;
    position: relative;

    .action{
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0;
        padding: 10px;

        p{
            margin-left: 10px;
            cursor: pointer;
        }
    }

    .ivu-dropdown{
        display: block;
    }
}
</style>

