<template>
  <Dashboard>
    <div
      class="bg-white shadow-md rounded-xl py-4 md:px-4 px-2 max-w-3xl mx-auto"
    >
      <DashboardQuestionForm @refetch="refetch" />
    </div>
  </Dashboard>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    refetch() {
      this.$route.push({ name: "dashboard-question" });
    },
  },
};
</script>
