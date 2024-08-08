<template>
    <div class="card">
        <Chart type="line" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useCryptoStore } from '@/stores/crypto';
import { usePortfolioStore } from '@/stores/portfolio';

const chartData = ref({});
const chartOptions = ref({});

const cryptoStore = useCryptoStore();
const portfolioStore = usePortfolioStore();

const trendColor = (a: number, b: number) => {
    return a < b ? '#4ed07e' : '#f05252';
};

const setChartData = (data: number[]) => {
    return {
        labels: new Array(data.length).fill(''), // Empty labels
        datasets: [
            {
                data: data,
                fill: false,
                borderColor: trendColor(data[0], data[data.length - 1]),
                borderWidth: 1.2,
                tension: 0.4,
                pointRadius: 0, // Hide the points
                pointHoverRadius: 2 // Hide the points on hover
            }
        ]
    };
};

const setChartOptions = () => {
    return {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true // Disable tooltips for sparkline
            }
        },
        tooltip: {
            enabled: true,
            mode: 'index', // Show tooltip for the closest data point
            intersect: false, // Show the tooltip even if the mouse is not exactly on the data point
            callbacks: {
                label: (tooltipItem) => {
                    const value = tooltipItem.raw;
                    return `Net Worth: $${value.toFixed(2)}`;
                }
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        }
    };
};

const calculateNetWorthOverTime = () => {
    const prices = cryptoStore.cryptos;
    const coins = portfolioStore.portfolio.coins;

    // Assume all coins have the same length of sparkline_in_7d.price
    const timePoints = prices[0].sparkline_in_7d.price.length;

    // Initialize an array to hold the net worth at each time point
    const netWorthOverTime = Array(timePoints).fill(0);

    // Loop over each coin in the portfolio
    coins.forEach(coin => {
        // Find the corresponding crypto data
        const crypto = prices.find(c => c.id === coin.id);
        if (crypto) {
            // Loop over the sparkline_in_7d.price array
            crypto.sparkline_in_7d.price.forEach((price, index) => {
                // Calculate the total value for this coin at this time point
                netWorthOverTime[index] += price * coin.amount;
            });
            console.log(netWorthOverTime)
        }
    });

    netWorthOverTime.pop()

    return netWorthOverTime;
};


onMounted(async () => {
    // Fetch historical data
    await cryptoStore.fetchCryptos();
    await portfolioStore.loadPortfolio();

    // Calculate net worth over time
    const netWorthData = calculateNetWorthOverTime();

    // Set chart data and options
    chartData.value = setChartData(netWorthData);
    chartOptions.value = setChartOptions();
});

watch(
    () => [cryptoStore.cryptos, portfolioStore.portfolio.coins],
    () => {
        const netWorthData = calculateNetWorthOverTime();
        chartData.value = setChartData(netWorthData);
    },
    { deep: true }
);
</script>

<style scoped>
.card {
    padding: 1em;
}
</style>