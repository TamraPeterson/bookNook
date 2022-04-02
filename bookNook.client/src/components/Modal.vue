<template>
  <div
    class="modal fade"
    id="form-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div
      class="
        modal-dialog
        bg-parchment
        d-flex
        flex-column
        align-items-end
        p-2
        rounded-2
      "
      role="document"
    >
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
      <div class="modal-content">
        <div class="modal-header bg-parchment">
          <h5 class="modal-title">
            <slot name="modal-title"> <!--title slot --></slot>
          </h5>
        </div>
        <div class="modal-body bg-parchment">
          <slot name="modal-body"><!--body slot --></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>