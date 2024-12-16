<template>
  <div class="container mx-auto py-12 px-2">
    <h1
      class="text-7xl font-bold text-center bg-clip-text bg-gradient fill-transparent text-transparent max-w-3xl mx-auto"
    >
      Create Quiz with AI from any text
    </h1>
    <p class="text-center">
      Create quizzes from any topic, YouTube URL, PDF, or text in less than 10
      seconds
    </p>

    <form class="max-w-2xl mx-auto mt-10">
      <label for="characters" class="text-gray-600 text-sm"
        >Character count: 0/ 2500</label
      >
      <textarea
        id="characters"
        class="block w-full rounded-lg border-2 border-dashed p-4 focus:outline-none"
        rows="7"
        placeholder="Enter Topic, Youtube URL, PDF, or Text to get a Quiz Docx in seconds. use the bulb for suggestions."
      ></textarea>
      <div class="flex justify-between items-center mt-2">
        <div class="flex items-center gap-2">
          <label
            class="border-2 border-dashed rounded-md px-2 py-1 flex gap-2 text-gray-600 bg-white cursor-pointer"
            for="file-upload"
          >
            <FileUpIcon /> Upload file
          </label>
          <input
            type="file"
            id="file-upload"
            class="hidden"
            accept=".pdf&.doc&.docx&.text&.jpg&.png&.jpeg&.svg&.webp"
          />

          <button><LightbulbIcon /></button>
        </div>
        <Button type="submit">Generate quiz</Button>
      </div>
      <p class="text-center mt-4 text-sm">
        236 quizzes created in last 7 days.
      </p>
    </form>
    <div class="mt-10 flex justify-center">
      <img src="/images/hero-image.png" alt="hero" class="max-h-80 w-auto" />
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
