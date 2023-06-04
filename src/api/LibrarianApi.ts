import { PublicationFullInfo, PublicationStatus } from "@/types";
import { Api } from "./Api";
import getAllOrders from "./mock/getAllOrders";
import { ListItem } from "@/types/ui";

export class LibrarianApi extends Api {
	static async getRequestList(companyName: ListItem | null): Promise<PublicationFullInfo[]> {
		// return await this.get('/price-list', companyName)
		return await this.get('/requests', companyName) as Promise<PublicationFullInfo[]>
		// return await new Promise((resolve) => resolve(getAllOrders()));
	}

	static async getOrderList(): Promise<PublicationFullInfo[]> {
		return await new Promise((resolve) => resolve(getAllOrders()));
	}

	static async getCompanyNames(): Promise<ListItem[]> {
		return await this.get('/companies') as Promise<ListItem[]>
	}

	static async savePriceList(data: any): Promise<any> {
		return await this.post('/file/upload', data)
	}

	static async formAnOrder(): Promise<any> {
		// return await this.post('/price-list', data)
		return await new Promise((resolve) => resolve(true));
	}

	static async changeStatus(orderId: number, status: PublicationStatus): Promise<any> {
		return await this.put('/change_status', { id: orderId, status })
	}
}
