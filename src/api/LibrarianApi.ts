import {OrdersFullInfo, PublicationFullInfo, PublicationStatus} from "@/types";
import {Api, url} from "./Api";
import { ListItem } from "@/types/ui";

export class LibrarianApi extends Api {
	static async getRequestList(companyName: ListItem | null): Promise<PublicationFullInfo[]> {
		return await this.get('/all_requests', { value: companyName?.value}) as Promise<PublicationFullInfo[]>
	}

	static async getOrderList(status: PublicationStatus): Promise<PublicationFullInfo[]> {
		return await this.get('/all_requests', {status}) as Promise<PublicationFullInfo[]>;
	}

	static async getOrderHistoryList(companyName: ListItem | null, ordersDate: ListItem | null): Promise<OrdersFullInfo[]> {
		return await this.get('/orders', {value: companyName?.value, id: ordersDate?.value}) as Promise<OrdersFullInfo[]>;
	}

	static async getOrdersDate(): Promise<ListItem[]> {
		return await this.get('/orders_date') as Promise<ListItem[]>
	}

	static async getCompanyNames(): Promise<ListItem[]> {
		return await this.get('/companies') as Promise<ListItem[]>
	}

	static async savePriceList(data: any): Promise<any> {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Accept: 'application/json',
			},
			withCredentials: true,
			timeout: 30000,
			};
		return await this.post('/document/upload', data, config)
	}

	static async formAnOrder(data: any): Promise<any> {
		return await this.post('/create_order', data)
	}

	static async downloadOrderDocument(id: number): Promise<any> {
		const link = document.createElement('a')

		link.setAttribute('href',`${url}/api/document/download?order_id=${id}`)
		link.setAttribute('download','order.docx')
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	static async changeStatus(orderId: number, status: PublicationStatus): Promise<any> {
		return await this.put('/change_status', { id: orderId, status })
	}
}
