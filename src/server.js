import { listen } from "../app";
require("dotenv").config();

const PORT = process.env.PORT || 3333;

listen(PORT, () => console.log("Server running on port 3333"));
