
var express = require('express');
var app = express();

app.get('/:operation/:num1/:num2', function (req: any, res: any) {

    let operation: string = req.params.operation;
    let num1: number = parseInt(req.params.num1);
    let num2: number = parseInt(req.params.num2);

    let result: number = 0;

    switch(operation){
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


