<template>
	<div v-if="isLoading" class="loader-center">
		<custom-loader />
	  </div>
	  <section v-else v-for="order in orders" :key="order.id" class="text-dark mb-4">
		<article class="libr__article p-1 bg-light">
		  <publicate-card :is-large="false" :item="order" />
		  <footer class="d-flex justify-content-end">			
			<template v-if="order.status === statusInProcessing">
				<input type="button" value="Принять" class="btn btn-success" />
				<input type="button" value="Отклонить" class="btn btn-danger ms-2" />
			</template>
			<input v-else-if="order.status === statusAccepted" type="button" value="Добавить в заказ" class="btn btn-dark" @click="updateStatus(order.id)" />
		  </footer>
		</article>
	  </section>
</template>

<script setup lang="ts">
import { LibrarianApi } from '@/api';
import { STATUS_ACCEPTED, STATUS_IN_PROCESSING } from '@/const';
import { PublicationFullInfo, PublicationStatus } from '@/types';
import { ref, computed } from 'vue';

import PublicateCard from '@/components/PublicateCard.vue';
import CustomLoader from '@/ui/loader/CustomLoader.vue';

const isLoading = ref<boolean>(true);
const orders = ref<PublicationFullInfo[]>([]);

const statusInProcessing = computed<string>(() => STATUS_IN_PROCESSING);
const statusAccepted = computed<string>(() => STATUS_ACCEPTED);

async function updateStatus({ id, status }: PublicationFullInfo) {
	isLoading.value = true;
	await LibrarianApi.changeStatus(id, status);
	orders.value = await LibrarianApi.getRequestList();
	isLoading.value = false;
}

(async () => {
	orders.value = await LibrarianApi.getRequestList();
	isLoading.value = false;
})()
</script>

<style scoped lang="scss">
.libr {
	&__article {
		border-radius: 10px;
	}
}
</style>