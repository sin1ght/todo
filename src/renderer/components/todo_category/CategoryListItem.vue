<template>
    <div class="category-list-item" :class="{'active-category-list-item':activeCategoryId==item.id}"
    @click="chooseCategory({id:item.id})">
        <i class="fa fa-tag"></i>
        <p>{{ item.title }}</p>
        <i class="fa fa-bookmark" v-if="item.isTop"></i>
    </div>    
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'category-list-item',
  props: [ 'item' ],
  computed: {
    ...mapState({
      activeCategoryId: state => state.activeCategoryId
    })
  },
  methods: {
    ...mapMutations({
      chooseCategory: 'CHOOSE_CATEGORY'
    })
  }
}
</script>

<style lang="scss">
.category-list-item{
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    p{
        margin-left: 10px;
        width: 80%;
    }

    &:hover{
        background:rgba(234, 234, 234, 0.84);
    }    
}

.active-category-list-item{
    background:rgba(234, 234, 234, 0.84);
}
</style>
