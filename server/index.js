const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const ReviewList = require ('../database/model.js');
const cors = require('cors');

const app = express()
const port = 3200

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//serve the client with endpoint restaurant with specific restaurantID
// app.use('/restaurants/:restaurantID', express.static(path.join(__dirname, '../public')))
app.use('/restaurants/reviews_footer', express.static(path.join(__dirname, '../public')));

app.get('/restaurants/api/reviews/:restaurantID', (req, res) => {

  const {restaurantID} = req.params;

  //GET data for one restaurant; i.e. send data back where {restaurantID : restaurantID}
  ReviewList.find({restaurantID: restaurantID})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send(err));
})

app.post('/restaurants/api/reviews', (req, res) => {
  
  const {Ordered, user, reviewID, restaurantID, starRating, comments, date} = req.body;

  ReviewList.create({Ordered, user, reviewID, restaurantID, starRating, comments, date})
    .then(() => res.status(201).send('Success posting review'))
    .catch(err => res.status(404).send(err));
})


app.listen(port, () => console.log(`App is listening on port ${port}!`))