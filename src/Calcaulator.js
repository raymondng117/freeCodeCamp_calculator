import { useEffect, useState } from "react";
import Decimal from "decimal.js"; 
import NumberButtons from "./Buttons";

const Calculator = () => {
    let [calc, setCalc] = useState({
        num: "0",
        display: 0,
    });

    const operators = ["AC", "+", "-", "x", "/", "="];
    const operatorsID = ["clear", "add", "subtract", "multiply", "divide", "equals"];

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
    const numbersID = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero", "decimal"];

    const buttonClass = "display-2  btn btn-primary m-2"

    const [negative, setNegative] = useState(false)

    const [perviousNum, setPerviousNumber] = useState(null)
    const [currentNum, setCurrentNumber] = useState(null)

    const [perviousOperator, setPerviousOperator] = useState("")
    const [currentOperator, setCurrentOperator] = useState("")

    const [result, setResult] = useState(null)


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

    const handleOperatorChange = (operatorIndex) => {
        setNegative(false)

        console.log(calc.num)

        let pasredNum = parseFloat(calc.num)
        console.log(pasredNum)

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
            console.log("I DID AC")
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

    const numClickHandler = (e) => {
        e.preventDefault();
        let value = e.target.innerHTML;

        if (!negative) {
            setCalc(prevStoredNum => ({
                ...prevStoredNum,
                num:
                    (prevStoredNum.num === "0" && value !== ".") ? value : // Replace leading zero
                        (value === "0" && prevStoredNum.num.toString().startsWith("0")) ? prevStoredNum.num : // Ignore additional zeros
                            (value === "." && prevStoredNum.num.includes(".")) ? prevStoredNum.num : // Ignore additional decimals
                                prevStoredNum.num + value,
                display:
                    (prevStoredNum.num === "0" && value !== ".") ? value : // Replace leading zero
                        (value === "0" && prevStoredNum.num.toString().startsWith("0")) ? prevStoredNum.num : // Ignore additional zeros
                            (value === "." && prevStoredNum.num.includes(".")) ? prevStoredNum.num : // Ignore additional decimals
                                prevStoredNum.num + value,
            }));
        } else {
            setCalc(prevStoredNum => ({
                ...prevStoredNum,
                num:
                    (prevStoredNum.num === "0" && value !== ".") ? value * -1 : // Replace leading zero
                        (value === "0" && prevStoredNum.num.toString().startsWith("0")) ? prevStoredNum.num : // Ignore additional zeros
                            (value === "." && prevStoredNum.num.includes(".")) ? prevStoredNum.num : // Ignore additional decimals
                                (prevStoredNum.num + value) * -1 ,
                display:
                    (prevStoredNum.num === "0" && value !== ".") ? value * -1 : // Replace leading zero
                        (value === "0" && prevStoredNum.num.toString().startsWith("0")) ? prevStoredNum.num : // Ignore additional zeros
                            (value === "." && prevStoredNum.num.includes(".")) ? prevStoredNum.num : // Ignore additional decimals
                                (prevStoredNum.num + value) * -1,
            }));
        }

    };
    //     document.getElementById("display").textContent = ""
    //     let number = numbers[numberIndex]

    //     displayArray.push(number)
    //     concatenatedNumberString = displayArray.join("").replace(/\.{2,}/g, '.')
    //     formattedNumber = parseFloat(concatenatedNumberString)
    //     // if you want to catch any valid number from "concatenatedNumber", you can not use any useState here!!
    //     if (displayContent.startsWith("0")) {
    //         if (number == "0") {
    //             number = ""
    //         }
    //     }
    //     if (displayContent.includes(".")) {
    //         if (number == ".") {
    //             number = ""
    //         }
    //     }
    //     displayContent += number;
    //     document.getElementById("display").textContent = displayContent;

    //     console.log("formattedNumber: " + formattedNumber)
    //     console.log("")
    // }





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