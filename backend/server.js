const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const scanRoutes = require('./routes/scanRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use('/api/scan', scanRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NutriLens server running on http://localhost:${PORT}`));
