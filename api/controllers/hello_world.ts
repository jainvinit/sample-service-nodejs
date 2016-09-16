'use strict';

import express = require('express');
import swagger = require('swagger-express-mw');
import util = require('util');

class HelloController {
  public hello(req:swagger.Request, res:express.Response) {
    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var name = req.swagger.params['name'].value || 'stranger';
    var hello = util.format('Hello, %s!', name);

    // this sends back a JSON response which is a single string
    res.json(hello);
  }
}

var _helloController = new HelloController();

module.exports = {
  hello: _helloController.hello.bind(_helloController) 
}; 
