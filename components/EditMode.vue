<template>
  <form
    v-if="edit"
    class="w-full flex items-center gap-1"
    @submit.prevent="saveEdit"
  >
    <Input v-model="val" class="w-full h-8 text-gray-800" ref="inp" />
    <Button type="submit" class="size-8"><CheckIcon /></Button>
    <Button type="button" @click="cancelEdit" class="size-8" variant="rose">
      <XIcon />
    </Button>
  </form>
  <div class="flex gap-1 items-center" v-else>
    <component :is="tag" @click="setEdit" class="w-full">{{
      modelValue
    }}</component>
    <TooltipProvider v-if="showEdit">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            type="button"
            class="size-8"
            @click="setEdit"
            variant="outline"
          >
            <FilePenLineIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>

<script>
import { CheckIcon, FilePenLineIcon, XIcon } from "lucide-vue-next";

export default {
  components: { CheckIcon, XIcon, FilePenLineIcon },
  props: {
    tag: {
      type: String,
      default: "span",
    },
    modelValue: {
      type: String,
      default: "",
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      edit: false,
      val: this.modelValue,
      reset: this.modelValue,
    };
  },
  watch: {
    modelValue(newVal) {
      this.val = newVal;
    },
    val(newVal) {
      this.$emit("update:modelValue", newVal);
    },
  },
  methods: {
    setEdit() {
      try {
        if (this.showEdit) {
          this.edit = true;
          this.reset = this.val;
          this.$nextTick(() => {
            this.$refs.inp.$el.focus();
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    saveEdit() {
      this.edit = false;
      this.reset = this.val;
    },
    cancelEdit() {
      this.val = this.reset;
      this.edit = false;
    },
  },
};
</script>
