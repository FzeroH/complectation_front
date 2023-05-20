<template>
  <div class="admin-panel" @click="handleOutsideClick">
    <div class="admin-panel__buttons">
      <button v-for="table in tables" :key="table" class="admin-panel__button">{{ table }}</button>
    </div>
    <div class="admin-panel__table">
      <table>
        <thead>
        <tr>
          <th :class="getColumnClass('ID')">ID</th>
          <th v-for="column in columns" :key="column" :class="getColumnClass(column)">{{ column }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in rows" :key="row.id" @dblclick="handleDoubleClick(row)" :class="{ 'highlighted': row.id === highlightedRowId }">
          <td :class="getColumnClass('ID')">{{ row.id }}</td>
          <td v-for="column in columns" :key="column" :class="getColumnClass(column)">{{ row[column] }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const tables = ref(["Table1", "Table2", "Table3"]);
    const columns = ref(["Column1", "Column2", "Column3"]);
    const rows = ref([
      { id: 1, Column1: "Value1", Column2: "Value2", Column3: "Value3" },
      { id: 2, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
    ]);

    const highlightedRowId = ref(null);

    const handleDoubleClick = (row) => {
      // Действие, которое нужно выполнить при двойном клике на строку
      console.log(row);

      // Изменить значение highlightedRowId на id строки
      highlightedRowId.value = row.id;
    };

    const handleOutsideClick = (event) => {
      // Проверить, был ли клик на выделенной строке
      const isClickedOnHighlightedRow = event.target.closest(".highlighted");

      // Если клик был вне выделенной строки, снять выделение
      if (!isClickedOnHighlightedRow) {
        highlightedRowId.value = null;
      }
    };

    const getColumnClass = (column) => {
      return column === "ID" ? "centered" : "";
    };

    return {
      tables,
      columns,
      rows,
      highlightedRowId,
      handleDoubleClick,
      handleOutsideClick,
      getColumnClass,
    };
  },
};
</script>

<style lang="scss" scoped>
.admin-panel {
  margin-top: 45px;
  padding: 0 20px;

  &__buttons {
    display: flex;
    gap: 10px;
    margin-left: 45px;
  }

  &__button {
    padding: 5px 15px;
    font-size: 15px;
    border-radius: 10px;
    cursor: pointer;
  }

  &__table {
    margin-top: 45px;
    background: white;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 5px 15px;
        border: 1px solid #000;
      }

      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }

      .highlighted {
        outline: 2px solid red;
      }

      .centered {
        text-align: center;
      }
    }
  }
}
</style>
