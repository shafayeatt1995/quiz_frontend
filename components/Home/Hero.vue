<template>
  <div class="container mx-auto py-12 px-2 md:px-0">
    <h1 class="md:text-7xl text-4xl font-bold text-center max-w-3xl mx-auto">
      Create Unlimited Free Quiz From Any Text
    </h1>
    <p class="text-center md:text-base text-sm w-full mx-auto mt-5">
      <!-- Create quizzes from any topic, YouTube URL, PDF, or text in less than 10
      seconds -->
      Generate quizzes from Text, PDF, YouTube video, or URLs — FREE to start,
      No card required.
    </p>

    <form class="max-w-2xl mx-auto mt-10">
      <DashboardQuestionForm homeMode />
      <p class="text-center mt-4 text-sm">
        We are generating daily 12,000+ quizzes globally.
      </p>
    </form>
    <div class="mt-10 flex justify-center">
      <img
        src="/images/hero-image.png"
        alt="How it works"
        class="max-h-60 w-auto"
      />
    </div>
  </div>
</template>

<script>
import { FileUpIcon, LightbulbIcon } from "lucide-vue-next";

export default {
  name: "HomeHero",
  components: { FileUpIcon, LightbulbIcon },
  data() {
    return {
      titles: [
        "E-commerce",
        "Leads Gen",
        "Competitor Analysis",
        "Data Research",
      ],
      value: "E-commerce",
      interval: null,
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      const currentIndex = this.titles.indexOf(this.value);
      const nextIndex = (currentIndex + 1) % this.titles.length;
      this.value = this.titles[nextIndex];
    }, 3000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>
