<script setup>
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <Input
    data-sidebar="input"
    :class="cn('h-8 w-full bg-background shadow-none', props.class)"
  >
    <slot />
  </Input>
</template>
