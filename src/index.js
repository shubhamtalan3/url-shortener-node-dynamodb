import express from 'express';
import shortenRoute from './routes/shorten.js';
import redirectRoute from './routes/redirect.js';

const app = express();
app.use(express.json());

app.use('/', shortenRoute);
app.use('/', redirectRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
