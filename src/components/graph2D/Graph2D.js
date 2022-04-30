import React from "react";
import Canvas from '../../modules/canvas/Canvas';
import UI from './UI/UI';

class Graph2D extends React.Component {
    constructor(props) {
        super(props);

        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
        };
        this.funcs = [];
        this.state = { funcsLength: this.funcs.length };
    }

    componentDidMount() {
        this.canvas = new Canvas({
            id: "canvas",
            WIN: this.WIN,
            width: 600,
            height: 600,
        });
        this.run();
    }

    printFunction(f, color, width) {
        let x = this.WIN.LEFT;
        const dx = this.WIN.WIDTH / 1000;
        while (x < this.WIN.LEFT + this.WIN.WIDTH) {
            this.canvas.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }
    }

    printIntegral(f, a, b, n = 100) {
        const dx = (b - a) / n;
        let x = a;
        const points = [];
        points.push({ x, y: 0 });
        while (x < b) {
            points.push({ x, y: f(x) });
            x += dx;
        }
        points.push({ x: b, y: 0 });
        this.canvas.polygon(points);
    }
    printXY() {
        const { LEFT, BOTTOM, WIDTH, HEIGHT } = this.WIN;
        //XY
        this.canvas.line(0, BOTTOM, 0, HEIGHT + BOTTOM, 'black');
        this.canvas.line(LEFT, 0, WIDTH + LEFT, 0, 'black');
        //Arrows
        this.canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, 0.15, 'black', 1.5);
        this.canvas.line(WIDTH + LEFT, 0, WIDTH + LEFT - 0.4, -0.15, 'black', 1.5);
        this.canvas.line(0, HEIGHT + BOTTOM, -0.15, HEIGHT + BOTTOM - 0.4, 'black', 1.5);
        this.canvas.line(0, HEIGHT + BOTTOM, 0.15, HEIGHT + BOTTOM - 0.4, 'black', 1.5);
        //Text
        this.canvas.text('0', 0.5, -0.7);
        this.canvas.text('1', 1, 1);
        this.canvas.text('-1', -1, -1);
        this.canvas.text('x', WIDTH + LEFT - 0.4, -0.5);
        this.canvas.text('y', 0.5, HEIGHT + BOTTOM - 1);
        //Lines
        for (let i = 0; i < HEIGHT + BOTTOM; i++) {
            this.canvas.line(-0.2, i, 0.2, i, 'black', 1);
        }
        for (let i = 0; i > BOTTOM; i--) {
            this.canvas.line(-0.2, i, 0.2, i, 'black', 1);
        }
        for (let i = 0; i < WIDTH + LEFT; i++) {
            this.canvas.line(i, -0.2, i, 0.2, 'black', 1);
        }
        for (let i = 0; i > LEFT; i--) {
            this.canvas.line(i, -0.2, i, 0.2, 'black', 1);
        }
        //Net
        for (let i = 0; i > LEFT; i--) {
            this.canvas.line(i, BOTTOM + LEFT, i, HEIGHT + BOTTOM, 'black', 0.2);
        }
        for (let i = 0; i < HEIGHT + LEFT - BOTTOM + WIDTH; i++) {
            this.canvas.line(i, BOTTOM, i, 0, 'black', 0.2);
        }
        for (let i = 0; i < HEIGHT + LEFT + BOTTOM + WIDTH; i++) {
            this.canvas.line(i, 0, i, HEIGHT + BOTTOM, 'black', 0.2);
            this.canvas.line(LEFT, i, HEIGHT + LEFT, i, 'black', 0.2);
        }
        for (let i = 0; i > BOTTOM; i--) {
            this.canvas.line(LEFT + BOTTOM, i, WIDTH + LEFT, i, 'black', 0.2);
        }
        for (let i = 0; i < HEIGHT - LEFT + BOTTOM + WIDTH; i++) {
            this.canvas.line(LEFT, i, 0, i, 'black', 0.2);
        }
    }

    getDerivative(f, x0, dx = 0.00001) {
        return (f(x0 + dx) - f(x0)) / dx;
    }

    printTangent(f, x0) {
        const k = this.getDerivative(f, x0);
        let b = f(x0) - k * x0;
        let x1 = this.WIN.LEFT;
        let x2 = this.WIN.LEFT + this.WIN.WIDTH;
        let y = k * x1 + b;
        let y2 = k * x2 + b;
        this.canvas.line(x1, y, x2, y2, 'black', 1, (9, 5));
    }

    getZero(f, a, b, eps) {
        if (f(a) * f(b) > 0) {
            return null;
        }
        if (Math.abs(f(a) - f(b)) <= eps) {
            return (a + b) / 2;
        }
        var half = (a + b) / 2
        if (f(a) * f(half) <= 0) {
            return this.getZero(f, a, half, eps);
        }
        if ((f(half) * f(b)) <= 0) {
            return this.getZero(f, half, b, eps);
        }
    }

    getCross(f, g, a, b, eps) {
        if ((f(a) - g(a)) * (f(b) - g(b)) > 0) {
            return null;
        }
        if (Math.abs(f(a) - g(a)) <= eps) {
            return a
        }
        var half = (a + b) / 2
        if ((f(a) - g(a)) * (f(half) - g(half)) <= 0) {
            return this.getCross(f, g, a, half, eps);
        }
        if ((f(half) - g(half)) * (f(b) - g(b)) <= 0) {
            return this.getCross(f, g, half, b, eps);
        }
    }

    addFunction() {
        this.funcs.push({
            f: () => null,
            color: 'red',
            width: 2
        });
        this.setState({ funcsLength: this.funcs.length });
    }

    wheel(event) {
        const delta = (event.deltaY > 0) ? 1 : -1;
        this.WIN.WIDTH += delta;
        this.WIN.HEIGHT += delta;
        this.WIN.LEFT -= delta / 2;
        this.WIN.BOTTOM -= delta / 2;
        this.run();
    }

    down() {
        this.canMove = true;
    }

    up() {
        this.canMove = false;
    }

    move(event) {
        if (this.canMove) {
            this.WIN.LEFT -= this.canvas.sx(event.movementX);
            this.WIN.BOTTOM -= this.canvas.sy(event.movementY);
        }
        this.run();
    }

    run() {
        this.canvas.clear();
        this.printXY();
        this.funcs.forEach((func) => {
            if (func) {
                this.printFunction(func.f, func.color, func.width);
            }
        });
    }

    render() {
        return (
            <div>
                <canvas id="canvas"></canvas>
                <UI Key={this.state.funcsLength}
                    funcs={this.funcs}
                    addFunction={() => this.addFunction()}
                    run={() => this.run()}
                ></UI>
            </div>
        );
    }
}

export default Graph2D;