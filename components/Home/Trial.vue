<template>
  <section class="mx-auto max-w-4xl w-full py-12">
    <div class="bg-primary/5 py-16 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-6xl font-bold text-gray-900">
          Get Free 20 Quiz Runs Today
        </h2>
        <p class="mt-4 text-gray-600 text-lg px-20">
          Explore the power of AI-generated quizzes. Start for free — no credit
          card required. Upgrade only when you're ready to scale.
        </p>
        <div class="mt-8 flex justify-center gap-4 flex-wrap">
          <button
            class="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition"
            @click="login"
          >
            Get Started Now
          </button>
          <NuxtLink to="/contact">
            <button
              class="border border-primary text-primary font-medium px-6 py-3 rounded-lg hover:bg-primary/10 transition"
            >
              Contact Us
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import eventBus from "@/lib/eventBus";

export default {
  name: "HomeTrial",
  methods: {
    login() {
      eventBus.emit("loginModal");
    },
  },
};
</script>
