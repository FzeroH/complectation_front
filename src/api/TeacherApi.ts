import { ListItem, SortingItem, TableItem } from '@/types/ui'
import { Api } from './Api'
import getPublications from './mock/getPublications'
import getPublication from './mock/getPublication'
import getPubTypes from './mock/getPubTypes'
import getDisciplines from './mock/getDisciplines'
import getStudentGroupsByIdDis from './mock/getStudentGroupsByIdDis'
import getRecOtherInfo from './mock/getRecOtherInfo'
import { CreateOrderRequest, PublicationFullInfo, RecOtherInfo } from '@/types'
import getAllOrders from './mock/getAllOrders'

export class TeacherApi extends Api {
  static async getPublications(page: number, sorting: SortingItem | null, search: string): Promise<{ total: number; data: TableItem[] }> {
    // TODO Убрать комментарий
    // return await this.get('/publications', {sorting, search}) as Promise<TableItem[]>;
    return new Promise((resolve) => {
		const total = 500;
		const data = getPublications();
		resolve({ total, data })
	})
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
    // TODO Убрать комментарий
    // return await this.post('/order', items); 
    return new Promise((resolve) => resolve(true))
  }

	static async getAllOrders(): Promise<PublicationFullInfo[]> {
		// TODO Убрать комментарий
		return await this.get('/requests') as Promise<PublicationFullInfo[]> ;
		// return new Promise((resolve) => resolve(getAllOrders()))
	}
}
