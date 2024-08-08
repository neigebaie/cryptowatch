<template>
    <h1 class="gradient-text">Your Portfolio : {{ formatNumber(netTotal, 2) }}€</h1>
    <div style="width: 100%; ;">
        <PortfolioNetChart />
    </div>
    <table v-if="hydratedCoins.length">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Amount</th>
                <th>Value</th>
                <th>7d</th>
                <th>1d</th>
            </tr>
        </thead>
        <tbody>
            <PortfolioCoin v-for="coin in hydratedCoins" :key="coin.id" :coin="coin" :handle-delete="handleDelete" />
        </tbody>
    </table>
    <PortfolioCard />
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCryptoStore } from '@/stores/crypto';
import { usePortfolioStore } from '@/stores/portfolio';
import { formatNumber } from '~/lib/utils';

const portfolioStore = usePortfolioStore();
const store = useCryptoStore();

onMounted(async () => {
    await store.fetchCryptos();
    await portfolioStore.loadPortfolio();
});

const handleDelete = (id: string) => {
    console.log("test")
    portfolioStore.removeCoin(id);
}

const portfolio = computed(() => portfolioStore.portfolio);
const cryptos = computed(() => store.cryptos);
const netTotal = computed(() => portfolioStore.netTotal);

const hydratedCoins = computed(() => {
    return portfolio.value.coins.map(coin => {
        const crypto = cryptos.value.find(c => c.id === coin.id);
        return crypto ? { id: coin.id, crypto, amount: coin.amount } : null;
    }).filter(coin => coin !== null);
});

</script>