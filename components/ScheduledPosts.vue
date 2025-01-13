<template>
	<div class="space-y-4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div
				v-for="post in scheduledPosts"
				:key="post.id"
				class="rounded-lg border bg-card p-6"
			>
				<div class="flex justify-between items-start mb-4">
					<div class="text-sm text-gray-500">
						Scheduled for {{ formatDate(post.scheduledFor) }}
					</div>
					<button class="text-red-500 hover:text-red-600">
						<Icon name="lucide:trash-2" />
					</button>
				</div>
				<p class="mb-4">{{ post.content }}</p>
				<div class="flex items-center gap-4 text-sm text-gray-500">
					<span class="flex items-center gap-1">
						<Icon name="lucide:heart" />
						{{ post.likes }}
					</span>
					<span class="flex items-center gap-1">
						<Icon name="lucide:repeat" />
						{{ post.retweets }}
					</span>
					<span class="flex items-center gap-1">
						<Icon name="lucide:message-circle" />
						{{ post.replies }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// Mock data - replace with actual API calls
const scheduledPosts = ref([
	{
		id: 1,
		content: 'Example scheduled post',
		scheduledFor: new Date('2025-01-20T10:00:00'),
		likes: 0,
		retweets: 0,
		replies: 0,
	},
]);

const formatDate = (date) => {
	return new Date(date).toLocaleString();
};
</script>
