<template>
  <div>
    <div class="flex justify-end">
      <Button class="w-full md:w-auto" @click="modal = true"
        ><PlusIcon /> Create new quiz</Button
      >
    </div>
    <Sheet @update:open="modal = false" :open="modal">
      <SheetContent side="right" class="w-full md:max-w-[850px] p-0">
        <div class="p-2 max-h-full flex flex-col">
          <SheetHeader>
            <SheetTitle>Create new quiz</SheetTitle>
          </SheetHeader>
          <div class="flex-1 overflow-y-auto"></div>
          <div class="flex justify-end">
            <Button>Ami anik</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script>
import { PlusIcon } from "lucide-vue-next";

export default {
  name: "DashboardQuizForm",
  components: { PlusIcon },
  data() {
    return {
      modal: false,
      errors: {},
    };
  },
};
</script>
