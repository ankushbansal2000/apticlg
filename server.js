const express = require('express');
const app = express();

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/apticlg'));
// Start the app by listening on the default

// Heroku port
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname + '/dist/apticlg/index.html'));
});


app.listen(process.env.PORT || 4600);