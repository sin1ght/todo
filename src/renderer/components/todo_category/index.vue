<template>
    <div class="todo-category-page">
        <Dropdown trigger="contextMenu" v-for="item in [].concat(divideCategorys.isTopData,divideCategorys.notTopData)" :key="item.id" @on-click="handleDropdownClick(item,$event)">
            <CategoryListItem  :item="item"/>
            <DropdownMenu slot="list">
                <DropdownItem name="rename">重命名</DropdownItem>
                <DropdownItem name="toggleIsTop" v-if="item.isTop">取消置顶</DropdownItem>
                <DropdownItem name="toggleIsTop" v-else>置顶</DropdownItem>
                <DropdownItem name="delete">删除</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <!-- <CategoryListItem v-for="item in categorys" :key="item.id" :item="item"/> -->
        
        <footer class="action">
            <i class="fa fa-bars"></i>
            <p @click="openNewCategoryModalBtnClick">新建分类</p>
        </footer>

        <!-- 新建分类modal -->
        <Modal
            v-model="newCategoryModal"
            @on-ok="addNewCategory"
            title="新建Todo分类">
            <Input v-model="newCategoryTitle" placeholder="输入分类标题"/>
        </Modal>
    </div>
</template>

<script>
import CategoryListItem from './CategoryListItem'
import {mapState, mapActions, mapGetters} from 'vuex'
import {formatDateTime} from '../../utils'
import {Category} from '../../model'

export default {
  name: 'todo-category-page',
  components: {
    CategoryListItem
  },
  data () {
    return {
      newCategoryModal: false,
      newCategoryTitle: ''
    }
  },
  computed: {
    ...mapState({
      categorys: state => state.categorys
    }),
    ...mapGetters(['divideCategorys'])
  },
  methods: {
    ...mapActions(['postCategory', 'removeCategory', 'renewCategory']),
    addNewCategory () { //  添加新的分类
      let newCategory = new Category(this.newCategoryTitle)
      this.postCategory({category: newCategory})
    },
    handleDropdownClick (item, name) {
      console.log('DropdownItemClick', item, name)
      if (name === 'delete') {
        this.removeCategory({id: item.id, _rev: item._rev})
      } else if (name === 'toggleIsTop') {
        this.renewCategory({
          newCategory: Object.assign({}, item, { isTop: !item.isTop, topSetAt: Date.now() }),
          changeKey: 'isTop'
        })
      }
    },
    openNewCategoryModalBtnClick () {
      this.newCategoryModal = !this.newCategoryModal
      this.newCategoryTitle = formatDateTime(Date.now())
    }
  }
}
</script>

<style lang="scss">
.todo-category-page{
    width: 100%;
    height: 100%;
    background:#fafafa;
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
