<template>
  <MetaHead title="About us" description="This is about us page" />
  <Home>
    <div class="max-w-2xl mx-auto py-12 px-2">
      <Button @click="$router.go(-1)"><Undo2Icon />Back</Button>
      <h1 class="md:text-4xl text-3xl font-bold mt-5">About us</h1>
      <div v-for="(content, i) in contents" :key="i">
        <h2 class="text-2xl font-bold mt-5">{{ ++i }}. {{ content.title }}</h2>
        <div class="pl-2">
          <p class="mt-2">{{ content.content }}</p>
          <ul v-if="content.ul" class="list-disc pl-4">
            <li v-for="(item, key) in content.ul" :key="key">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Home>
</template>

<script>
import { Undo2Icon } from "lucide-vue-next";
import MetaHead from "@/components/MetaHead.vue";

export default {
  name: "terms",
  components: { Undo2Icon, MetaHead },
  data() {
    return {
      contents: [
        {
          title: "Introduction",
          content:
            "Mr. Quizer is a quiz generation platform developed and maintained by Marnik. Our goal is to provide an easy-to-use and efficient service for creating and sharing quizzes. Whether you're an educator, business owner, or content creator, Mr. Quizer helps you engage your audience with custom-built quizzes that are both fun and informative.",
        },
        {
          title: "Our Mission",
          content:
            "Our mission is to empower individuals and organizations to create interactive learning experiences through quizzes. We aim to make quiz creation simple, accessible, and fun, enabling our users to connect with their audiences in meaningful ways.",
        },
        {
          title: "What We Do",
          content:
            "Mr. Quizer offers a wide range of tools and features for building quizzes, including:",
          ul: [
            "Custom quiz creation with various question types (multiple choice, true/false, short answer, etc.).",
            "Real-time analytics to track quiz performance and user engagement.",
            "Integration with social media and other platforms to easily share quizzes.",
            "Support for both personal and professional use, including for educators, marketers, and businesses.",
          ],
        },
        {
          title: "Our Values",
          content:
            "We value simplicity, accessibility, and creativity. We believe that quizzes should be a fun and engaging way to educate, entertain, and connect people. Our platform is designed to be user-friendly, with a focus on providing an intuitive experience for all users.",
        },
        {
          title: "Why Choose Us",
          content:
            "At Mr. Quizer, we strive to offer the best user experience by providing:",
          ul: [
            "A simple and intuitive interface that makes quiz creation fast and easy.",
            "Flexible features that cater to a wide range of use cases, from casual quizzes to professional assessments.",
            "Responsive customer support to assist you with any questions or issues you may have.",
            "Continuous updates and improvements to enhance the platform's capabilities.",
          ],
        },
        {
          title: "Meet the Team",
          content:
            "Our team at Marnik is passionate about creating innovative tools that simplify complex tasks. We are a group of developers, designers, and educators dedicated to providing the best quiz creation experience. Together, we work to continuously improve Mr. Quizer and ensure that it meets the needs of our users.",
        },
        {
          title: "Contact Us",
          content:
            "If you have any questions, feedback, or ideas for how we can improve, we would love to hear from you. Reach out to us at support@mrquizer.com.",
        },
      ],
    };
  },
};
</script>
