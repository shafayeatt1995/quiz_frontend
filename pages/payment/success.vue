<template>
  <MetaHead
    title="Payment Success"
    description="This is payment success page"
  />
  <div class="flex flex-col justify-center items-center py-20">
    <div ref="loadingRef" class="max-h-72"></div>
    <div class="flex justify-center flex-col items-center gap-2">
      <div class="w-full h-1 bg-gray-200 rounded-full">
        <div
          class="h-1 bg-gradient rounded-full transition-all duration-15000"
          :class="loading ? 'w-full' : 'w-[0%]'"
        ></div>
      </div>
      <p class="text-gray-700">
        Don't close the browser. We are verifying your payment and updating your
        profile.
      </p>
    </div>
  </div>
</template>

<script>
import { useAuth } from "@/composables/useAuth";

export default {
  name: "paymentSuccess",
  data() {
    return {
      click: true,
      loading: false,
    };
  },

  mounted() {
    if (this.$refs.loadingRef) {
      const { initLottie } = useUtils();
      initLottie(this.$refs.loadingRef, "/lottie/payment-success.json", false);
    }
    this.init();
  },

  methods: {
    async init() {
      try {
        if (!this.click) return;
        this.click = false;
        setTimeout(() => {
          this.loading = true;
        }, 500);
        setTimeout(async () => {
          const { refreshToken } = useAuth();
          await refreshToken();
          this.$router.push({ name: "dashboard" });
        }, 14000);
      } catch (error) {
      } finally {
        this.click = true;
      }
    },
  },
};
</script>
