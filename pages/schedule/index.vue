<template>
	<div class="space-y-8">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-bold">Schedule New Post</h1>
			<NuxtLink
				to="/"
				class="flex items-center gap-2 text-gray-600 hover:text-gray-900"
			>
				<Icon name="lucide:arrow-left" />
				Back to Dashboard
			</NuxtLink>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Post Creation Form -->
			<div class="space-y-6">
				<div class="rounded-lg border bg-card p-6">
					<form @submit.prevent="handleSubmit" class="space-y-6">
						<div>
							<label class="block text-sm font-medium mb-2">Post Content</label>
							<div class="relative">
								<textarea
									v-model="postContent"
									rows="4"
									class="w-full rounded-md border p-3 pr-20"
									:maxlength="280"
									placeholder="What's happening?"
								></textarea>
								<span
									class="absolute bottom-3 right-3 text-sm text-gray-500"
									:class="{ 'text-red-500': postContent.length > 260 }"
								>
									{{ 280 - postContent.length }}
								</span>
							</div>
						</div>

						<div>
							<label class="block text-sm font-medium mb-2"
								>Media (Optional)</label
							>
							<div
								class="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
								@click="triggerFileInput"
							>
								<input
									type="file"
									ref="fileInput"
									class="hidden"
									accept="image/*"
									multiple
									@change="handleFileUpload"
								/>
								<Icon
									name="lucide:image"
									class="mx-auto mb-2 h-8 w-8 text-gray-400"
								/>
								<p class="text-sm text-gray-600">Click to upload images</p>
								<p class="text-xs text-gray-500">Up to 4 images</p>
							</div>

							<!-- Image Preview Grid -->
							<div
								v-if="selectedFiles.length"
								class="grid grid-cols-2 gap-2 mt-4"
							>
								<div
									v-for="(file, index) in selectedFiles"
									:key="index"
									class="relative rounded-lg overflow-hidden"
								>
									<img
										:src="getImagePreview(file)"
										class="w-full h-32 object-cover"
									/>
									<button
										@click="removeImage(index)"
										class="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
									>
										<Icon name="lucide:x" class="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium mb-2">Date</label>
								<input
									type="date"
									v-model="scheduleDate"
									class="w-full rounded-md border p-2"
									:min="minDate"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium mb-2">Time</label>
								<input
									type="time"
									v-model="scheduleTime"
									class="w-full rounded-md border p-2"
								/>
							</div>
						</div>

						<!-- Thread Support -->
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<Icon name="lucide:plus-circle" class="text-blue-500" />
								<button
									type="button"
									@click="addThreadPost"
									class="text-blue-500 text-sm hover:text-blue-600"
								>
									Add to thread
								</button>
							</div>

							<div class="flex items-center gap-2">
								<Icon name="lucide:clock" class="text-gray-500" />
								<select
									v-model="timezone"
									class="text-sm border rounded-md p-1"
								>
									<option value="local">Local Time</option>
									<option value="utc">UTC</option>
								</select>
							</div>
						</div>

						<button
							type="submit"
							class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2"
							:disabled="!isFormValid"
						>
							<Icon name="lucide:calendar" />
							Schedule Post
						</button>
					</form>
				</div>

				<!-- Thread Posts -->
				<div v-if="threadPosts.length" class="space-y-4">
					<div
						v-for="(post, index) in threadPosts"
						:key="index"
						class="rounded-lg border bg-card p-6"
					>
						<div class="flex justify-between items-start mb-4">
							<span class="text-sm text-gray-500"
								>Thread post {{ index + 2 }}</span
							>
							<button
								@click="removeThreadPost(index)"
								class="text-red-500 hover:text-red-600"
							>
								<Icon name="lucide:trash-2" />
							</button>
						</div>
						<p>{{ post.content }}</p>
					</div>
				</div>
			</div>

			<!-- Preview Section -->
			<div class="space-y-6">
				<div class="rounded-lg border bg-card p-6">
					<h3 class="font-semibold text-lg mb-4">Post Preview</h3>
					<div class="border rounded-lg p-4">
						<div class="flex items-start gap-3">
							<div class="w-12 h-12 rounded-full bg-gray-200"></div>
							<div class="flex-1">
								<div class="flex items-center gap-2">
									<span class="font-semibold">Your Name</span>
									<span class="text-gray-500">@username</span>
								</div>
								<p class="mt-2 break-words">
									{{ postContent || 'Your post will appear here' }}
								</p>

								<!-- Image Preview Grid -->
								<div
									v-if="selectedFiles.length"
									class="grid grid-cols-2 gap-2 mt-4"
								>
									<div
										v-for="(file, index) in selectedFiles"
										:key="index"
										class="rounded-lg overflow-hidden"
									>
										<img
											:src="getImagePreview(file)"
											class="w-full h-32 object-cover"
										/>
									</div>
								</div>

								<div class="flex items-center gap-6 mt-4 text-gray-500">
									<button class="hover:text-blue-500">
										<Icon name="lucide:message-circle" />
									</button>
									<button class="hover:text-green-500">
										<Icon name="lucide:repeat" />
									</button>
									<button class="hover:text-red-500">
										<Icon name="lucide:heart" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="rounded-lg border bg-card p-6">
					<h3 class="font-semibold text-lg mb-4">Scheduling Details</h3>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<span class="text-gray-600">Scheduled Time</span>
							<span class="font-medium">{{ formattedScheduleTime }}</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-gray-600">Thread Posts</span>
							<span class="font-medium">{{ threadPosts.length + 1 }}</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-gray-600">Media Files</span>
							<span class="font-medium">{{ selectedFiles.length }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const postContent = ref('');
const scheduleDate = ref('');
const scheduleTime = ref('');
const timezone = ref('local');
const selectedFiles = ref([]);
const threadPosts = ref([]);
const fileInput = ref(null);

const minDate = computed(() => {
	const today = new Date();
	return today.toISOString().split('T')[0];
});

const isFormValid = computed(() => {
	return (
		postContent.value.length > 0 &&
		postContent.value.length <= 280 &&
		scheduleDate.value &&
		scheduleTime.value
	);
});

const formattedScheduleTime = computed(() => {
	if (!scheduleDate.value || !scheduleTime.value) return 'Not set';
	const date = new Date(`${scheduleDate.value}T${scheduleTime.value}`);
	return date.toLocaleString();
});

const triggerFileInput = () => {
	fileInput.value.click();
};

const handleFileUpload = (event) => {
	const files = Array.from(event.target.files);
	if (selectedFiles.value.length + files.length > 4) {
		alert('Maximum 4 images allowed');
		return;
	}
	selectedFiles.value.push(...files);
};

const getImagePreview = (file) => {
	return URL.createObjectURL(file);
};

const removeImage = (index) => {
	selectedFiles.value.splice(index, 1);
};

const addThreadPost = () => {
	threadPosts.value.push({
		content: '',
		scheduledTime: null,
	});
};

const removeThreadPost = (index) => {
	threadPosts.value.splice(index, 1);
};

const handleSubmit = async () => {
	try {
		// Implement post scheduling logic here
		console.log({
			content: postContent.value,
			date: scheduleDate.value,
			time: scheduleTime.value,
			timezone: timezone.value,
			files: selectedFiles.value,
			threadPosts: threadPosts.value,
		});
	} catch (error) {
		console.error('Error scheduling post:', error);
	}
};
</script>
