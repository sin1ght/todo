<template>
    <div class="todo-list-item" @click.stop="chooseTodo({id:item.id})" :class="{'avtive-todo-list-item':activeTodoId==item.id}">
        <CustomCheckbox :isCheck="item.isCheck" @click.native.stop="checkBoxBtnClick"/>
        <span v-if="!item.isCheck">{{item.title}}</span>
        <span v-if="item.isCheck" class="finished-todo-list-item"><del>{{item.title}}</del></span>
    </div>
</template>

<script>
import CustomCheckbox from './CustomCheckBox'

import {mapMutations, mapState, mapActions} from 'vuex'

export default {
  name: 'todo-list-item',
  props: ['item'],
  components: {
    CustomCheckbox
  },
  computed: {
    ...mapState({
      activeTodoId: state => state.activeTodoId
    })
  },
  methods: {
    ...mapMutations({
      toggleTodoCheck: 'TOGGLE_TODO_CHECK',
      chooseTodo: 'CHOOSE_TODO'
    }),
    ...mapActions(['renewTodo']),
    checkBoxBtnClick () { // isCheck 状态切换
      this.renewTodo({
        newTodo: Object.assign({}, this.item, {isCheck: !this.item.isCheck}),
        changeKey: 'isCheck'
      })
    }
  }
}
</script>


<style lang="scss">
.todo-list-item{
    padding: 10px;
    cursor: pointer;

    &:hover{
        background:rgba(247, 247, 247, 0.84);
    }
}

.finished-todo-list-item{
    color: #b9b6b6;
}

.avtive-todo-list-item{
    //background:rgba(234, 234, 234, 0.84);
}
</style>