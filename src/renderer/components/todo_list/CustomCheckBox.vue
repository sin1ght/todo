<template>
    <div class="custom-check-box">
        <i v-if="!isCheck" class="fa fa-square-o"></i>
        <i v-if="isCheck" class="fa fa-check-square-o checked-check-box"></i>
    </div>
</template>

<script>
export default {
  name: 'custom-check-box',
  props: ['isCheck']
}
</script>

<style lang="scss">
.custom-check-box{
    cursor: pointer;
    display: inline-block;
}

.checked-check-box{
    color: #b9b6b6;
}
</style>

