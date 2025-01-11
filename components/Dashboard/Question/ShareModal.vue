<template>
  <Sheet @update:open="val = false" :open="val">
    <SheetContent side="right" class="w-full">
      <SheetHeader>
        <SheetTitle>Share exam url</SheetTitle>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>

<script>
export default {
  name: "DashboardQuestionShareModal",
  props: {
    value: { type: Boolean, default: false },
  },
  data() {
    return {
      val: this.value,
    };
  },
  watch: {
    value(newVal) {
      this.val = newVal;
    },
    val(newVal) {
      this.$emit("update:value", newVal);
    },
  },
};
</script>
