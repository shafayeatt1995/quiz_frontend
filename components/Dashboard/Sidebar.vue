<template>
  <template
  v-for="(url, i) in urls"
  >
  <NuxtLink
  :to="url.to"
  class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:text-gray-800 sidebar-menu text-base font-medium"
  v-if="url.active ?? true"
  :key="i"
    >
    <component :is="url.icon" class="h-4 w-4" />
    {{ url.label }}
  </NuxtLink>
</template>
</template>

<script>
import {
  BookOpenCheckIcon,
  ScrollText,
} from "lucide-vue-next";

export default {
  name: "DashboardSidebar",
  data() {
    return {
      urls: [
        {
          label: "Quiz",
          to: { name: "dashboard-quiz" },
          icon: BookOpenCheckIcon,
        },
        {
          label: "Blog",
          to: { name: "dashboard-blog" },
          icon: ScrollText ,
          active: true,
        },
      ],
    };
  },
};
</script>

<style scoped>
.sidebar-menu.router-link-exact-active {
  @apply bg-gray-800 text-primary-foreground shadow hover:bg-gray-700;
}
</style>
