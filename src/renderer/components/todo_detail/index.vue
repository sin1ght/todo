<template>
    <div  class="todo-detail-page" v-if="todoById(activeTodoId)">
        <div class="todo-detail-page-title">{{formatDateTime(todoById(activeTodoId).createAt,'yyyy年MM月DD HH:mm')}}</div>
        <div class="todo-detail-page-content">
            <textarea :value="todoById(activeTodoId).detail" @keyup="textareaChange"></textarea>
        </div>
    </div>
    <div v-else class="not-found-page">
        <div></div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import {formatDateTime} from '../../utils'

export default {
  name: 'todo-detail-page',
  computed: {
    ...mapState(['activeTodoId']),
    ...mapGetters(['todoById'])
  },
  data () {
    return {
      updateTodoDetailWrapper: () => {}
    }
  },
  created () {
    this.updateTodoDetailWrapper = this.fnDebounce(this.updateTodoDetail, 0.5)
  },
  methods: {
    ...mapActions(['renewTodo']),
    formatDateTime,
    textareaChange () {
      this.updateTodoDetailWrapper()
    },
    fnDebounce (fn, seconds) {
    //   let prev = null
    //   let curr = null
    //   return function () {
    //     curr = Date.now()
    //     if (prev) {
    //       if (curr - prev > seconds * 1000) {
    //         fn()
    //       }
    //     }
    //     prev = curr
    //   }
      let timer = null
      return function () {
        if (timer) {
          clearTimeout(timer)
          // timer = null
        }
        timer = setTimeout(fn, seconds * 10000)
      }
    },
    updateTodoDetail () {
      let detail = document.querySelector('textarea').value
      console.log(detail)
      this.renewTodo({
        newTodo: Object.assign({}, this.todoById(this.activeTodoId), {detail}),
        changeKey: 'detail'
      })
    }
  }
}
</script>


<style lang="scss">

.todo-detail-page{
    width: 100%;
    height: 100%;

    .todo-detail-page-title{
        text-align: center;
        padding: 10px;
    }

    .todo-detail-page-content{
        padding: 10px;

        textarea{
            width: 100%;
            color: #515a6e;
            font-size: 14px;
            padding: 4px 7px;
            height: 85vh;
            border: none;
            outline: none;
            resize: none;
            background: none;
        }
    }
}

.not-found-page{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items:center;

    >div{
        background: no-repeat center;
        width: 100px;
        height: 100px;
        //background-image: url("../../assets/error.gif") ;
        background-size:contain;
        // width:100%;
        // height: 90%;

        // animation: cat_dead 3s infinite steps(1,end)
    }
}
</style>
