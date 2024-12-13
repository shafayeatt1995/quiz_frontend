<template>
  <div class="container mx-auto py-12">
    <h2 class="text-gray-800 text-4xl font-bold text-center">
      How to create AI Quiz
    </h2>
    <div class="grid grid-cols-3 gap-5 mt-5">
      <div
        v-for="(option, i) in options"
        :key="i"
        class="bg-white p-5 rounded-lg shadow min-h-full flex flex-col"
      >
        <div class="flex gap-3 items-center">
          <div
            class="size-12 rounded-full bg-indigo-500 flex items-center justify-center"
          >
            <Component :is="option.icon" class="text-white" />
          </div>
          <h3 class="text-gray-800 text-2xl font-bold">
            {{ option.title }}
          </h3>
        </div>
        <p class="text-gray-600 mt-2 flex-1">{{ option.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FileTextIcon,
  ImageIcon,
  Link2Icon,
  MessagesSquareIcon,
  TypeOutlineIcon,
  YoutubeIcon,
} from "lucide-vue-next";

export default {
  name: "HomeUsages",
  data() {
    return {
      options: [
        {
          icon: TypeOutlineIcon,
          title: "Text to Quiz",
          description:
            "Easily generate a quiz from any text you provide. Upload or paste your text, and watch it transform into engaging questions. Ideal for testing comprehension and knowledge quickly.",
        },
        {
          icon: MessagesSquareIcon,
          title: "Topic to Quiz",
          description:
            "Create an insightful quiz on any topic of your choice. Input a subject or idea, and get relevant, structured questions. Perfect for learning and teaching purposes.",
        },
        {
          icon: Link2Icon,
          title: "URL to Quiz",
          description:
            "Turn any webpage into an interactive quiz effortlessly. Provide the URL, and extract meaningful questions from the content. Great for enhancing reading comprehension.",
        },
        {
          icon: FileTextIcon,
          title: "PDF to Quiz",
          description:
            "Upload a PDF document to generate a customized quiz based on its content. Extract key points and test understanding effectively. Ideal for academic or professional use.",
        },
        {
          icon: ImageIcon,
          title: "Image to Quiz",
          description:
            "Convert visual content into thought-provoking quizzes. Upload an image with text, and transform it into questions. A creative way to learn and teach visually.",
        },
        {
          icon: YoutubeIcon,
          title: "YouTube to Quiz",
          description:
            "Transform YouTube videos into engaging quizzes seamlessly. Input the video link, and create questions from its content. Perfect for interactive learning from video material.",
        },
      ],
    };
  },
};
</script>
