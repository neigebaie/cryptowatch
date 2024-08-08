<template>
  <section class="market-data">
    <h2>Live Market Data</h2>
    <div id="crypto-prices">
      <!-- Dynamic data loaded here -->
      <Sparkline :data="data || [1, 2, 3]" color="green"/>
      <pre v-if="data">{{ data }}</pre>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useCryptoStore } from '@/stores/crypto';
import { useAsyncData } from '#app';

const props = defineProps<{
    filter?: string[];
}>();

const store = useCryptoStore();

const { data, pending, error } = useAsyncData('fetchCryptos', () => store.fetchCryptos(), {
    server: false,
    lazy: false,
});

const cryptos = computed(() => store.cryptos);
const loading = computed(() => store.loading);

// Compute the filtered list of cryptos based on the filter prop
const filteredCryptos = computed(() => {
    if (props.filter && props.filter.length > 0) {
        return cryptos.value.filter(crypto => props.filter?.includes(crypto.id));
    }
    return cryptos.value;
});
</script>