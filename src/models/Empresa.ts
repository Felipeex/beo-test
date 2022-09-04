import Sequelize from "sequelize";
import { database } from "../database/index";

import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare nome: string;
  declare cnpj: string;
  declare data_fundacao: string;
  declare valor_hora: number;
}

export const empresa = database.define<UserModel>("empresa", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cnpj: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  data_fundacao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  valor_hora: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});
