class BrokenLine {
    constructor(color, ...arrCoord){
        this.color = color;
        this.arr = [];
        this.arr.push(...arrCoord);
        this.render();
    }

    render() {
        if (!this.arr[0].length) {
            this.drawShape(this.arr[0], this.arr[1], this.arr[2], this.arr[3]);
            return;
        }
        for (let i = 0; i < (this.arr[0].length - 3); i += 2) {
            this.drawShape(this.arr[0][i], this.arr[0][i+1], this.arr[0][i + 2], this.arr[0][i + 3]);
        }
    }

    drawShape(x, y, x1, y1) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    isPointWithin(x, y) {
        let xPoint, yPoint, perpen;
       for (let i = 0; i < (this.arr[0].length - 3); i += 2) {
            let coordsLine = [];
            coordsLine.push(this.arr[0][i], this.arr[0][i+1], this.arr[0][i + 2], this.arr[0][i + 3]);
            if ((x - coordsLine[0]) * (coordsLine[2] - coordsLine[0]) + (y - coordsLine[0])*(coordsLine[3] - coordsLine[1]) < 0) {
                xPoint = coordsLine[0];
                yPoint = coordsLine[1];
            }
            else if (coordsLine[2] - coordsLine[0] === 0) {
                xPoint = coordsLine[0];
                yPoint = y;
            } else if (coordsLine[3] - coordsLine[1] === 0) {
                xPoint = x;
                yPoint = coordsLine[1];
            } else {
                let a = coordsLine[2] - coordsLine[0];
                let b = coordsLine[3] - coordsLine[1];
                yPoint = (((a**2)/b) * coordsLine[1] + a * (x - coordsLine[0]) + b * y) / ((a**2)/b + b);
                xPoint = (a/b) * (yPoint - coordsLine[1]) + coordsLine[0];
            }
            perpen = Math.sqrt((x - xPoint)**2 + (y - yPoint)**2);
            if (perpen < 1) {
                this.color = '#ff0000';
                return true;
            }
        }
        return false;
    }

    setCoord(x, y) {
        for (let i = 0; i < (this.arr[0].length); i += 2) {
            this.arr[0][i] += x;
        }
        for (let j = 1; j < (this.arr[0].length); j += 2) {
            this.arr[0][j] += y;
        }
    }
}

class Rectangle {
    constructor(baseX, baseY, endX, endY, color) {
        this.baseX = baseX;
        this.baseY = baseY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
        this.render();
    }

    render() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let width = this.endX - this.baseX;
        let height = this.endY - this.baseY;
        ctx.beginPath();
        ctx.moveTo(this.baseX, this.baseY);
        ctx.strokeStyle = this.color;
        ctx.strokeRect(this.baseX, this.baseY, width, height);
        ctx.stroke();
    }

    isPointWithin(x, y) {
        let xPoint, yPoint;
        let coordsRect = [];
        coordsRect.push(this.baseX, this.baseY, this.endX, this.baseY, this.endX, this.endY, this.baseX, this.endY, this.baseX, this.baseY);
        for (let i = 0; i < (coordsRect.length - 3); i += 2) {
            let coordsLine = [];
            coordsLine.push(coordsRect[i], coordsRect[i+1], coordsRect[i + 2], coordsRect[i + 3]);
            if (coordsLine[2] - coordsLine[0] === 0) {
                xPoint = coordsLine[0];
                yPoint = y;
            } else if (coordsLine[3] - coordsLine[1] === 0) {
                xPoint = x;
                yPoint = coordsLine[1];
            } else {
                let a = coordsLine[2] - coordsLine[0];
                let b = coordsLine[3] - coordsLine[1];
                xPoint = (a/b) * (coordsLine[3] - coordsLine[1]) + coordsLine[0];
                yPoint = (((a**2)/b) * coordsLine[1] + a * (x - coordsLine[0]) + b * y) / ((a**2)/b + b);
            }
            let perpen = Math.sqrt((x - xPoint)**2 + (y - yPoint)**2);
            console.log(perpen);
            if (perpen < 5) {
                this.color = '#ff0000';
                return console.log(true);
            }
        }
        return console.log(false);
    }
}

class Circle {
    constructor(baseX, baseY, endX, endY, color) {
        this.baseX = baseX;
        this.baseY = baseY;
        this.endX = endX;
        this.endY = endY;
        this.color = color;
        this.render();
    }
    render() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let radius = Math.sqrt((this.endX - this.baseX) ** 2 + (this.endY - this.baseY) ** 2);
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.baseX, this.baseY, radius, 0, Math.PI * 2, false);
        ctx.stroke();
    }
    isPointWithin(x, y) {
        let t = 10;
        if (Math.abs(Math.sqrt((x - this.baseX)**2 + (y - this.baseY)**2) - Math.sqrt((this.endX - this.baseX) ** 2 + (this.endY - this.baseY) ** 2)) <= t) {
            this.color = '#ff0000';
            return true;
        }
        return false;
    }
}

