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
      { id: 3, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 4, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 5, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 6, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 7, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 8, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 9, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 10, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 11, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 12, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 13, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 14, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 15, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 16, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 17, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 18, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 19, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 20, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 21, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 22, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 23, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 24, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 25, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 26, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 27, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 28, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 29, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 30, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 31, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 32, Column1: "Value4", Column2: "Value5", Column3: "Value6" },
      { id: 33, Column1: "Value4", Column2: "Value5", Column3: "Value6" },

    ]);

    const highlightedRowId = ref(null);

    const handleDoubleClick = (row) => {
      // Действие, которое нужно выполнить при двойном клике на строку
      console.log(row);

      highlightedRowId.value = row.id;
    };

    const handleOutsideClick = (event) => {
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
  margin-top: 20px;
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
    position: relative;
    max-height: 450px;
    overflow-y: auto;

    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 5px 15px;
        border: 1px solid #000;
        user-select: none;
      }

      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }

      .highlighted {
        background: rgba(86, 108, 157, 0.5);
      }

      .centered {
        text-align: center;
      }
    }

    thead {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }
}
</style>
