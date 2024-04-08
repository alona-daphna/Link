import express, { Request, Response, NextFunction } from "express";
import linkRouter from "./Routes/Links";
import categoryRouter from "./Routes/Categories";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logRequest)
app.use("/links", linkRouter);
app.use("/categories", categoryRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
