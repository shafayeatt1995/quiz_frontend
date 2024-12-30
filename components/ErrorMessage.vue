<template>
  <p v-if="error[name]?.msg" class="text-rose-500 text-xs">
    {{ error[name]?.msg }}
  </p>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    name: String,
    error: Object,
  },
};
</script>
