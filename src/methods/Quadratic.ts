import Gauss from "../services/Gauss";

function Quadratic(points: { x: number, y: number }[]) {
    let answ = 0
    let prev_answ = 100000000
    let n = 2
    let sx = 0
    let sxx = 0
    let sxxx = 0
    let sxxxx = 0
    let sy = 0
    let sxy = 0
    let sxxy = 0

    let max_x = -100000
    let min_x = 100000

    for (let i in points) {
        max_x = Math.max(points[i].x, max_x)
        min_x = Math.min(points[i].x, min_x)
        sx += points[i].x
        sy += points[i].y
        sxy += points[i].x * points[i].y
        sxxy += points[i].x * points[i].x * points[i].y
        sxx += points[i].x * points[i].x
        sxxx += points[i].x * points[i].x * points[i].x
        sxxxx += points[i].x * points[i].x * points[i].x * points[i].x
    }

    const A = [
        [points.length, sx, sxx],
        [sx, sxx, sxxx],
        [sxx, sxxx, sxxxx]
    ]
    const B = [
        sy,
        sxy,
        sxxy
    ]
    const result = Gauss(A, B)
    const a = result[2]
    const b = result[1]
    const c = result[0]
    console.log(A, B, result)
    const plot_x = []
    const plot_y = []
    for (let i = min_x - (max_x - min_x) / 5; i < max_x + (max_x - min_x) / 5; i += 0.001) {
        plot_x.push(i)
        plot_y.push(a * i * i + c + b * i)
    }

    let S = 0
    for (let i in points) {
        S += Math.pow(a * points[i].x * points[i].x + c + b * points[i].x - points[i].y, 2)
    }

    return {
        headers: ["Method", 'a', 'b', 'c', 'S', 'delta'],
        data: {'a': a, 'b': b, 'c': c, S: S, Method: "Quadratic(ax^2+bx+c)", delta: Math.sqrt(S/points.length)},
        plot: {x: plot_x, y: plot_y, mode: "lines", "name": "Quadratic"}
    }
}

export default Quadratic;