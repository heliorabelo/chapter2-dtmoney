import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";

import { App } from "./App";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freela",
          type: "deposit",
          category: "Dev",
          amount: 50000,
          createdAt: new Date("2021-12-20 11:00:00"),
        },
        {
          id: 2,
          title: "Mercado",
          type: "withdraw",
          category: "Casa",
          amount: 2000,
          createdAt: new Date("2021-12-22 09:30:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      console.log(data);

      console.log(this.schema.all("transaction"));
      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
