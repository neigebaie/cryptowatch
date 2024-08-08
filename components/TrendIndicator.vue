<template>
  <td class="cell">
    <div class="flex-row-center items-center" :class="trendClass">
      <div v-if="percent_change > 0"><i class="pi pi-arrow-up-right"></i></div>
      <div v-else><i class="pi pi-arrow-down-right"></i></div>
      {{ percent_change.toFixed(2) }}%
    </div>
  </td>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  percent_change: {
    type: Number,
    required: true
  }
});

const trendClass = computed(() => {
  return props.percent_change > 0 ? 'trend-upward' : 'trend-downward';
});
</script>

<style scoped>

</style>
