import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./user";
import Book from "./book";

interface PaymentAttributes {
  id: number;
  userId: number;
  bookId: number;
  amount: number;
  status: string;
  createdAt: Date;
}

class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public amount!: number;
  public status!: string;
  public createdAt!: Date;

  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "payments",
  }
);
Payment.belongsTo(User, { foreignKey: "userId" });
Payment.belongsTo(Book, { foreignKey: "bookId" });

export default Payment;
