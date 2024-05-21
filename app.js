const express = require('express');
const app = express();
const port = 3000;

// 정적 파일을 제공합니다.
app.use(express.static('public'));
app.use(express.static('contract'));

// 라우트 핸들러를 추가합니다.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 라우트 핸들러를 추가합니다.
app.get('/contract', (req, res) => {
  res.sendFile(__dirname + '/contract/MYToken.json');
});

// 서버를 시작합니다.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});