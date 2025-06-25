<template>
  <div class="container mx-auto py-12 px-2">
    <h2 class="md:text-4xl text-3xl font-bold text-center">
      How to use Mr. Quizer
    </h2>
    <div class="grid lg:grid-cols-3 gap-5 mt-5">
      <div
        v-for="(option, i) in options"
        :key="i"
        class="bg-white p-5 rounded-lg shadow min-h-full flex flex-col"
      >
        <div class="flex gap-3 items-center">
          <div
            class="size-12 rounded-full bg-gray-700 flex items-center justify-center"
          >
            <Component :is="option.icon" class="text-white" />
          </div>
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
import { BotIcon, ClipboardListIcon, FileTextIcon } from "lucide-vue-next";

export default {
  name: "HomeHow",
  data() {
    return {
      options: [
        {
          icon: ClipboardListIcon,
          title: "Enter Your Topic or Upload Document",
          description:
            "Type a topic, paste some text, or upload a Image/PDF/URL/YouTube link. We’ll generate a smart AI prompt based on your content.",
        },
        {
          icon: BotIcon,
          title: "Run the Prompt in Any AI platform",
          description:
            "Paste the prompt into ChatGPT or your preferred AI tool. The AI will return a structured JSON quiz with questions, options, and correct answers.",
        },
        {
          icon: FileTextIcon,
          title: "Paste JSON & Generate Quiz",
          description:
            "Copy the AI’s JSON output and paste it into our site. Click “Generate Quiz” to instantly create a formatted quiz you can download or assign to others.",
        },
      ],
    };
  },
};
</script>
