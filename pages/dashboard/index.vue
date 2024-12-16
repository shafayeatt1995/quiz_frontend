<template>
  <Dashboard>
    <div class="flex gap-7">
      <div class="bg-white flex-1 rounded-xl p-4">
        <DashboardIntro />
        <DashboardRecentExams />
      </div>
      <div class="w-80 bg-white rounded-xl p-4">
        <DashboardAchievements />
      </div>
    </div>
  </Dashboard>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>
