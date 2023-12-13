const express = require('express');
const app = express();
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
dotenv.config();
app.use(cors());
app.use(express.json());
const ccavenue = require('ccavenue');


app.post('/', (req, res) => {
    console.log(req.body);
    res.json('Hello World!')
    console.log('mmmmmm');
})
app.get('/api/payment', (req, res) => {
    const paymentLink = ccavenue.makePayment({
        merchantId: '3',
        orderId: '2',
        amount: '1000',
        currency: 'INR',
    });

    res.json({
        paymentLink,
    });
});
// Define the route for the HTTP POST request
app.post('/create-order', async (req, res) => {
    const url = 'https://pfe-apigw.porter.in/v1/orders/create';
    const apiKey = '4330e319-edc7-4110-880f-b2747bf666db';

    // Extract the request data from the client
    const requestData = req.body;
    console.log(req.body);
    // Make the HTTP POST request with the key header
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
    });

    // Parse the response as JSON and send it back to the client
    const responseData = await response.json();
    res.json(responseData);
    console.log(responseData);

});
app.get('/track-order/:id', (req, res) => {
    const apiKey = '4330e319-edc7-4110-880f-b2747bf666db';
    // Set custom headers
    const headers = {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey
    };

    var id = req.params.id;
    // Make GET request with custom headers
    axios.get(`https://pfe-apigw.porter.in/v1/orders/${id}`, { headers })
        .then(response => {
            res.status(response.status).json(response.data);
            console.log(response.data);
        })
        .catch(error => {
            res.status(error.response.status).send(error.response.data);
        });
});
app.post('/sendWhatsAppMessage', async (req, res) => {
    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://server.gallabox.com/devapi/messages/whatsapp',
        headers: {
            'apiKey': '655efa1aba7ba70af9a8cdbe',
            'apiSecret': '6d6a9b227c0446c38ab703a617711efb',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(req.body)
    };
    console.log(req.body);
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        });
});
app.listen(process.env.Port, () => {
    console.log(`Example app listening on port ${process.env.Port}`);
    console.log(`${process.env.TOKEN}`)
})