import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import { ListEndpoints } from "./utils/ListEndpoints";
import { ErrorHandlerMiddleware } from "@middlewares/index";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", routes);

app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  const listEndpoints = new ListEndpoints();
  listEndpoints.getEndpoints(app, PORT as any);
});
