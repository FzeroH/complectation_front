import {ListItem, SortingItem, TableItem} from '@/types/ui';
import { Api } from './Api';
import {CreateOrderRequest, PublicationFullInfo, RecOtherInfo} from '@/types';

export class TeacherApi extends Api {
  static async getPublications(page: number, sorting: SortingItem | null, search: string): Promise<{ total: number; data: TableItem[] }> {
    return await this.get('/publications', { ...sorting, page, search}) as Promise<{ total: number; data: TableItem[] }>;
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

	static async createOrder(items: CreateOrderRequest): Promise<any> {
		return await this.post('/create_request', items);
	}

	static async getAllOrders(): Promise<PublicationFullInfo[]> {

		return await this.get('/requests') as Promise<PublicationFullInfo[]> ;
		// return new Promise((resolve) => resolve(getAllOrders()))
	}
}
