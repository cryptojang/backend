const express = require("express");
//import express from 'express;

const app = express();

const port = 3010;
//create-react-app에서는 자동으로 3000으로 만들어줌

app.get("/", (req, res) => {
  return res.send("Hello, Express!");
});
// 서버 잘 열리는 확인하는 용도의 기본 api 만듬

//port 번호, 포트 열렸을 때 실행할 내용
app.listen(port, () => {
  console.log(`🚀 Server is listening on port: ${port}`);
});
