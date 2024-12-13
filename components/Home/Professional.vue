<template>
  <div class="container mx-auto py-12">
    <h2 class="text-gray-800 text-4xl font-bold text-center">
      Perfect for Every Professional
    </h2>
    <div class="grid grid-cols-3 gap-5 mt-5">
      <div
        v-for="(option, i) in options"
        :key="i"
        class="bg-white p-5 rounded-lg shadow min-h-full flex flex-col"
      >
        <h3 class="text-gray-800 text-2xl font-bold">
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
      ],
    };
  },
};
</script>
