<template>
  <div class="container mx-auto py-12 px-2">
    <h2 class="md:text-4xl text-3xl font-bold text-center">
      Features of Mr. Quizer
    </h2>
    <div class="grid xl:grid-cols-4 lg:grid-cols-2 gap-5 mt-5">
      <div
        v-for="(option, i) in options"
        :key="i"
        class="bg-white p-5 rounded-lg shadow min-h-full flex flex-col"
      >
        <div class="flex gap-3 items-center">
          <h3 class="text-2xl font-bold flex-1">
            {{ option.title }}
          </h3>
        </div>
        <p class="text-gray-600 mt-2 flex-1">{{ option.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeTools",
  data() {
    return {
      options: [
        {
          title: "Live Exam Hosting",
          description:
            "Host live exams with real-time results and analytics. Perfect for online assessments and exams.",
        },
        {
          title: "Quiz Download & Export",
          description:
            "Export quizzes as PDF or DOCX to share, print, or study offline.",
        },
        {
          title: "Multi Language Support",
          description:
            "Create and share quizzes in multiple languages. Perfect for global audiences.",
        },
        {
          title: "Custom Question Section",
          description:
            "Add your own questions to the quiz. Perfect for creating personalized exams.",
        },
      ],
    };
  },
};
</script>
