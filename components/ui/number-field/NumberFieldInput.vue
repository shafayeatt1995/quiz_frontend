<script setup>
import { cn } from "@/lib/utils";
import { NumberFieldInput } from "reka-ui";

const props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <NumberFieldInput
    data-slot="input"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-input bg-background py-2 text-sm text-center ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>
