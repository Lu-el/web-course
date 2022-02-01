class BrokenLine {
    constructor(color, ...arrCoord){
        this.figure = 'BrokenLine';
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
        let perpen;
        for (let i = 0; i < (this.arr[0].length - 3); i += 2) {
            let coordsLine = [];
            coordsLine.push(this.arr[0][i], this.arr[0][i+1], this.arr[0][i + 2], this.arr[0][i + 3]);
            let a = Math.sqrt((coordsLine[2] - coordsLine[0])**2 + (coordsLine[3] - coordsLine[1])**2);
            let b = Math.sqrt((coordsLine[2] - x)**2 + (coordsLine[3] - y)**2);
            let c = Math.sqrt((coordsLine[0] - x)**2 + (coordsLine[1] - y)**2);
            let p = (a + b + c)/2;
            let h = 2 *(Math.sqrt(p * (p - a) * (p - b) * (p - c)))/a;
            let maxSide = Math.max(c, b);
            let minSide = Math.min(c, b);
            if (maxSide**2 > minSide**2 + a**2) {
                perpen = minSide;
            } else {
                perpen = h;
            }
            if (perpen < 10) return true;
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

    setColor(color) {
        this.color = color;
    }
}

class Rectangle {
    constructor(color, ...arrC) {
        this.figure = 'Rectangle';
        this.arr = [];
        this.arr.push(...arrC);
        this.color = color;
        this.render();
    }

    render() {
        if (this.arr.length == 1) {
            this.arr = this.arr.flat();
        }
        this.drawShape(this.arr[0], this.arr[1], this.arr[2], this.arr[3]);
    }

    drawShape(x, y, vx, vy) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let width = vx - x;
        let height = vy - y;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.strokeStyle = this.color;
        ctx.strokeRect(x, y, width, height);
        ctx.stroke();
    }

    isPointWithin(x, y) {
        let perpen;
        let coordsRect = [];
        coordsRect.push(this.arr[0], this.arr[1], this.arr[2], this.arr[1], this.arr[2], this.arr[3], this.arr[0], this.arr[3], this.arr[0], this.arr[1]);
        for (let i = 0; i < (coordsRect.length - 3); i += 2) {
            let coordsLine = [];
            coordsLine.push(coordsRect[i], coordsRect[i+1], coordsRect[i + 2], coordsRect[i + 3]);
            let a = Math.sqrt((coordsLine[2] - coordsLine[0])**2 + (coordsLine[3] - coordsLine[1])**2);
            let b = Math.sqrt((coordsLine[2] - x)**2 + (coordsLine[3] - y)**2);
            let c = Math.sqrt((coordsLine[0] - x)**2 + (coordsLine[1] - y)**2);
            let p = (a + b + c)/2;
            let h = 2 *(Math.sqrt(p * (p - a) * (p - b) * (p - c)))/a;
            let maxSide = Math.max(c, b);
            let minSide = Math.min(c, b);
            if (maxSide**2 > minSide**2 + a**2) {
                perpen = minSide;
            } else {
                perpen = h;
            }
            if (perpen < 10) return true;
       }
       return false;
    }

    setCoord(x, y) {
        for (let i = 0; i < (this.arr.length); i += 2) {
            this.arr[i] += x;
        }
        for (let j = 1; j < (this.arr.length); j += 2) {
            this.arr[j] += y;
        }
    }

    setColor(color) {
        this.color = color;
    }
}

class Circle {
    constructor(color, ...arr) {
        this.figure = 'Circle';
        this.arr = [];
        this.arr.push(...arr);
        this.color = color;
        this.render();
    }

    render() {
        if (this.arr.length == 1) {
            this.arr = this.arr.flat();
        }
        this.drawShape(this.arr[0], this.arr[1], this.arr[2], this.arr[3]);
    }

    drawShape(x, y, vx, vy) {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let radius = Math.sqrt((vx - x) ** 2 + (vy - y) ** 2);
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.stroke();
    }

    isPointWithin(x, y) {
        let t = 10;
        if (Math.abs(Math.sqrt((x - this.arr[0])**2 + (y - this.arr[1])**2) - Math.sqrt((this.arr[2] - this.arr[0]) ** 2 + (this.arr[3] - this.arr[1]) ** 2)) <= t) {
            return true;
        }
        return false;
    }

    setCoord(x, y) {
        for (let i = 0; i < (this.arr.length); i += 2) {
            this.arr[i] += x;
        }
        for (let j = 1; j < (this.arr.length); j += 2) {
            this.arr[j] += y;
        }
    }

    setColor(color) {
        this.color = color;
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
        this.movingshape;
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
            this.setMovingShape(this.arrayOfShapes);
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
        window.addEventListener('beforeunload', this.closeWindowAndTab.bind(this));
        window.addEventListener('load', this.loadWindow.bind(this))
    }

    loadWindow() {
        let shape;
        let shapes = this.arrayOfShapes;
        let returnObj = JSON.parse(localStorage.getItem('canvasPicture'));
        returnObj.forEach(function(item){
        switch (item.figure) {
            case "BrokenLine":
                shape = new BrokenLine(item.color, item.arr[0]);
                shapes.push(shape);
                break;
            case "Rectangle":
                shape = new Rectangle(item.color, item.arr);
                shapes.push(shape);
                break;
            case "Circle":
                shape = new Circle(item.color, item.arr);
                shapes.push(shape);
                break;
            }
        })
        shapes.forEach(function(item){
            item.render();
        })
    }

    closeWindowAndTab() {
        let file = this.arrayOfShapes;
        let savingFile = JSON.stringify(file);
        localStorage.setItem('canvasPicture', savingFile);
    }

    setMovingShape(array) {
        if (array.find(item => item.isPointWithin(this.coords.x, this.coords.y) == true)) {
            return this.movingshape = array.find(item => item.isPointWithin(this.coords.x, this.coords.y) == true);
        }
        return;
    }

    removeAll() {
        this.arrayOfShapes.splice(0, this.arrayOfShapes.length);
        this.clear();
    }

    newColor(event) {
        this.color = event.target.value;
    }

    watchColorPicker(event) {
        this.color = event.target.value;
        this.movingshape.setColor(this.color);
    }

    finishShape() {
        let shape;
        this.canvas.removeEventListener('mousemove', this.move);
        switch (this.getControlType()) {
            case "new":
                break;
            case "pencil":
                this.clear();
                shape = new BrokenLine(this.color, this.amountCoords);
                this.arrayOfShapes.push(shape);
                break;
            case "rectangle":
                this.clear();
                shape = new Rectangle(this.color, this.coords.x, this.coords.y, this.coords.vx, this.coords.vy);
                this.arrayOfShapes.push(shape);
                break;
            case "circle":
                this.clear();
                shape = new Circle(this.color, this.coords.x, this.coords.y, this.coords.vx, this.coords.vy);
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
                let deltaX = this.coords.vx - this.coords.x;
                let deltaY = this.coords.vy - this.coords.y;
                shape = this.movingshape;
                shape.setCoord(deltaX, deltaY);
                this.coords.x = this.coords.vx;
                this.coords.y = this.coords.vy;
                this.clear();
                break;
            case "pencil":
                shape = new BrokenLine(color, x, y, vx, vy);
                break;
            case "rectangle":
                this.clear();
                new Rectangle(color, x, y, vx, vy);
                break;
            case "circle":
                this.clear();
                new Circle(color, x, y, vx, vy);
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