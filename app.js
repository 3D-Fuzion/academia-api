import express, { json } from "express";
import router from "./src/router";
const app = express();

app.use(json());
app.use(router);

export default app;
