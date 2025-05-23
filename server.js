const express = require('express');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
