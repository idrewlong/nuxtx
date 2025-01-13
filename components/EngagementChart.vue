// components/analytics/EngagementChart.vue
<template>
	<div class="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
		<div class="p-6">
			<h3 class="font-semibold text-lg mb-2">Engagement Overview</h3>
			<div class="aspect-[2/1] w-full">
				<Line :data="chartData" :options="chartOptions" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const chartData = {
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	datasets: [
		{
			label: 'Engagement',
			data: [65, 59, 80, 81, 56, 55, 40],
			borderColor: '#3b82f6',
			tension: 0.1,
			fill: false,
			borderWidth: 2,
			pointBackgroundColor: '#3b82f6',
		},
	],
};

const chartOptions = {
	responsive: true,
	maintainAspectRatio: true,
	aspectRatio: 2,
	layout: {
		padding: {
			left: 10,
			right: 10,
			top: 20,
			bottom: 10,
		},
	},
	plugins: {
		legend: {
			display: true,
			position: 'top',
			align: 'end',
			labels: {
				boxWidth: 10,
				usePointStyle: true,
				pointStyle: 'circle',
			},
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			border: {
				display: false,
			},
			grid: {
				color: '#e5e7eb',
			},
			ticks: {
				maxTicksLimit: 5,
				padding: 10,
			},
			min: 0,
			max: 100,
			suggestedMax: 100,
		},
		x: {
			border: {
				display: false,
			},
			grid: {
				display: false,
			},
			ticks: {
				padding: 5,
			},
		},
	},
};
</script>

<style>
/* Remove all custom styles - we'll use Tailwind's aspect ratio instead */
</style>
