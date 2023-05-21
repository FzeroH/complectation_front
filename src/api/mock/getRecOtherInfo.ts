import { RecOtherInfo } from "@/types";

export default (disciplineId: number, studentGroupId: number): RecOtherInfo => ({
	students_group_type: { title: 'students group type', value: 11 },
	students_discipline_semester: 2,
	request_count: 4,
})