<template>
  <div class="flex items-center gap-5">
    <div class="w-24">
      <img
        :src="authUser.avatar"
        :alt="authUser.name"
        class="w-24 h-auto rounded-xl"
      />
    </div>
    <div class="flex-1">
      <h2 class="text-2xl font-bold">{{ authUser.name }}</h2>
      <p class="text-gray-500">{{ authUser.email }}</p>
      <div class="flex gap-5">
        <div class="flex items-center gap-2">
          <div class="p-2 bg-white shadow rounded-md">
            <ClipboardPenLineIcon size="30" class="text-indigo-500" />
          </div>
          <div>
            <p class="font-bold text-xl">27</p>
            <p class="text-xs">Exam Attempted</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="p-2 bg-white shadow rounded-md">
            <CircleCheckBigIcon :size="30" class="text-green-500" />
          </div>
          <div>
            <p class="font-bold text-xl">2700</p>
            <p class="text-xs">Correct Answer</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="p-2 bg-white shadow rounded-md">
            <ClockIcon :size="30" class="text-indigo-500" />
          </div>
          <div>
            <p class="font-bold text-xl">27</p>
            <p class="text-xs">Hours Spent on Exam</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CircleCheckBigIcon,
  ClipboardPenLineIcon,
  ClockIcon,
} from "lucide-vue-next";

export default {
  name: "DashboardIntro",
  components: { ClipboardPenLineIcon, CircleCheckBigIcon, ClockIcon },
  computed: {
    authUser() {
      return useAuth().authUser.value;
    },
  },
};
</script>
