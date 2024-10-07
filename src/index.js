const express = require('express')
const path = require('path')
const app = express()
const quote = require('./quotes.json')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/about', (req, res) => {
    //res.send('About me!')
    //res.sendFile(path.join(__dirname + '/index.html'));
    res.json(quote.quotes);
  })
app.get('/random', (req, res) => {
  let rand = quote.quotes;
  res.send(`${rand.length}`);

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})