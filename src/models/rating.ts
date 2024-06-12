import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Rating extends Model {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public rating!: number;
  averageRating: any;
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "ratings",
  }
);

export default Rating;
