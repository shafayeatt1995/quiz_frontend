<template>
  <div class="container mx-auto">
    <div class="flex flex-col lg:flex-row gap-5 px-2 py-5">
      <div class="w-full">
        <Label for="email">Email</Label>
        <Input type="email" v-model="form.email" placeholder="Enter email" />
      </div>
      <div class="w-full">
        <Label for="code">Code</Label>
        <Input type="password" v-model="form.code" placeholder="Enter code" />
      </div>
      <Button class="w-full mt-5" @click="login">Login</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnikerLogin",
  data() {
    return {
      form: {
        email: "",
        code: "",
      },
      blocked: false,
      loading: false,
    };
  },
  methods: {
    async login() {
      try {
        if (this.blocked) return;
        this.blocked = true;
        const { anikerLogin } = useAuth();
        const status = await anikerLogin(this.form);
        console.log(status);
        if (status) this.$router.push("/dashboard");
      } catch (error) {
        console.error(error);
      } finally {
        this.blocked = false;
      }
    },
  },
};
</script>
