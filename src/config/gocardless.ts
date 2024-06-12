const GoCardless = require("gocardless-nodejs");
import dotenv from "dotenv";

dotenv.config();

const gcClient = GoCardless({
  accessToken: process.env.GC_ACCESS_TOKEN!,
  environment: "sandbox",
});

export default gcClient;
