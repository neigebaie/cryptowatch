<template>
  <tr class="crypto-card">
    <td class="cell">
      <FavoriteButton :id="crypto.id" />
    </td>
    <td class="cell">
      {{ crypto.market_cap_rank }}
    </td>
    <td class="crypto-header cell">
      <img alt="crypto illustration" :src="crypto.image" class="crypto-image" />
    </td>
    <td class="crypto-header cell">
      <p style="font-weight: 700;">
        {{ crypto.name }}
      </p>
      <p>{{ crypto.symbol.toUpperCase() }}</p>
    </td>
    <td class="cell">{{ formatNumber(crypto.current_price) }}€</td>
    <td class="cell">{{ formatNumber(crypto.market_cap) }}€</td>
    <td class="cell">
      <Sparkline :data="crypto.sparkline_in_7d.price || [1, 2, 3]" :percent_change="crypto.price_change_percentage_24h" />
    </td>
    <td class="cell">
      <TrendIndicator :percent_change="crypto.price_change_percentage_24h" />
    </td>
  </tr>
</template>

<script setup>
import { defineProps } from 'vue'
import { formatNumber } from '~/lib/utils';

const props = defineProps({
  crypto: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.crypto-card {
  border: 1px solid #ccc;
  border-radius: 24px;
  margin-bottom: 12px;
}

.cell {
  padding: 20px;
}

.crypto-image {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
}

.crypto-card p {
  margin: 0 15px;
}
</style>