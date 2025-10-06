const express = require("express");

// env config
require("dotenv").config();

const app = express();

// basic middleware
app.get("/", (_req: any, res: any) => {
  res.send("TS Sample Server is running");
});

const PORT = process.env.PORT ? +(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
