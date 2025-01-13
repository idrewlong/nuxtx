// layouts/default.vue
<template>
	<div class="min-h-screen bg-gray-50">
		<nav class="border-b bg-white">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-16 items-center justify-between">
					<div class="flex items-center">
						<NuxtLink to="/" class="text-xl font-bold">
							Content Scheduler
						</NuxtLink>
					</div>
					<div class="flex items-center gap-4">
						<!-- <button @click="toggleTheme" class="p-2">
							<Icon v-if="isDark" name="lucide:sun" />
							<Icon v-else name="lucide:moon" />
						</button> -->
					</div>
				</div>
			</div>
		</nav>

		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
			<slot />
		</div>
	</div>
</template>

<script setup>
// const colorMode = useColorMode();
// const isDark = computed(() => colorMode.value === 'dark');
// const toggleTheme = () => {
// 	colorMode.preference = isDark.value ? 'light' : 'dark';
// };
</script>
