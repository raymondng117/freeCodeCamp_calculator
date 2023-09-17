import { useEffect, useState } from "react";
import Decimal from "decimal.js";
import NumberButtons from "./Buttons";

const Calculator = () => {
    // ** initialize calc as an object having a combinated state of "num" and "display" 
    let [calc, setCalc] = useState({
        num: "0",
        display: 0,
    });

    const operators = ["AC", "+", "-", "x", "/", "="];
    const operatorsID = ["clear", "add", "subtract", "multiply", "divide", "equals"];

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
    const numbersID = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero", "decimal"];

    const [negative, setNegative] = useState(false)
    const [result, setResult] = useState(null)


    const [perviousNum, setPerviousNumber] = useState(null)
    const [currentNum, setCurrentNumber] = useState(null)

    const [perviousOperator, setPerviousOperator] = useState("")
    const [currentOperator, setCurrentOperator] = useState("")


    function calculate(perviousNum, currentNum, operator) {
        const decimalPreviousNum = new Decimal(perviousNum);
        const decimalCurrentNum = new Decimal(currentNum)
        switch (operator) {
            case "+":
                setResult(decimalPreviousNum.plus(decimalCurrentNum));
                break;

            case "-":
                setResult(decimalPreviousNum.minus(decimalCurrentNum));
                break;

            case "x":
                setResult(decimalPreviousNum.times(decimalCurrentNum));
                break;

            case "/":
                setResult(decimalPreviousNum.dividedBy(decimalCurrentNum));
                break;

        }


    }

    const numClickHandler = (e) => {
        e.preventDefault();
        // capture the number value from button being clicked
        let value = e.target.innerHTML;

        // check the nagative state, when the state is false which mean wanna positive calc 
        if (!negative) {
            // prevStoredNum is an object including num and display!!!! 
            setCalc(prevStoredNum => ({
                ...prevStoredNum,
                // determine the num's state based on conditions
                num:
                    // For first number clicking, if the coming number value is not ".", num state should be a number without leading zero (0 => 12)
                    (prevStoredNum.num === "0" && value !== ".") ? value : // Replace leading zero

                        // For first number clicking,, if the coming number value is 0, num state will ignore additional zeros
                        (prevStoredNum.num === "0" && value === "0") ? prevStoredNum.num : // Ignore additional zeros

                            // When the prevStoredNum.num (accumulated num) has a "." already, any additional coming "." will be ignored
                            (value === "." && prevStoredNum.num.includes(".")) ?
                                prevStoredNum.num : // Ignore additional decimals

                                // Otherwise, keep accumulating the num with every number clicking
                                prevStoredNum.num + value,


                display:
                    // For first number clicking, if the coming number value is not ".", num state should be a number without leading zero (0 => 12)
                    (prevStoredNum.num === "0" && value !== ".") ? value : // Replace leading zero

                        // For first number clicking,, if the coming number value is 0, num state will ignore additional zeros
                        (prevStoredNum.num === "0" && value === "0") ? prevStoredNum.num : // Ignore additional zeros

                            // When the prevStoredNum.num (accumulated num) has a "." already, any additional coming "." will be ignored
                            (value === "." && prevStoredNum.num.includes(".")) ?
                                prevStoredNum.num : // Ignore additional decimals

                                // Otherwise, keep accumulating the num with every number clicking
                                prevStoredNum.num + value,
            }));

        } else {

            setCalc(prevStoredNum => ({
                ...prevStoredNum,
                num:
                    (prevStoredNum.num === "0" && value !== ".") ? value * -1 : // Replace leading zero
                        (value === "0" && prevStoredNum.num.toString().startsWith("0")) ?
                            prevStoredNum.num : // Ignore additional zeros
                            (value === "." && prevStoredNum.num.includes(".")) ?
                                prevStoredNum.num : // Ignore additional decimals
                                (prevStoredNum.num + value) * -1,
                display:
                    (prevStoredNum.num === "0" && value !== ".") ? value * -1 : // Replace leading zero
                        (value === "0" && prevStoredNum.num.toString().startsWith("0")) ?
                            prevStoredNum.num : // Ignore additional zeros
                            (value === "." && prevStoredNum.num.includes(".")) ?
                                prevStoredNum.num : // Ignore additional decimals
                                (prevStoredNum.num + value) * -1,
            }));
        }

    };

    const handleOperatorChange = (operatorIndex) => {
        // every time click a new operator should set back the negative status to be "false"
        // which assumes every new operator is initially to make positive calc
        setNegative(false)

        // parse the num which is in string format to be float format 
        let pasredNum = parseFloat(calc.num)
        let operator = operators[operatorIndex]

        if (operator !== "AC") {
            if (!perviousOperator) {
                if (result) {
                    setPerviousOperator(operator)
                    setPerviousNumber(result)
                } else {
                    setPerviousOperator(operator)
                }

            } else {
                if (perviousOperator == "=") {
                    setPerviousOperator(operator)
                    setPerviousNumber(result)
                    setCalc({
                        display: result
                    })
                } else if (!currentOperator) {
                    // deal with negative number
                    if (operator == "-") {
                        setNegative(true)
                    } else {
                        setCurrentOperator(operator)
                    }
                } else {
                    if (operator == "-") {
                        if (pasredNum < 0) {
                            setCurrentNumber(pasredNum)
                        }
                        else {
                            setNegative(true)
                            setPerviousOperator(currentOperator)
                            setCurrentOperator(operator)
                            setCurrentNumber(pasredNum)
                        }

                    } else {
                        if (operator == "=") {
                            if (pasredNum > 0) {
                                setCurrentNumber(pasredNum)
                                setPerviousOperator(currentOperator)
                            } else {
                                setCurrentNumber(pasredNum)
                            }

                        } else {
                            setPerviousOperator(currentOperator)
                            setCurrentOperator(operator)
                            setCurrentNumber(pasredNum)
                            setCurrentNumber(result)
                        }

                    }
                }
            }

            if (!perviousNum) {
                if (result) {
                    setPerviousNumber(result)
                    setCurrentNumber(pasredNum)
                    setResult(null)
                } else {
                    setPerviousNumber(pasredNum)
                }

            } else {
                if (!currentNum) {
                    if (!result) {
                        setCurrentNumber(pasredNum)
                        setCurrentOperator(operator)
                    } else {
                        setCurrentNumber(pasredNum)
                    }
                } else {
                    setPerviousNumber(parseFloat(result))
                }
            }

            setCalc({
                num: "0",
                display:
                    (result)
                        ? parseFloat(result)
                        : pasredNum
            })

        } else {
            setCalc({
                num: "0",
                display: 0
            })
            setCurrentNumber(null)
            setPerviousNumber(null)
            setPerviousOperator("")
            setCurrentOperator("")
            setResult(null)
        }
    }

    // after pre-setting all data state, use them only within useEffect, and then you can set their state back
    // result only can be processed in *useEffect* untill all factors are set before the useEffect
    useEffect(() => {
        if (negative) {
            if (!currentNum) {
            } else {
                calculate(perviousNum, currentNum, perviousOperator)
                setCurrentOperator("-")
                setNegative(false)
            }
        }

        if (perviousNum && currentNum && perviousOperator && currentOperator && !result) {
            if (currentOperator === "=") {
                calculate(perviousNum, currentNum, perviousOperator)
                setPerviousNumber(null)
                setCurrentNumber(null)
                setPerviousOperator(currentOperator)
                setCurrentOperator(null)
            } else {
                calculate(perviousNum, currentNum, perviousOperator)
                setPerviousOperator(currentOperator)
                setPerviousNumber(null)
                setCurrentNumber(null)
            }

            // use result as a determinator to determine whether it is a chain calculation
        } else if (perviousNum && currentNum && perviousOperator && currentOperator && result) {

            if (currentOperator === "=") {
                calculate(perviousNum, currentNum, perviousOperator)
                setPerviousNumber(null)
                setCurrentNumber(null)
                setPerviousOperator(currentOperator)
                setCurrentOperator(null)
            } else {
                calculate(perviousNum, currentNum, perviousOperator)
                setPerviousOperator(currentOperator)
                setCurrentOperator(null)
                setPerviousNumber(null)
                setCurrentNumber(null)
            }
        }

        if (result) {
            document.getElementById("display").textContent = result
        }

        console.log("perviousOperator: " + perviousOperator)
        console.log("currentOperator:" + currentOperator)
        console.log("perviousNum:" + perviousNum)
        console.log("currentNum:" + currentNum)
        console.log("result: " + result)
        console.log("")

    }, [handleOperatorChange])

    return (
        <div className="container mt-5 border">
            <div className="row">
                <div className="col-12">
                    <div className="display-4 bg-secondary mb-3 p-3 text-end" id="display">
                        {calc.display}
                    </div>
                </div>
            </div>

            <div className="row" id="panel">
                <div className="col-12">
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                        {operators.map((operator, operatorIndex) => (
                            <button className="btn btn-primary btn-lg m-2" key={operatorIndex} id={operatorsID[operatorIndex]} onClick={() => handleOperatorChange(operatorIndex)}>{operator}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 
            create each number button with key, id and most important, the numberClicker 
            notes for onclick:
             1. when the callback function has no parameters, just call the function with out ();
             2. otherwise, onClick = {() => numClickHandler(parameter1, ...)}
            */}
            <div className="row" id="panel">
                <div className="col-12">
                    <div className="d-flex justify-content-center align-items-center flex-wrap">
                        {numbers.map((number, i) => (
                            <button className="btn btn-secondary btn-lg m-2" key={i} id={numbersID[i]} onClick={numClickHandler}>{number}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Calculator;