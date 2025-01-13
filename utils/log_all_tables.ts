import { queryBuilder } from "@/db";

const logAllTables = async () => {
  queryBuilder
    .raw("SELECT table_name FROM information_schema.tables WHERE table_schema = ?", ["public"])
    .then((result) => {
      console.log(result.rows); // Выводит список всех таблиц в схеме 'public'
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      queryBuilder.destroy(); // Закрываем соединение после выполнения запроса
    });
};

export default logAllTables;
