import express = require('express');
import path = require('path');
import SwaggerExpress = require('swagger-express-mw');

var app = express();
module.exports = app; // for testing

var config = {
  appRoot: path.resolve(__dirname, '..')
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
