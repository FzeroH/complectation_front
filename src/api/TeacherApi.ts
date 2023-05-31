import {ListItem, SortingItem, TableItem} from '@/types/ui';
import { Api } from './Api';
import { PublicationFullInfo, RecOtherInfo } from '@/types';

export class TeacherApi extends Api {

	static async getPublications(sorting: SortingItem | null): Promise<TableItem[]> {
		return await this.get('/publications', sorting) as Promise<TableItem[]>;
	}

	static async getPublication(id: number): Promise<TableItem | null> {
		return await this.get(`/publication/?id=${id}`) as Promise<TableItem>;
	}


	static async getPublicTypes(): Promise<ListItem[] | null> {
		return await (this.get(`/pub_types`) as Promise<ListItem[] | null>);
	}

	static async getDisciplines(): Promise<TableItem> {
		return await this.get(`/discipline`) as Promise<TableItem>;
	}

	static async getStudentGroupsByIdDis(disciplineId: number): Promise<TableItem> {
		return await this.get(`/student_group/?id=${disciplineId}`) as Promise<TableItem>;
	}

	static async getRecOtherInfo(disciplineId: number, studentGroupId: number): Promise<RecOtherInfo | null> {
		return await this.get(`/group_info/?discipline_id=${disciplineId}&student_group_id=${studentGroupId}`) as Promise<RecOtherInfo>;
	}

	static async createOrder(items: any): Promise<any> {
		// TODO Убрать комментарий
		return await this.post('/create_request', items);
		// return new Promise((resolve) => resolve(true))
	}

	static async getAllOrders(): Promise<PublicationFullInfo[]> {
		// TODO Убрать комментарий
		return await this.get('/publications') as Promise<PublicationFullInfo[]> ;
		// return new Promise((resolve) => resolve(getAllOrders()))
	}
}
