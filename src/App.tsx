import React, {useState} from 'react';
import './App.css';
import PlotItem from './components/PlotItem';
// @ts-ignore
import NumericInput from "react-numeric-input";
import Table from "./components/DynamicTable";
import SettingsFile from "./components/SettingsFile";
import DynamicNumericInput from "./components/DynamicNumericInput";
import Linear from "./methods/Linear";
import Quadratic from "./methods/Quadratic";
import Power from "./methods/Power";
import Exponential from "./methods/Exponential";
import Logarifmic from "./methods/Logarifmic";

function App() {
    const [points, setPoints]: [{ x: number, y: number }[], any] = useState([]);

    const [value, setValue] = useState(0);


    let plots: { x: number[], y: number[], mode: string, name: string }[]
    plots = []
    {
        let x_vals: number[] = []
        let y_vals: number[] = []
        for (let i = 0; i < points.length; i++) {
            x_vals.push(points[i].x)
            y_vals.push(points[i].y)
        }
        plots.push({x: x_vals, y: y_vals, mode: "markers", name: "Source data"})
    }

    const headers: string[] = [];
    const pushToHeaders = (headers_from_method: string[]) => {
        for (let i in headers_from_method) {
            if (!headers.includes(headers_from_method[i])) {
                headers.push(headers_from_method[i])
            }
        }
    }

    const linearResult = Linear(points)
    const quadraticResult = Quadratic(points)
    const powerResult = Power(points)
    const expResult = Exponential(points)
    const logResult = Logarifmic(points)

    plots.push(quadraticResult.plot)
    plots.push(linearResult.plot)
    plots.push(powerResult.plot)
    plots.push(expResult.plot)
    plots.push(logResult.plot)

    pushToHeaders(quadraticResult.headers)
    pushToHeaders(linearResult.headers)
    pushToHeaders(powerResult.headers)
    pushToHeaders(expResult.headers)
    pushToHeaders(logResult.headers)
    // pushToHeaders(['best'])

    const data = [
        linearResult.data,
        quadraticResult.data,
        powerResult.data,
        expResult.data,
        logResult.data,
    ]
    let min_delta = 100000
    let best_method = ''
    for (let i in data) {
        if (data[i].delta < min_delta) {
            min_delta = data[i].delta
            best_method = data[i].Method
        }
    }

    return (
        <div className="App">
            <h3>Лабораторная работа №4 по вычислительной математике. Крюков Андрей, P3214</h3>
            <table className="App">
                <tr>
                    <td>Выбор функции:</td>
                    {/*@ts-ignore*/}
                    <td><DynamicNumericInput points={points} setPoints={setPoints}
                                             rerender={() => setValue(value => value + 1)}/></td>
                </tr>
            </table>
            <SettingsFile setSettings={(text: string) => {
                try {
                    let obj = JSON.parse(text)
                    if (!('data' in obj)) {
                        throw SyntaxError("Bad file")
                    }
                    setPoints(obj['data'])
                } catch (e) {
                    alert("File is not correct")
                }
            }}/>
            <PlotItem plots={plots}/>
            <div>Best method is: {best_method}, with delta = {min_delta}</div>
            <Table data={data} header={headers}/>
        </div>
    );
}

export default App;
