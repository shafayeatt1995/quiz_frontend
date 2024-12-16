<template>
  <div style="background-image: url('/images/bg.svg')">
    <HomeHeader />
    <slot />
    <HomeFooter />
  </div>
</template>

<script>
export default {
  name: "homeIndex",
};
</script>
