import express from "express";
import linkRouter from "./Routes/Links";
import categoryRouter from "./Routes/Categories";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/links", linkRouter);
app.use("/categories", categoryRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
