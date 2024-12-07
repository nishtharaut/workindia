const express = require('express');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});