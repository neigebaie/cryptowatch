<template>
    <div class="card">
        <Chart type="line" :data="chartData" :options="chartOptions" style="height: 32px; width: 70px;" />
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
    data: {
        type: Array,
        required: true,
        default: () => [65, 59, 80, 81, 56, 55, 40],
    },
    color: {
        type: String,
        default: "green"
    },
    percent_change: {
        type: Number,
        required: true
    }
});

const chartData = ref({});
const chartOptions = ref({});

const trendColor = (a, b) => {
    return a < b ? '#4ed07e' : '#f05252';
};

const setChartData = (data) => {
    return {
        labels: new Array(data.length).fill(''), // Empty labels
        datasets: [{
            data: data,
            fill: false,
            borderColor: trendColor(data[0], data[data.length - 1]),
            borderWidth: 1.2,
            tension: 0.4,
            pointRadius: 0, // Hide the points
            pointHoverRadius: 0 // Hide the points on hover
        }]
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
                enabled: false // Disable tooltips for sparkline
            },
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

onMounted(() => {
    chartData.value = setChartData(props.data, props.color);
    chartOptions.value = setChartOptions();
});

watch(() => props.data, (newData) => {
    chartData.value = setChartData(newData, props.color);
});

</script>