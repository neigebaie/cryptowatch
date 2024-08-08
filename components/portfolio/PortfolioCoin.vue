<template>
  <tr class="crypto-card">
    <!-- <td class="cell">
      <FavoriteButton :id="crypto.id" />
    </td>
    <td class="cell">
      {{ crypto.market_cap_rank }}
    </td> -->
    <td class="crypto-header cell">
      <img alt="crypto illustration" :src="coin.crypto.image" class="crypto-image" />
    </td>
    <td class="crypto-header cell">
      <p style="font-weight: 700;">
        {{ coin.crypto.name }}
      </p>
    </td>
    <td class="cell">{{ formatNumber(coin.amount, 2) + " " + coin.crypto.symbol.toUpperCase() }}</td>
    <td class="cell">{{ formatNumber(coin.crypto.current_price * coin.amount, 2) }}€</td>
    <td class="cell">
      <Sparkline :data="coin.crypto.sparkline_in_7d.price || [1, 2, 3]"
        :percent_change="coin.crypto.price_change_percentage_24h" />
    </td>
    <td class="cell">
      <TrendIndicator :percent_change="coin.crypto.price_change_percentage_24h" />
    </td>
    <td class="cell">
      <Button icon="pi pi-times" severity="secondary" rounded aria-label="Cancel" @click="handleDelete(coin.id)" />
    </td>
  </tr>
</template>

<script setup>
import { defineProps } from 'vue'
import { formatNumber } from '~/lib/utils';

const props = defineProps({
  coin: {
    type: Object,
    required: true
  },
  handleDelete: {
    type: Function,
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