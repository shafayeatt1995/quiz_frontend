<template>
  <div class="container mx-auto py-12 px-2">
    <h2 class="md:text-4xl text-3xl font-bold text-center">
      Perfect for Every Professional
    </h2>
    <div class="grid lg:grid-cols-3 gap-5 mt-5">
      <div
        v-for="(option, i) in options"
        :key="i"
        class="bg-white p-5 rounded-lg shadow min-h-full flex flex-col"
      >
        <h3 class="text-2xl font-bold">
          {{ option.title }}
        </h3>
        <p class="text-gray-600 mt-2 flex-1">{{ option.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeProfessiona",
  data() {
    return {
      options: [
        {
          title: "Educators & Schools",
          description:
            "Create unique, engaging assessments in minutes. Save hours of manual work while ensuring fresh question sets for every class and exam.",
        },
        {
          title: "Online Courses & Tutors",
          description:
            "Easily generate a quiz from any text you provide. Upload or paste your text, and watch it transform into engaging questions. Ideal for testing comprehension and knowledge quickly.",
        },
        {
          title: "HR Professionals",
          description:
            "Instantly generate compliance assessments from policy documents. Keep your team updated and compliant with automated quiz creation.",
        },
        {
          title: "Marketers & Content Creators",
          description:
            "Generate interactive quizzes for lead generation, audience engagement, and better customer insights. Perfect for boosting conversions and gathering data.",
        },
        {
          title: "Corporate Trainers",
          description:
            "Effortlessly create training quizzes to assess employee knowledge and track progress. Streamline your training process with automated question generation.",
        },
        {
          title: "Event Planners & Hosts",
          description:
            "Create fun, interactive quizzes for virtual or in-person events. Engage participants with dynamic quizzes that can be tailored to any event theme or audience.",
        },
      ],
    };
  },
};
</script>
