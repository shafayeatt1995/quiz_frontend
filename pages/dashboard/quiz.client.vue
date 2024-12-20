<template>
  <MetaHead title="Quiz Dashboard" description="This is quiz page" />
  <Dashboard>
    <div>
      <h1 class="md:text-4xl text-3xl font-bold">Quizes</h1>
      <div class="bg-white shadow-md flex-1 rounded-xl py-4 md:px-4 px-2">
        <DashboardQuizForm />
      </div>
    </div>
  </Dashboard>
</template>

<script>
export default {
  name: "quiz",
};
</script>
