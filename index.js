import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "2hQ6jxEA9UG7rklYMUVKkw==kQzBoNWXvUhRCY6w";

app.get("/", (req, res) => {
  res.send("🦁 Simbus Counter läuft!");
});

app.get("/counter", async (req, res) => {
  const cmd = req.query.cmd || "default";
  const user = req.query.user || "unknown";

  try {
    const url = `https://api.api-ninjas.com/v1/counter?hit=true&id=${cmd}_${user}`;
    const response = await fetch(url, {
      headers: { "X-Api-Key": API_KEY },
    });
    const data = await response.json();

    res.send(data.value.toString());
  } catch (err) {
    console.error(err);
    res.status(500).send("error");
  }
});

app.listen(PORT, () => console.log(`🦁 Counter läuft auf Port ${PORT}`));
