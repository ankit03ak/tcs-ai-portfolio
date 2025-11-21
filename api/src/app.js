const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const chatRoutes = require("./routes/chatRoutes");
const projectRoutes = require("./routes/projectRoutes");
const certificationRoutes = require("./routes/certificationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Portfolio backend is running" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/analytics", analyticsRoutes);


app.use(notFound);
app.use(errorHandler);

module.exports = app;
