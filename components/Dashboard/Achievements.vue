<template>
  <div>
    <div class="flex justify-between">
      <h2 class="text-lg font-bold">Achievements</h2>
      <button class="text-sm">View all</button>
    </div>
    <div class="flex flex-col justify-center items-center min-h-40">
      <TrophyIcon :size="50" class="text-gray-600" />
      <p class="text-center">You have no achievement</p>
    </div>
  </div>
</template>

<script>
import { TrophyIcon } from "lucide-vue-next";
export default {
  name: "DashboardAchievements",
  components: { TrophyIcon },
};
</script>
