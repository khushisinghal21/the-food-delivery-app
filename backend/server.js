import express from "express";
import cors from "cors";
import 'dotenv/config';
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import userrouter from "./routes/user.routes.js";
import Itemrouter from "./routes/item.routes.js";
import cartRouter from "./routes/cart.routes.js";


// Connect to DB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'https://your-production-domain.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Static upload path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/users", userrouter);
app.use("/api/items", Itemrouter);

app.use('/api/cart', cartRouter);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


