<template>
  <NuxtLink
    :to="url.to"
    class="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:text-gray-800 sidebar-menu"
    v-for="(url, i) in urls"
    :key="i"
  >
    <component :is="url.icon" class="h-4 w-4" />
    {{ url.label }}
  </NuxtLink>
</template>

<script>
import {
  LineChartIcon,
  PackageIcon,
  UsersIcon,
  ShoppingCartIcon,
  LayoutDashboardIcon,
  NotebookTextIcon,
  MessageCircleQuestionIcon,
} from "lucide-vue-next";

export default {
  name: "DashboardSidebar",
  components: {
    LineChartIcon,
    PackageIcon,
    UsersIcon,
    ShoppingCartIcon,
    LayoutDashboardIcon,
  },
  data() {
    return {
      urls: [
        {
          label: "Dashboard",
          to: { name: "dashboard" },
          icon: LayoutDashboardIcon,
        },
        {
          label: "Question",
          to: { name: "dashboard-question" },
          icon: MessageCircleQuestionIcon,
        },
        {
          label: "User manual",
          to: { name: "index" },
          icon: NotebookTextIcon,
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
