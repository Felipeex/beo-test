import { Sequelize } from "sequelize";
import "dotenv/config";

export const database = new Sequelize(
  process.env.DATABASE_NAME!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST!,
    dialect: "mysql",
  }
);

const verifyConnection = async () => {
  try {
    await database.authenticate();
    console.log("Banco de dados iniciado");
  } catch (err) {
    console.error("Error banco de dados", err);
  }
};
verifyConnection();
