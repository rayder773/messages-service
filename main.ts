import { getClient } from "./db";
import { addRoutes } from "./router";
import { app } from "./server";

const port = Number(process.env.PORT) || 3000;

const startServer = async (port: number) => {
  try {
    const client = await getClient();
    console.log("Connection to database via pg.Pool is successful!");
    client.release(); // Возвращаем клиент в пул

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to database via pg.Pool:", error);
    process.exit(1); // Завершаем процесс с ненулевым кодом
  }
};

addRoutes(app);

startServer(port);
