<template>
  <Dashboard>
    <div class="flex flex-col xl:flex-row gap-7">
      <div class="bg-white shadow-md flex-1 rounded-xl py-4 md:px-4 px-2">
        <DashboardIntro />
        <DashboardRecentExams />
      </div>
      <div class="xl:w-80 w-full bg-white shadow-md rounded-xl p-4">
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
