var express = require('express');
var app = express();
app.get('/:operation/:num1/:num2', function (req, res) {
    var operation = req.params.operation;
    var num1 = parseInt(req.params.num1);
    var num2 = parseInt(req.params.num2);
    var result = 0;
    switch (operation) {
        case 'dodaj':
            result = num1 + num2;
            break;
        case 'usun':
            result = num1 - num2;
            break;
        case 'podziel':
            result = num1 / num2;
            break;
        case 'pomnoz':
            result = num1 * num2;
            break;
    }
    res.send(operation + ': ' + result);
});
app.listen(3000);
