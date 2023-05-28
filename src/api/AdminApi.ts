import { AdminTableHeader, ListItem, SortingItem, TableItem } from "@/types/ui";
import { Api } from "./Api";
import getTableList from "./mock/getTableList";
import getPublications from "./mock/getPublications";
import getTableHeadersAdmin from "./mock/getTableHeadersAdmin";
import getTableData from "./mock/getTableData";

export class AdminApi extends Api {
	static async getTableList(): Promise<ListItem[]> {
		// TODO Убрать комментарий
		// return await this.get('/table-list') as Promise<ListItem[]>;
		return await new Promise((resolve) => resolve(getTableList()));
	}

	static async getTableHeaders(tableName: string): Promise<AdminTableHeader[]> {
		// TODO Убрать комментарий
		// return await this.get('/table-list') as Promise<ListItem[]>;
		return await new Promise((resolve) => resolve(getTableHeadersAdmin()));
	}

	static async getTableData({tableName, sorting}: {tableName: string; sorting?: SortingItem | null}): Promise<TableItem[]> {
		// TODO Убрать комментарий
		// return await this.get(`/${tableName}`, { sorting }) as Promise<TableItem[]>;
		return await new Promise((resolve) => resolve(getTableData()));
	}

	static async updateItem(tableName: string, payload: TableItem): Promise<unknown> {
		// TODO Убрать комментарий
		// return await this.put(`/${tableName}`, payload);
		return await new Promise((resolve) => resolve(true));
	}
}