<template>
  <div class="component">
    <img
      class="shadow cover-size"
      :src="searchBook.imageLinks.thumbnail"
      alt=""
    />
  </div>
</template>


<script>
export default {
  props: {
    searchBook: {
      type: Object,
      required: true
    }

  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.cover-size {
  height: 300px;
  width: 200px;
}
</style>