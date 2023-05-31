import { AdminTableHeader, ListItem, SortingItem, TableItem } from "@/types/ui";
import { Api } from "./Api";

export class AdminApi extends Api {
	static async getTableList(): Promise<ListItem[]> {
		return await this.get('/admin/table-list') as Promise<ListItem[]>;
	}

	static async getTableHeaders(tableName: string): Promise<AdminTableHeader[]> {
		return await this.get('/admin/table-columns', { tableName }) as Promise<AdminTableHeader[]>;
	}

	static async getTableData({tableName, sorting}: {tableName: string; sorting?: SortingItem | null}): Promise<TableItem[]> {
		return await this.get(`/admin/${tableName}`, { sorting }) as Promise<TableItem[]>;
	}

	static async updateItem(tableName: string, payload: TableItem): Promise<unknown> {
		// TODO Убрать комментарий
		// return await this.put(`/${tableName}`, payload);
		return await new Promise((resolve) => resolve(true));
	}
}
