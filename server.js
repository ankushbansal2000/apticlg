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
app.use(function (req, res, next){
    if (req.headers['x-forwarded-proto'] === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
  });

app.listen(process.env.PORT || 4600);