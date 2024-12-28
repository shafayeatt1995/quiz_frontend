<template>
  <Dialog :open="open" @update:open="open = false" v-if="!loggedIn">
    <DialogContent>
      <DialogTitle></DialogTitle>
      <div>
        <h1 class="text-3xl font-bold text-center">Sign in to your account</h1>
        <div class="flex flex-col gap-2 my-4">
          <Button @click="socialLogin">
            <img src="/images/google.svg" alt="google" class="size-5 mr-2" />
            Sign in with google
          </Button>
        </div>
        <p class="text-sm text-gray-600 text-center w-2/3 mx-auto">
          You are just 2 clicks away from creating quiz from any piece of text
          in seconds.
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script>
import eventBus from "~/lib/eventBus";

export default {
  name: "SocialLogin",
  data() {
    return {
      open: false,
    };
  },
  computed: {
    loggedIn() {
      const { loggedIn } = useAuth();
      return loggedIn;
    },
  },
  mounted() {
    eventBus.on("loginModal", () => {
      this.open = true;
    });
  },
  beforeUnmount() {
    eventBus.off("loginModal");
  },

  methods: {
    socialLogin() {
      const config = useRuntimeConfig();
      const { setItem } = useUtils();
      setItem("socialLogin", `${window.location.origin}/dashboard`);
      window.open(`${config.public.API_URL}/auth/social-login/google`, "_self");
    },
  },
};
</script>
