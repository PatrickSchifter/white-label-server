import express from 'express';
import router from './routes';
import { config } from './config/config';
import cors from 'cors';
import ip from 'ip';

const app = express();
const port = config.port || 3030;
const serverIp = ip.address();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`running on ip: ${serverIp} and port ${port}`);
});

export default app;
