<template>
  <div
    class="container min-h-screen px-6 mx-auto flex lg:items-center flex-col-reverse lg:flex-row justify-end -mt-24"
  >
    <div class="wf-ull lg:w-1/3">
      <p class="text-sm font-medium text-indigo-600">404 error</p>
      <h1 class="mt-3 text-2xl font-semibold text-gray-700 md:text-3xl">
        Page not found
      </h1>
      <p class="mt-4 text-gray-500">
        Sorry, the page you are looking for doesn't exist. Here are some helpful
        links:
      </p>

      <div class="flex items-center mt-6 gap-x-3">
        <Button @click="goBack" variant="outline">
          <Undo2Icon />
          <span>Go back</span>
        </Button>

        <NuxtLink :to="{ name: 'index' }" :class="cn(buttonVariants())">
          Take me home
        </NuxtLink>
      </div>
    </div>

    <div class="relative w-full mt-12 lg:w-2/3 lg:mt-0" ref="error"></div>
  </div>
</template>

<script>
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Undo2Icon } from "lucide-vue-next";

export default {
  name: "NotFound",
  components: { Undo2Icon },
  mounted() {
    const { initLottie } = useUtils();
    initLottie(this.$refs.error, "/lottie/404.json");
  },
  methods: {
    cn,
    buttonVariants,
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
