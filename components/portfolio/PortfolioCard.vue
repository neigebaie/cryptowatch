<template>
    <Card class="portfolio-card">
        <template #title>
            <div class="portfolio-card-title">
                <p>Add a new coin</p>
                <!-- <Button icon="pi pi-times" severity="secondary" rounded aria-label="Cancel" /> -->
            </div>
        </template>
        <template #content>
            <form @submit.prevent="handleSubmit">
                <div class="form-field">
                    <label for="coin_id">Cryptocurrency</label>
                    <Select v-model="coin_id" :options="cryptos" optionLabel="name" placeholder="Select a Crypto" />
                </div>
                <div class="form-field">
                    <label for="amount">Amount</label>
                    <InputText v-model="amount" type="number" id="amount" required />
                </div>
                <Button rounded type="submit" :disabled="loading" severity="secondary">Ajouter</Button>
                <!-- <pre>{{ portfolio }}</pre> -->
                
            </form>
        </template>
    </Card>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCryptoStore } from '@/stores/crypto';
import { usePortfolioStore } from '@/stores/portfolio';

const coin_id = ref(null);
const amount = ref('');

const portfolioStore = usePortfolioStore();
const store = useCryptoStore();

const handleSubmit = async () => {
    if (coin_id.value && amount.value) {
        portfolioStore.addCoin(coin_id.value.id, parseFloat(amount.value));
    }
};

onMounted(async () => {
    await store.fetchCryptos();
    await portfolioStore.loadPortfolio();
});

const portfolio = computed(() => portfolioStore.portfolio);
const cryptos = computed(() => store.cryptos);
const loading = computed(() => store.loading);
const error = computed(() => store.error);
const netTotal = computed(() => portfolioStore.netTotal);

const hydratedCoins = computed(() => {
    return portfolio.value.coins.map(coin => {
        const crypto = cryptos.value.find(c => c.id === coin.id);
        return crypto ? { id: coin.id, crypto, amount: coin.amount } : null;
    }).filter(coin => coin !== null);
});

</script>

<style lang="scss" scoped>
.portfolio-card {
    max-width: 300px;
    width: 100%;
}

.portfolio-card form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.portfolio-card button {
    // width: 200px;
}

.form-field {
    width: 100%;
}

.portfolio-card-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    line-height: 0;
}

.loading {
    font-size: 1.2em;
    color: grey;
}

.error {
    color: red;
}
</style>