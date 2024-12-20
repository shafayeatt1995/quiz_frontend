<template>
  <div class="py-10">
    <h2 class="text-2xl font-bold">Recent created quiz</h2>
    <div class="flex flex-col justify-center items-center min-h-60">
      <BookOpenIcon :size="100" class="text-indigo-500" />
      <p>No recent quiz created</p>
    </div>
  </div>
</template>

<script>
import { BookOpenIcon } from "lucide-vue-next";

export default {
  name: "DashboardRecentExams",
  components: { BookOpenIcon },
};
</script>
