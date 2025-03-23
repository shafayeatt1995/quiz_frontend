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
  components: { Toaster },
  mounted() {
    const { value } = useData();
    value.isTablet = window.innerWidth < 1024;
    value.isMobile = window.innerWidth < 768;
    window.addEventListener("resize", (data) => {
      value.isTablet = data.target.innerWidth < 1024;
      value.isMobile = data.target.innerWidth < 768;
    });
  },
  unmounted() {
    window.removeEventListener("resize", () => {});
  },
};
</script>
