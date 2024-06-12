import axios from "axios";

export const GoCardlessService = {
  createPayment: async (amount: number) => {
    try {
      const response = await axios.post(
        "https://api-sandbox.gocardless.com/payments",
        {
          payments: {
            amount: amount * 100,
            currency: "GBP",
            links: { mandate: "MD0000X00000000" },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GO_CARDLESS_ACCESS_TOKEN}`,
            "GoCardless-Version": "2015-07-06",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating payment with GoCardless:",
        error.response ? error.response.data : error.message
      );
      throw new Error("Error creating payment with GoCardless");
    }
  },
};
