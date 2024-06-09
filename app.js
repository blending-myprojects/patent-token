const express = require('express');
const app = express();
const port = 3000;

const { router } = require('./routes/patentRoutes');

// JSON 파싱을 위한 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 정적 파일을 제공합니다.
app.use(express.static('public'));
app.use(express.static('contract'));

app.use('/api/patents', router);

// 라우트 핸들러를 추가합니다.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 라우트 핸들러를 추가합니다.
app.get('/contract', (req, res) => {
  res.sendFile(__dirname + '/contract/BlendingToken.json');
});

// 서버를 시작합니다.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});