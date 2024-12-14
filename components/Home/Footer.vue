<template>
  <div class="container mx-auto py-12">
    <div class="grid grid-cols-6 gap-5">
      <div class="col-span-2">
        <img src="/images/logo.svg" alt="logo" class="size-10" />
        <p class="mt-2 text-gray-600">
          MagicForm.app helps you create quizzes using AI. Generate quizzes from
          any URL, PDF, YouTube video, or topic in seconds for free.
        </p>
        <a
          href="mailto:support@magicform.app"
          class="flex items-center gap-2 mt-4 text-gray-600"
          ><MailIcon /> support@magicform.app
        </a>
      </div>
      <div class="justify-self-center">
        <h3 class="text-gray-800 font-bold text-lg">Support</h3>
        <div class="mt-4 flex flex-col gap-2">
          <NuxtLink to="#">Review</NuxtLink>
          <NuxtLink to="#">Changelog</NuxtLink>
          <NuxtLink to="#">Subscription</NuxtLink>
        </div>
      </div>
      <div class="justify-self-center">
        <h3 class="text-gray-800 font-bold text-lg">Support</h3>
        <div class="mt-4 flex flex-col gap-2">
          <NuxtLink to="#">Pricing</NuxtLink>
          <NuxtLink to="#">Support</NuxtLink>
          <NuxtLink to="#">About</NuxtLink>
          <NuxtLink to="#">Press</NuxtLink>
        </div>
      </div>
      <div class="col-span-2">
        <h3 class="text-gray-800 font-bold text-lg">Other AI Solutions</h3>
        <p>
          Use Power of AI Inside Google Sheets Create Presentation Slides with
          AI in Seconds
        </p>
        <h3 class="text-gray-800 font-bold text-lg mt-5">New Tutorial</h3>
        <p>How AI Helped Me Create a Quiz in 1 Click</p>
      </div>
    </div>
  </div>
</template>

<script>
import { MailIcon } from "lucide-vue-next";

export default {
  name: "HomeFooter",
  components: { MailIcon },
};
</script>
