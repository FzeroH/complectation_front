<template>
  <div v-if="isLoading" class="loader-center">
    <custom-loader />
  </div>
  <section v-else class="teacher-order">
    <div class="d-flex teacher-order__row">
      <p class="fw-weight-bold">Кафедра:</p>
      <p class="ms-2">{{ cafedra_name }}</p>
    </div>

    <div class="d-flex teacher-order__row">
      <p class="fw-weight-bold">Автор:</p>
      <p class="ms-2">{{ publication_author }}</p>
    </div>

    <div class="d-flex teacher-order__row">
      <p class="fw-weight-bold">Название:</p>
      <p class="ms-2">{{ publication_title }}</p>
    </div>

    <div class="d-flex teacher-order__row">
      <p class="fw-weight-bold">Издательство:</p>
      <p class="ms-2">{{ company_name }}</p>
    </div>

    <div class="d-flex teacher-order__row">
      <p class="fw-weight-bold">Год издания:</p>
      <p class="ms-2">{{ publication_year }}</p>
    </div>

    <div class="d-flex teacher-order__row mb-4">
      <p class="fw-weight-bold">Тип издания:</p>
      <custom-select :items="pub_types" :selected="pub_type_name" @change="pubTypeChange" title="Тип издания" class="ms-2" />
    </div>

	<table class="table table-light table-hover table-pointer w-100">
		<thead>
		  <tr>
			<th scope="col" class="text-center">Дисциплина</th>
			<th scope="col" class="text-center">Группа</th>
			<th scope="col" class="text-center">Тип группы</th>
			<th scope="col" class="text-center">Семестр</th>
			<th scope="col" class="text-center">Рек. количество</th>
			<th scope="col" class="text-center">Удалить</th>
		  </tr>
		</thead>
		<tbody>
		  <tr v-for="(item, index) in recommendList" :key="index">
			<td><custom-select :items="disciplines" :selected="item.discipline" title="Дисциплина" @change="recDisciplineChange(index, $event)" /></td>
			<td><custom-select :items="student_groups[index]" :selected="item.students_group" title="Группа" @change="recStudentGroupChange(index, $event)" :disabled="!student_groups[index]?.length" /></td>
			<td class="text-center">{{ item.students_group_type?.title ?? '-' }}</td>
			<td class="text-center">{{ item.students_discipline_semester === 0 ? '-' : item.students_discipline_semester }}</td>
			<td class="text-center">{{ item.request_count }}</td>
			<td class="text-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3 text-danger pointer" viewBox="0 0 16 16" @click="removeRow(index)">
					<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
				  </svg>
			</td>
		  </tr>
		  <tr><td class="text-center" colspan="6">
			<svg @click="addRow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus-square text-success pointer" viewBox="0 0 16 16">
				<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
				<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
			  </svg>
		  </td></tr>
		</tbody>
	  </table>

	  <div class="d-flex teacher-order__row align-items-center mb-2">
		<p class="fw-weight-bold">Количество (рекомендуемо {{recQuantity  }}):</p>

		<div class="form-floating text-dark ms-2">
			<input type="number" class="form-control" id="request_count" placeholder="Количество" v-model="request_count" />
			<label for="request_count">Количество</label>
		</div>
	  </div>

	  <footer class="d-flex justify-content-end">
			<input class="btn btn-light" type="button" value="Создать заявку" :disabled="hasApply" @click="apply">
	  </footer>
  </section>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue'
import CustomLoader from '@/ui/loader/CustomLoader.vue'
import CustomSelect from '@/ui/select/CustomSelect.vue'

import { TeacherApi } from '@/api'
import { ListItem } from '@/types/ui'
import { RecommendItem } from '@/types'

const props = defineProps<{
  id: string
}>()

const isLoading = ref(true)

const cafedra_name = ref('')
const publication_author = ref('')
const publication_title = ref('')
const company_name = ref('')
const publication_year = ref<null | number>(null)

const pub_type_name = ref<null | ListItem>(null)
const pub_types = ref<ListItem[]>([])
const disciplines = ref<ListItem[]>([])

const recommendList = ref<RecommendItem[]>([]);
const student_groups = ref<ListItem[][]>([])

const request_count = ref<number>(0)
const recQuantity = computed<number>(() => recommendList.value.reduce((total, item) => total + item.request_count, 0));

const hasApply = ref<boolean>(false);

function pubTypeChange(item: ListItem | null) {
	pub_type_name.value = item;
}

async function recDisciplineChange(rowIndex: number, item: ListItem | null) {
	const recItem =  recommendList.value[rowIndex] as RecommendItem;
	recItem.discipline = item;
	if (item === null) {
		recItem.students_discipline_semester = 0;
		recItem.students_group = null;
		recItem.students_group_type = null;
		recItem.request_count = 0;
		student_groups.value[rowIndex] = [];
	} else {
		const rec_student_groups = await TeacherApi.getStudentGroupsByIdDis(+item.value)
		if (rec_student_groups) student_groups.value[rowIndex] = rec_student_groups
	}
}

async function recStudentGroupChange(rowIndex: number, item: ListItem | null) {
	const recItem =  recommendList.value[rowIndex] as RecommendItem;
	recItem.students_group = item;

	if (item === null) {
		recItem.students_discipline_semester = 0;
		recItem.students_group_type = null;
		recItem.request_count = 0;
	} else {
		const resRecOtherInfo = await TeacherApi.getRecOtherInfo(+recItem.discipline!.value!, +recItem.students_group!.value!)

		if (resRecOtherInfo) {
			recItem.students_discipline_semester = resRecOtherInfo.students_discipline_semester;
			recItem.students_group_type = resRecOtherInfo.students_group_type;
			recItem.request_count = resRecOtherInfo.request_count;
		}
	}
}

function addRow() {
	student_groups.value.push([])
	recommendList.value.push({
		discipline: null,
	students_group: null,
	students_group_type: null,
	students_discipline_semester: 0,
	request_count: 0,
})
}

function removeRow(index: number) {
	student_groups.value.splice(index, 1)
	recommendList.value.splice(index, 1)
}

function apply() {
	hasApply.value = true;

	// TODO Доделать apply
	TeacherApi.createOrder({});
}

(async () => {
  const [order, res_pub_types, res_disciplines] = await Promise.all([
	TeacherApi.getPublication(+props.id), 
	TeacherApi.getPublicTypes(),
	TeacherApi.getDisciplines(),
])

  if (order) {
    cafedra_name.value = order.cafedra_name as string
    publication_author.value = order.publication_author as string
    publication_title.value = order.publication_title as string
    company_name.value = order.company_name as string
    publication_year.value = order.publication_year as number
  }

  if (res_pub_types) pub_types.value = res_pub_types;
  if (res_disciplines) disciplines.value = res_disciplines;

  isLoading.value = false
})()
</script>

<style scoped lang="scss">
.teacher-order {
}
</style>
