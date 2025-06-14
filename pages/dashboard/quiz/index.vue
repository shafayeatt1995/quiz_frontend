<template>
  <MetaHead title="Quiz Dashboard" description="This is quiz page" />
  <Dashboard>
    <div class="bg-muted/40 rounded-xl md:p-2">
      <div class="grid auto-rows-max items-start gap-4 xl:col-span-2">
        <Card>
          <CardHeader class="px-3">
            <CardTitle class="flex items-center justify-between gap-2">
              <p>Quiz</p>
              <DashboardQuizForm @refetch="refetch" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              v-if="!loading && items.length === 0"
              class="p-4 flex flex-col justify-center items-center min-h-60"
            >
              <BookOpenIcon :size="100" class="text-gray-600" />
              <p>No quiz found</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </Dashboard>
</template>

<script>
export default {
  name: "DashboardQuiz",
  data() {
    return {
      blocked: false,
      loading: true,
      items: [],
      perPage: 20,
    };
  },
  computed: {
    page() {
      return +this.$route.query.page || 1;
    },
    fields() {
      return [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        { key: "status", label: "Status", span: "minmax(100PX, 1fr)" },
        {
          key: "additional",
          label: "Additional field",
          span: "minmax(100PX, 1fr)",
        },
        { key: "question", label: "Questions", span: "minmax(220PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(100PX, 1fr)" },
      ];
    },
  },
  methods: {},
};
</script>