class CanvasVectorEditor {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.colorPicker = document.getElementById('colors');
        this.color = '#019192';
        this.coords = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
        };
        this.amountCoords = [];
        this.arrayOfShapes = [];
        this.move = this.mouseMove.bind(this);
        this.mouseDown = function(event) {
            this.amountCoords = [];
            const positionBox = this.canvas.getBoundingClientRect();
            let canvasX = Math.round(event.clientX - positionBox.left);
            this.coords.x = canvasX;
            let canvasY = Math.round(event.clientY - positionBox.top);
            this.coords.y = canvasY;
            this.coords.vx = this.coords.x;
            this.coords.vy = this.coords.y;
            this.amountCoords.push(this.coords.x, this.coords.y);
            this.canvas.addEventListener('mousemove', this.move);
        }
        this.remove = document.getElementById('remove');
        this.initializeSubscriptions();
    }
    

    initializeSubscriptions() {
        this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
        this.canvas.addEventListener('mouseup', () => { this.finishShape() }, false );
        this.colorPicker.addEventListener("input", this.newColor.bind(this), false);
        this.colorPicker.addEventListener("change", this.watchColorPicker.bind(this), false);
        this.remove.addEventListener("click", this.removeAll.bind(this), false);
    }

    removeAll() {
        this.arrayOfShapes.splice(0, this.arrayOfShapes.length);
        this.clear();
    }

    newColor(event) {
        this.color = event.target.value;
    }

    watchColorPicker(event) {
        this.color = event.target.value
    }

    finishShape() {
        let shape;
        this.canvas.removeEventListener('mousemove', this.move);
        switch (this.getControlType()) {
            case "new":
                // let x = this.coords.x;
                // let y = this.coords.y;
                // this.arrayOfShapes.forEach(function(item) {
                //     item.isPointWithin(x, y);
                // });
                break;
            case "pencil":
                this.clear();
                shape = new BrokenLine(this.color, this.amountCoords);
                this.arrayOfShapes.push(shape);
                break;
            case "rectangle":
                this.clear();
                shape = new Rectangle(this.coords.x, this.coords.y, this.coords.vx, this.coords.vy, this.color);
                this.arrayOfShapes.push(shape);
                break;
            case "circle":
                this.clear();
                shape = new Circle(this.coords.x, this.coords.y, this.coords.vx, this.coords.vy, this.color);
                this.arrayOfShapes.push(shape);
                break;
        }
        this.arrayOfShapes.forEach(function(item){
            item.render();
        })
    }

    drawShape(x, y, vx, vy, controlType, color) {
        let shape;
        switch (controlType) {
            case "new":
                let xPoint = this.coords.x;
                let yPoint = this.coords.y;
                let deltaX = this.coords.vx - this.coords.x;
                let deltaY = this.coords.vy - this.coords.y;
                this.arrayOfShapes.forEach(function(item) {
                    if (item.isPointWithin(xPoint, yPoint)) {
                        item.setCoord(deltaX, deltaY);
                    }
                });
                this.clear();
                break;
            case "pencil":
                shape = new BrokenLine(color, x, y, vx, vy);
                break;
            case "rectangle":
                this.clear();
                new Rectangle(x, y, vx, vy, color);
                break;
            case "circle":
                this.clear();
                new Circle(x, y, vx, vy, color);
                break;
        }
        this.arrayOfShapes.forEach(function(item){
            item.render();
        })
    }

    moveShape(shape) {
        shape.setCoord(x, y)
    }

    clear() {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    getControlType() {
        let button = document.querySelectorAll('.canvas-checkbox');
        for (let elem of button) {
            if (elem.checked) {
                return `${elem.getAttribute('data-control')}`;
            };
        }
    }

    lineTo(array, x, y) {
        array.push(x, y);
    }

    mouseMove(event) {
        let type = this.getControlType;
        let color = this.color;

            let positionBox = event.target.getBoundingClientRect();
            let canvasX = Math.round(event.clientX - positionBox.left);
            this.coords.vx = canvasX;
            let canvasY = Math.round(event.clientY - positionBox.top);
            this.coords.vy = canvasY;
            
            this.drawShape(this.coords.x, this.coords.y, this.coords.vx, this.coords.vy, type(), color);
            if (type() === 'pencil') {
                this.lineTo(this.amountCoords, this.coords.vx, this.coords.vy);
                this.coords.x = this.coords.vx;
                this.coords.y = this.coords.vy;
            }
    }
}

let goDrow = new CanvasVectorEditor();