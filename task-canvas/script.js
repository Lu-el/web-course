
class BrokenLine {
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
        ctx.beginPath();
        ctx.moveTo(this.baseX, this.baseY);
        ctx.lineTo(this.endX, this.endY);
        ctx.strokeStyle = this.color;
        ctx.stroke();
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
}

const array = [];

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
        this.move = this.mouseMove.bind(this);
        this.mouseDown = function(event) {
            const positionBox = this.canvas.getBoundingClientRect();
            let canvasX = Math.round(event.clientX - positionBox.left);
            this.coords.x = canvasX;
            let canvasY = Math.round(event.clientY - positionBox.top);
            this.coords.y = canvasY;
            this.canvas.addEventListener('mousemove', this.move);
        }
        this.remove = document.getElementById('remove');
        this.initializeSubscriptions();
    }
    

    initializeSubscriptions() {
        this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
        this.canvas.addEventListener('mouseup', () => { this.destroy() }, false );
        this.colorPicker.addEventListener("input", this.newColor.bind(this), false);
        this.colorPicker.addEventListener("change", this.watchColorPicker.bind(this), false);
        this.remove.addEventListener("click", this.removeAll.bind(this), false);
    }

    removeAll() {
        array.splice(0, array.length);
        this.clear();
    }

    newColor(event) {
        this.color = event.target.value;
    }

    watchColorPicker(event) {
        this.color = event.target.value
    }

    destroy() {
        let shape;
        this.canvas.removeEventListener('mousemove', this.move);
        switch (this.getControlType()) {
            case "new":
                return;
            case "pencil":
                return;
            case "rectangle":
                this.clear();
                shape = new Rectangle(this.coords.x, this.coords.y, this.coords.vx, this.coords.vy, this.color);
                array.push(shape);
                break;
            case "circle":
                this.clear();
                shape = new Circle(this.coords.x, this.coords.y, this.coords.vx, this.coords.vy, this.color);
                array.push(shape);
                break;
        }
        array.push(shape);
        array.forEach(function(item){
            item.render();
        })
    }

    drawShape(x, y, vx, vy, controlType, color) {
        let shape;
        let clear = function() {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }; 
        switch (controlType) {
            case "new":
                break;
            case "pencil":
                shape = new BrokenLine(x, y, vx, vy, color);
                array.push(shape);
                break;
            case "rectangle":
                clear();
                new Rectangle(x, y, vx, vy, color);
                break;
            case "circle":
                clear();
                new Circle(x, y, vx, vy, color);
                break;
            default: this.destroy();
        }

        array.forEach(function(item){
            item.render();
        })
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
                this.coords.x = this.coords.vx;
                this.coords.y = this.coords.vy;
            }
    }
}

let goDrow = new CanvasVectorEditor();