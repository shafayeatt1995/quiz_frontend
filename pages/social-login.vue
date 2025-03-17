<template>
  <MetaHead title="Social login" description="This is social login page" />
  <div class="container mx-auto h-screen">
    <div class="flex flex-col justify-center items-center h-full">
      <div ref="loading" class="max-h-80"></div>
      <div class="flex justify-center">
        <p class="text-gray-700">We are checking your information</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "socialLogin",
  head() {
    return { title: `Social login - ${this.$pageTitle}` };
  },
  mounted() {
    const { initLottie } = useUtils();
    initLottie(this.$refs.loading, "/lottie/social-login.json");
    this.getDetails();
  },
  methods: {
    async getDetails() {
      const { getItem, removeItem } = useUtils();
      const socialLogin = getItem("socialLogin") + "";
      try {
        const { query } = this.$route;
        const { c, e } = query;
        if (e) {
          if (socialLogin) {
            removeItem("socialLogin");
            window.open(socialLogin, "_self");
          } else {
            this.$router.push({ name: "index" });
          }
        } else if (c) {
          const { email, id, provider } = JSON.parse(atob(c));
          const { login } = useAuth();
          const body = {
            email,
            id,
            provider,
            password: "f*#k you",
          };
          await login(body);
          if (socialLogin) {
            removeItem("socialLogin");
            window.open(socialLogin, "_self");
          } else {
            this.$router.push({ name: "index" });
          }
        } else {
          this.$router.push({ name: "index" });
        }
      } catch (error) {
        console.error(error);
        if (socialLogin) {
          removeItem("socialLogin");
          window.open(socialLogin, "_self");
        } else {
          this.$router.push({ name: "index" });
        }
      }
    },
  },
};
</script>
