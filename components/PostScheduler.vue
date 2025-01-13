<template>
	<div class="space-y-4">
		<div class="rounded-lg border bg-card p-6">
			<h3 class="font-semibold text-lg mb-4">Schedule New Post</h3>
			<form @submit.prevent="handleSubmit" class="space-y-4">
				<div>
					<label class="block text-sm font-medium mb-1">Content</label>
					<textarea
						v-model="content"
						rows="4"
						class="w-full rounded-md border p-2"
						:maxlength="280"
					></textarea>
					<div class="text-sm text-gray-500 mt-1">
						{{ 280 - content.length }} characters remaining
					</div>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium mb-1">Date</label>
						<input
							type="date"
							v-model="date"
							class="w-full rounded-md border p-2"
						/>
					</div>
					<div>
						<label class="block text-sm font-medium mb-1">Time</label>
						<input
							type="time"
							v-model="time"
							class="w-full rounded-md border p-2"
						/>
					</div>
				</div>

				<button
					type="submit"
					class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
				>
					Schedule Post
				</button>
			</form>
		</div>
	</div>
</template>

<script setup>
const content = ref('');
const date = ref('');
const time = ref('');

const handleSubmit = () => {
	// Implementation for scheduling post
};
</script>
