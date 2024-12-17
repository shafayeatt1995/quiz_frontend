<template>
  <div class="bg-white border-t">
    <div class="container mx-auto py-12 px-2">
      <div class="grid md:grid-cols-6 grid-cols-2 gap-5">
        <div class="col-span-2">
          <div class="flex">
            <NuxtLink :to="{ name: 'index' }">
              <img src="/logo.svg" alt="logo" class="size-10" />
            </NuxtLink>
          </div>
          <p class="mt-2 text-gray-600">
            mrquizer.com helps you create quizzes using AI. Generate quizzes
            from any URL, PDF, YouTube video, or topic in seconds for free.
          </p>
          <a
            href="mailto:support@mrquizer.com"
            class="flex items-center gap-2 mt-4 text-gray-600"
            ><MailIcon /> support@mrquizer.com
          </a>
        </div>
        <div class="md:justify-self-center">
          <h3 class="font-bold text-lg">Support</h3>
          <div class="mt-4 flex flex-col gap-2">
            <NuxtLink :to="{ name: 'change-log' }">Change log</NuxtLink>
            <NuxtLink :to="{ name: 'terms' }">Terms & condition</NuxtLink>
            <NuxtLink :to="{ name: 'privacy-policy' }">Privacy Policy</NuxtLink>
          </div>
        </div>
        <div class="justify-self-center">
          <h3 class="font-bold text-lg">Company</h3>
          <div class="mt-4 flex flex-col gap-2">
            <a href="https://feedpack.xyz/board/mrquizer" target="_blank"
              >Review</a
            >
            <NuxtLink :to="{ name: 'index', hash: '#pricing' }"
              >Pricing</NuxtLink
            >
            <NuxtLink :to="{ name: 'about' }">About</NuxtLink>
          </div>
        </div>
        <div class="col-span-2">
          <h3 class="font-bold text-lg">Upcoming AI Solutions</h3>
          <p>
            Use Power of AI Inside Google Sheets Create Presentation Slides with
            AI in Seconds
          </p>
          <p class="mt-10">
            ©
            <span class="underline">
              {{ new Date().getFullYear() }} Mr. Quizer</span
            >. All rights reserved.
          </p>
        </div>
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
