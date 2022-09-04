import { Sequelize } from "sequelize";
import "dotenv/config";

export const database = new Sequelize(
  process.env.DATABASE_NAME as any,
  process.env.DATABASE_USER as any,
  process.env.DATABASE_PASSWORD as any,
  {
    host: process.env.DATABASE_HOST as any,
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
