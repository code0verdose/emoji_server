const express = require("express");
const uuid4 = require("uuid4");
const cors = require("cors");
const emojiData = require("./data/emoji");
const app = express();
const PORT = 7000;

app.use(cors("*"));


app.get("/api/emoji", (req, res) => {
  const searchValue = (req.query.search || "").toLowerCase();
  const pageValue = +req.query.page || 0;
  const limitValue = +req.query.limit || 100000;

  const startIndex = pageValue * limitValue;
  const endIndex = startIndex + limitValue;

  const filterEmoji = emojiData.filter(
    (el) =>
      el.title.toLowerCase().includes(searchValue) ||
      el.keywords.toLowerCase().includes(searchValue)
  );

  const data = filterEmoji.slice(startIndex, endIndex);

  const lastPage = Math.floor((filterEmoji.length - 1) / limitValue);
  const dataLength = filterEmoji.length;

  res.json({ lastPage, dataLength, pageValue, limitValue, data, searchValue });
});

app.listen(PORT, () => {
  console.log(`Сервер успешно запустился на порту: ${PORT}`);
});
