import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import Author from "./author";

interface BookAttributes {
  id: number;
  bookCode: string;
  title: string;
  description: string;
  publishedYear: number;
  price: number;
  externalId: string;
}

class Book extends Model<BookAttributes> implements BookAttributes {
  public id!: number;
  public bookCode!: string;
  public title!: string;
  public description!: string;
  public publishedYear!: number;
  public price!: number;
  public externalId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  setAuthors: any;
  Author: any;
  authors: any;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "books",
  }
);

Book.belongsToMany(Author, {
  through: "BookAuthors",
  foreignKey: "bookId",
  as: "authors",
});
Author.belongsToMany(Book, {
  through: "BookAuthors",
  foreignKey: "authorId",
  as: "books",
});

export default Book;
