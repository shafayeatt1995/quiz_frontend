<template>
  <div>
    <slot />
    <SocialLogin />
  </div>
</template>
<script>
export default {
  name: "DefaultLayout",
  mounted() {
    document.body.classList.add("scroll-smooth");
  },
};
</script>
