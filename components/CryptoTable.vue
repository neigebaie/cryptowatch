<template>
    <div v-if="error">{{ error }}</div>
    <div v-else-if="loading">Loading...</div>
    <div v-else>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Rank</th>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>7d</th>
                    <th>24h</th>
                </tr>
            </thead>
            <tbody>
                <!-- <pre>{{ cryptos }}</pre> -->
                <CryptoCard v-for="crypto in filteredCryptos" :key="crypto.id" :crypto="crypto" />
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useCryptoStore } from '@/stores/crypto';
import CryptoCard from '@/components/CryptoCard.vue';
import { useAsyncData } from '#app';

const props = defineProps<{
    filter?: string[];
}>();

const store = useCryptoStore();

const { data, pending, error } = useAsyncData('fetchCryptos', () => store.fetchCryptos(), {
    server: true,
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