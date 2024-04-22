const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Calculator Microservice App running successfully');
});

// Endpoint for addition operation
app.get('/addition', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    arithmeticOperation(res, num1, num2, (a, b) => a + b);
});

// Endpoint for subtraction operation
app.get('/subtraction', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    arithmeticOperation(res, num1, num2, (a, b) => a - b);
});

// Endpoint for multiplication operation
app.get('/multiplication', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    arithmeticOperation(res, num1, num2, (a, b) => a * b);
});

// Endpoint for division operation
app.get('/division', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    arithmeticOperation(res, num1, num2, (a, b) => {
        if (b === 0) throw new Error('Cannot divide by zero.');
        return a / b;
    });
});

// Endpoint for exponentiation operation
app.get('/exponent', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    arithmeticOperation(res, num1, num2, Math.pow, true);
});

// Endpoint for square root operation
app.get('/squareroot', (req, res) => {
    const num1 = req.query.num1;
    arithmeticOperation(res, num1, null, Math.sqrt, true);
});

// Endpoint for modulo operation
app.get('/modulo', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    arithmeticOperation(res, num1, num2, (a, b) => a % b);
});

// Endpoint for sine operation
app.get('/sine', (req, res) => {
    const num1  = req.query.num1;
    arithmeticOperation(res, num1, null, Math.sin, true);
});

// Endpoint for cosine operation
app.get('/cosine', (req, res) => {
    const num1 = req.query.num1;
    arithmeticOperation(res, num1, null, Math.cos, true);
});

// Endpoint for tangent operation
app.get('/tangent', (req, res) => {
    const num1 = req.query.num1;
    arithmeticOperation(res, num1, null, Math.tan, true);
});


// This function performs the desired arithmetic operation
function arithmeticOperation(res, num1, num2, resultOp, flag = false) {
    try {
        const a = parseFloat(num1);
        if (isNaN(a)) {
            throw new Error('Please check whether numbers are valid.');
        }

        if (flag) {
            const result = resultOp(a);
            res.json({ result });
        } else {
            const b = parseFloat(num2);
            if (isNaN(b)) {
                throw new Error('Please check whether numbers are valid.');
            }
            const result = resultOp(a, b);
            res.json({ result });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});
