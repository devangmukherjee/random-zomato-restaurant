const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Zomato = require('zomato.js')
const zomato = new Zomato('9109f19fbfb0b547293f6fe2402f98f6')

const app = express()


app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/locations/:query', async (req, res) => 
{
  try{
  const query = req.params.query;
  const data = await zomato.cities({ q: query,count: 1 })
  const cityId= await (data[0].id);
  const result = [];
  const nrOfRequests = 60; 
  let currCount = 0;  
  const nrOfEntries = 20;
  const response = await zomato.search({ entity_id: cityId, entity_type: 'city', start:currCount, count:nrOfEntries, sort:'rating', order:'desc' });
    result.push(...response.restaurants);
  // for(let i=0; i < nrOfRequests ; i++) {
  //   const response = await zomato.search({ entity_id: cityId, entity_type: 'city', start:currCount, count:nrOfEntries, sort:'rating', order:'desc' });
  //   result.push(...response.restaurants);
  //   currCount += nrOfEntries;
  // }    
  const no = Math.floor(Math.random() * 20);     

  const restaur = {
    name: result[no].name,
    url: result[no].url,
    location: result[no].location,
    price: result[no].price_range,
    thumbnail: result[no].thumb,
    rating: result[no].user_rating.aggregate_rating,
  };
res.json(restaur);
} catch (err) {
  console.error(err)
  res.status(500).send('error, yo')
} 
});



app.listen(3000, () => console.log('server started'))
