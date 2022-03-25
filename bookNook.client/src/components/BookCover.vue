<template>
  <div class="component">
    <img
      data-bs-toggle="modal"
      data-bs-target="#bookDetails-modal"
      class="shadow cover-size rounded selectable"
      :src="searchBook.imageLinks.thumbnail"
      alt=""
    />
  </div>
  <Modal id="bookDetails-modal">
    <template #modal-title>{{ searchBook.title }}</template>
    <template #modal-body
      >Author: {{ searchBook.authors[0] }}
      {{ searchBook.description }}
    </template>
  </Modal>
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
  transition: 0.3s;
}
.cover-size:hover {
  transform: scale(1.1);
  transition: 0.3s;
}
</style>