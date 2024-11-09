const express = require('express');
const app = express();
const port = 3031;
const { client } = require('./src/config/mongodb')
const productRoutes = require('./src/routes/productRoutes')

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

app.use(express.json());
app.use('/api/products', productRoutes)

process.on('SIGINT', async () => {
    await client.close();
    console.log('Database connection closed');
    process.exit(0);
});

