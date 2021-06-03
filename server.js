const express = require("express")
var request = require("request")
const app = express()
const path = require ('path')
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'build')))


app.get("/getGames", (req, res) => {
    request(
        "https://partners.9ijakids.com/index.php?partnerId=555776&accessToken=l0lawtvv-94bv-oi4d-u808-5ubz&action=catalogfilter",
        function(error, response, body) {
            if (!error && response.statusCode == 200){
                var parseBody = JSON.parse(body)
                res.send(parseBody);
            }
        }
    )
})


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'nine9jalist/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'nine9jalist/build', 'index.html'));
    });
  }

app.listen(port, () => console.log(`Example app listening on port ${port}`))