<template>
  <div class="flex flex-col md:flex-row items-center md:gap-5 gap-3">
    <div class="w-24">
      <img
        :src="authUser.avatar"
        :alt="authUser.name"
        class="w-24 h-auto rounded-xl"
      />
    </div>
    <div class="flex-1">
      <div class="flex flex-col-reverse md:flex-row items-center">
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-center md:text-left">
            {{ authUser.name }}
          </h2>
          <p class="text-gray-500 text-center md:text-left">
            {{ authUser.email }}
          </p>
        </div>
        <p class="text-green-500 lg:text-base text-sm">Professional</p>
      </div>
      <div class="grid lg:grid-cols-3 grid-cols-2 gap-5">
        <div class="flex items-center gap-2">
          <div class="p-2 bg-white shadow rounded-md">
            <ClipboardPenLineIcon size="30" class="text-indigo-500" />
          </div>
          <div>
            <p class="font-bold text-xl">27</p>
            <p class="text-xs">Quiz created</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="p-2 bg-white shadow rounded-md">
            <CircleCheckBigIcon :size="30" class="text-green-500" />
          </div>
          <div>
            <p class="font-bold text-xl">2700</p>
            <p class="text-xs">Question created</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="p-2 bg-white shadow rounded-md">
            <ClockIcon :size="30" class="text-indigo-500" />
          </div>
          <div>
            <p class="font-bold text-xl">27000</p>
            <p class="text-xs">Student attempted</p>
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
