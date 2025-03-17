<script setup>
import { cn } from "@/lib/utils";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div :class="cn('flex items-center p-3 pt-0', props.class)">
    <slot />
  </div>
</template>
