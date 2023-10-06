import path from 'path';
import fs from 'fs';
import Controller from './Controller.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }
    get(id) {
        let params = this.HttpContext.path.params;
        let op = params.op;
        let x = parseFloat(params.x);
        let y = parseFloat(params.y);
        let n = parseFloat(params.n);
        if (params.op == " ") { params.op = "+"; }
        let message;


        if (this.HttpContext.path.queryString == "?") {
            let helpPagePath = path.join(process.cwd(), wwwroot, 'help.html');
            this.HttpContext.response.HTML(fs.readFileSync(helpPagePath));
        }
        else {
            if (this.HttpContext.path.queryString.includes('x') && this.HttpContext.path.queryString.includes('y')) {
                if (Object.keys(params).length == 3) {
                    OperationsWithTwoVariables(op, x, y, message, this.HttpContext, params);
                }
                else {
                    params.error = "Too much parameters";
                    return this.HttpContext.response.JSON(params);
                }
            }
            else if (this.HttpContext.path.queryString.includes('n')) {
                if (Object.keys(params).length == 2) {
                    OperationsWithNumber(n, op, message, this.HttpContext, params);
                }
                else {
                    params.error = "Too much parameters";
                    return this.HttpContext.response.JSON(params);
                }
            }
            else {
                if (!this.HttpContext.path.queryString.includes('x') && !this.HttpContext.path.queryString.includes('y')) {
                    params.error = "'x' and 'y' parameter is missing!"
                }
                else if (!this.HttpContext.path.queryString.includes('x')) {
                    params.error = "'x' parameter is missing!"
                }
                else if (!this.HttpContext.path.queryString.includes('y')) {
                    params.error = "'y' parameter is missing!"
                }
                return this.HttpContext.response.JSON(params);
            }
        }
    }
}




function OperationsWithTwoVariables(op, x, y, message, HttpContext, params) {
    if (op == "*") {
        console.log("entrer");
        let result = x * y;
        console.log(result);
        params.value = result
        return HttpContext.response.JSON(params);
    }
    else if (op == "-") {
        let result = x - y;
        params.value = result
        return HttpContext.response.JSON(params);
    }
    else if (op == "/") {
        if (y != 0) {
            let result = x / y;
            params.value = result
        }
        else if (y == 0 && x == 0) {
            params.value = "NaN";
        }
        else {
            params.value = "Infinity";
        }
        return HttpContext.response.JSON(params);
    }
    else if (op == "+" || op == " ") {
        let result = x + y;
        params.value = result
        return HttpContext.response.JSON(params);
    }
    else if (op == "%") {
        if (y != 0) {
            let result = x % y;
            params.value = result
        }
        else {
            params.value = "NaN";
        }
        return HttpContext.response.JSON(params);
    }
    else {
        return HttpContext.response.notFound("Operation inexistante");
    }
}
function OperationsWithNumber(n, op, message, HttpContext, params) {
    if (op == "p") {
        if (!Number.isInteger(n)) {
            params.error = "'n' parameter is not a integer";
        }
        else if (n != 0) {

            let result = isPrime(n)
            params.value = result
        }
        else {
            params.error = "'n' parameter must be a integer > 0";
        }
        return HttpContext.response.JSON(params);
    }
    else if (op == "!") {
        if (!Number.isInteger(n)) {
            params.error = "'n' parameter is not a integer";
        }
        else if (n < 0) {
            params.error = "'n' parameter must be a integer > 0";
        }
        else if (n != 0) {
            let result = factorial(n);
            params.value = result
        }
        else {
            params.error = "'n' parameter must be a integer > 0";
        }
        return HttpContext.response.JSON(params);
    }
    else if (op == "np") {
        let result = findNthPrime(n)
        params.value = result
        return HttpContext.response.JSON(params);
    }
    else {
        return HttpContext.response.notFound("Operation inexistante");
    }
}
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
function findNthPrime(n) {
    let count = 0;
    let num = 2;
    while (count < n) {
        if (isPrime(num)) {
            count++;
        }
        num++;
    }
    return num - 1;
}
const isPrime = num => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}
