<template>
  <MetaHead title="Quiz Dashboard" description="This is quiz page" />
  <Dashboard>
    <div class="bg-muted/40 rounded-xl md:p-2">
      <div class="grid auto-rows-max items-start gap-4 xl:col-span-2">
        <Card>
          <CardHeader class="px-3">
            <CardTitle class="flex items-center justify-between gap-2">
              <p>Quiz</p>
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  </Dashboard>
</template>

<script>
export default {
  name: "QuizPage",
};
</script>
