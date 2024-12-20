<template>
  <div style="background-image: url('/images/bg.svg')">
    <slot />
    <SocialLogin />
    <Toaster position="bottom-center" :expand="false" closeButton richColors />
  </div>
</template>
<script>
import { Toaster } from "@/components/ui/sonner";

export default {
  name: "DefaultLayout",
  components: {
    Toaster,
  },
  mounted() {
    document.body.classList.add("scroll-smooth");
  },
};
</script>
