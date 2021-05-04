function Linear(points: { x: number, y: number }[]) {
    let answ = 0
    let prev_answ = 100000000
    let n = 2
    let sx = 0
    let sy = 0
    let sxx = 0
    let sxy = 0

    let max_x = -100000
    let min_x = 100000

    for (let i in points) {
        max_x = Math.max(points[i].x, max_x)
        min_x = Math.min(points[i].x, min_x)
        sx += points[i].x
        sy += points[i].y
        sxy += points[i].x * points[i].y
        sxx += points[i].x * points[i].x
    }
    let delta = sxx * points.length - sx * sx;
    let delta_1 = sxy * points.length - sx * sy;
    let delta_2 = sxx * sy - sx * sxy;
    let a = delta_1 / delta
    let b = delta_2 / delta
    const plot_x = []
    const plot_y = []
    for (let i = min_x - (max_x - min_x) / 5; i < max_x + (max_x - min_x) / 5; i += 0.001) {
        plot_x.push(i)
        plot_y.push(a * i + b)
    }
    let S = 0
    for (let i in points) {
        S += Math.pow(a * points[i].x + b - points[i].y, 2)
    }
    let kp = 0
    let sch = 0
    let sznx = 0
    let szny = 0
    for (let i in points) {
        sch += (points[i].x - sx / points.length) * (points[i].y - sy / points.length)
        sznx += (points[i].x - sx / points.length) * (points[i].x - sx / points.length)
        szny += (points[i].y - sy / points.length) * (points[i].y - sy / points.length)
    }
    kp = sch / Math.sqrt(szny * sznx)
    return {
        headers: ["Method", 'a', 'b', 'S', 'delta', 'koef Pirsona'],
        data: {'a': a, 'b': b, S: S, Method: "Linear(ax+b)", delta: Math.sqrt(S / points.length), 'koef Pirsona': kp},
        plot: {x: plot_x, y: plot_y, mode: "lines", "name": "Linear"}
    }
}

export default Linear;