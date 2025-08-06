import { configDotenv } from "dotenv";
configDotenv();
import connectDB from "./db/connection_01.db.js";
connectDB();

import app from "./app.js";
const PORT = 8000;

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Home</h1>`);
});

//middlewares---------
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);
//-----------------------------

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
