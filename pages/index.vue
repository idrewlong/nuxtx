<template>
	<div class="space-y-8">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl font-bold">Dashboard</h1>
			<NuxtLink
				to="/schedule"
				class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
			>
				Schedule New Post
			</NuxtLink>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div class="rounded-lg border bg-card p-6">
				<h3 class="font-semibold mb-2">Total Scheduled</h3>
				<p class="text-2xl font-bold">{{ scheduledCount }}</p>
			</div>
			<div class="rounded-lg border bg-card p-6">
				<h3 class="font-semibold mb-2">Today's Posts</h3>
				<p class="text-2xl font-bold">{{ todaysPosts }}</p>
			</div>
			<div class="rounded-lg border bg-card p-6">
				<h3 class="font-semibold mb-2">Avg. Engagement</h3>
				<p class="text-2xl font-bold">{{ avgEngagement }}%</p>
			</div>
		</div>

		<EngagementChart />

		<div>
			<h2 class="text-xl font-semibold mb-4">Upcoming Posts</h2>
			<ScheduledPosts />
		</div>
	</div>
</template>

<script setup>
const scheduledCount = ref(5);
const todaysPosts = ref(2);
const avgEngagement = ref(12.5);
</script>
