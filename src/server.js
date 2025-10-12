// server.js
import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
app.use(errorHandler);
dotenv.config();

const app = express();
app.use(express.json());

app.use("/", mainRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
