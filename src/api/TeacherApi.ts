import { ListItem, TableItem } from '@/types/ui';
import { Api } from './Api';
import getPublications from './mock/getPublications';
import getPublication from './mock/getPublication';
import getPubTypes from './mock/getPubTypes';
import getDisciplines from './mock/getDisciplines';
import getStudentGroupsByIdDis from './mock/getStudentGroupsByIdDis';
import getRecOtherInfo from './mock/getRecOtherInfo';
import { PublicationFullInfo, RecOtherInfo } from '@/types';
import getAllOrders from './mock/getAllOrders';

export class TeacherApi extends Api {
	static async getPublications(): Promise<TableItem[]> {
		// TODO Убрать комментарий
		// return await this.get('/publications') as Promise<TableItem[]>;
		return new Promise((resolve) => resolve(getPublications()))
	}

	static async getPublication(id: number): Promise<TableItem | null> {
		// TODO Убрать комментарий
		// return await this.get(`/publications/?id=${id}`) as Promise<TableItem>;
		return new Promise((resolve) => resolve(getPublication(id)))
	}

	
	static async getPublicTypes(): Promise<ListItem[] | null> {
		// TODO Убрать комментарий
		// return await (this.get(`/pub_types`) as Promise<ListItem[] | null>);
		return new Promise((resolve) => resolve(getPubTypes()))
	}

	static async getDisciplines(): Promise<ListItem[] | null> {
		// TODO Убрать комментарий
		// return await this.get(`/pub_types`) as Promise<TableItem>;
		return new Promise((resolve) => resolve(getDisciplines()))
	}

	static async getStudentGroupsByIdDis(disciplineId: number): Promise<ListItem[] | null> {
		// TODO Убрать комментарий
		// return await this.get(`/student_group/?id=${disciplineId}`) as Promise<TableItem>;
		return new Promise((resolve) => resolve(getStudentGroupsByIdDis(disciplineId)))
	}

	static async getRecOtherInfo(disciplineId: number, studentGroupId: number): Promise<RecOtherInfo | null> {
		// TODO Убрать комментарий
		// return await this.get(`/rec_other_info/?discipline_id=${disciplineId}&studentGroupId=${studentGroupId}`) as Promise<TableItem>;
		return new Promise((resolve) => resolve(getRecOtherInfo(disciplineId, studentGroupId)))
	}

	static async createOrder(items: any): Promise<any> {
		// TODO Убрать комментарий
		// return await this.post('/order', items);
		return new Promise((resolve) => resolve(true))
	}

	static async getAllOrders(): Promise<PublicationFullInfo[]> {
		// TODO Убрать комментарий
		// return await this.post('/publications', items);
		return new Promise((resolve) => resolve(getAllOrders()))
	}
}