
class BrokenLine {
    constructor(baseX, baseY, endX, endY) {
        this.baseX = baseX;
        this.baseY = baseY;
        this.endX = endX;
        this.endY = endY;
        this.render();
    }
    render() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(this.baseX, this.baseY);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
    }
}

class Rectangle {
    constructor(baseX, baseY, endX, endY) {
        this.baseX = baseX;
        this.baseY = baseY;
        this.endX = endX;
        this.endY = endY;
        this.render();
    }
    render() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let width = this.endX - this.baseX;
        let height = this.endY - this.baseY;
        ctx.beginPath();
        ctx.moveTo(this.baseX, this.baseY);
        ctx.strokeRect(this.baseX, this.baseY, width, height);
        ctx.stroke();
    }
}
class Circle {
    constructor(baseX, baseY, endX, endY) {
        this.baseX = baseX;
        this.baseY = baseY;
        this.endX = endX;
        this.endY = endY;
        this.render();
    }
    render() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let radius = Math.sqrt((this.endX - this.baseX) ** 2 + (this.endY - this.baseY) ** 2);
        ctx.beginPath();
        ctx.arc(this.baseX, this.baseY, radius, 0, Math.PI * 2, false);
        ctx.stroke();
    }
}
class CanvasVectorEditor {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.color = document.getElementById('colors');
        this.coord = [];
        this.mouseDown = function(event) {
            this.coord = [];
            let positionBox = this.canvas.getBoundingClientRect();
            let canvasX = Math.round(event.clientX - positionBox.left);
            this.coord.push(canvasX);
            let canvasY = Math.round(event.clientY - positionBox.top);
            this.coord.push(canvasY);
        }
        // this.handleEvent = function(event) {
        //     switch(event.type) {
        //         case 'mousemove':
        //             this.mouseMove();
        //             break;
        //         case 'mousedown':
        //             this.coord = [];
        //             let positionBox = this.canvas.getBoundingClientRect();
        //             let canvasX = Math.round(event.clientX - positionBox.left);
        //             this.coord.push(canvasX);
        //             let canvasY = Math.round(event.clientY - positionBox.top);
        //             this.coord.push(canvasY);
        //             break;
        //         case 'mouseup':
        //             this.destroy();
        //     }
        

        this.initializeSubscriptions();
    }

    initializeSubscriptions() {
        // this.canvas.addEventListener('mousemove', this, false);
        // this.mouseDown();
        this.canvas.addEventListener('mousemove', () => { this.mouseMove(); }, false);
        this.canvas.addEventListener('mousedown', this.mouseDown.bind(this), false);
        // this.canvas.addEventListener('mousedown', this, false);
        this.canvas.addEventListener('mouseup', () => { this.destroy() }, false )
    }

    destroy() {
        this.canvas.removeEventListener('mousemove', () => { this.mouseMove(); }, false);
        this.canvas.removeEventListener('mousedown', this.mouseDown.bind(this), false);
        this.canvas.removeEventListener('mousedown', () => { this.console(); }, false);
    }

    drawShape(x, y, vx, vy, controlType) {
        let clear = function() {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }; 
        switch (controlType) {
            case "new":
                // this.destroy();
                break;
            case "pencil":
                clear();
                new BrokenLine(x, y, vx, vy);
                break;
            case "rectangle":
                clear();
                new Rectangle(x, y, vx, vy);
                break;
            case "circle":
                clear();
                new Circle(x, y, vx, vy);
                break;
            default: this.destroy();
        }
    }

    clear() {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    getControlType() {
        let button = document.querySelectorAll('.canvas-checkbox');
        for (let elem of button) {
            if (elem.checked) {
                return `${elem.getAttribute('data-control')}`;
            };
        }
    }

    // test(a, b) {
    //     return a + b;
    // }

    // mouseDown() {
    //     let canvas = document.getElementById('canvas');
    //     let coord =[];
    //     let activ = () => canvas.addEventListener('mousedown', function(event) {
    //         coord = [];
    //         let positionBox = canvas.getBoundingClientRect();
    //         let canvasX = Math.round(event.clientX - positionBox.left);
    //         coord.push(canvasX);
    //         let canvasY = Math.round(event.clientY - positionBox.top);
    //         coord.push(canvasY);
    //     })
    //     activ();
    //     return console.log(coord);
    // }

    

    // mouseDown = () => canvas.addEventListener('mousedown', function(event) {
    //     console.log(this.coord);
    //     let positionBox = canvas.getBoundingClientRect();
    //     let canvasX = Math.round(event.clientX - positionBox.left);
    //     this.coord.push(canvasX);
    //     let canvasY = Math.round(event.clientY - positionBox.top);
    //     this.coord.push(canvasY);
    //     console.log(coord);
    //     return coord;
    // })


    
    // mouseDown()  {
    //     this.canvas.addEventListener('mousemove', function(event) {
    //         this.coord = [];
    //         let positionBox = canvas.getBoundingClientRect();
    //         let canvasX = Math.round(event.clientX - positionBox.left);
    //         this.coord.push(canvasX);
    //         let canvasY = Math.round(event.clientY - positionBox.top);
    //         this.coord.push(canvasY);
    //         })
    // }

    mouseMove() {
        let type = this.getControlType;
        let baseCoord = this.coord;
        let draw = this.drawShape;
        this.canvas.addEventListener('mousemove', function(event) {
            let coords = [];
            let positionBox = this.getBoundingClientRect();
            let canvasX = Math.round(event.clientX - positionBox.left);
            coords.push(canvasX);
            let canvasY = Math.round(event.clientY - positionBox.top);
            coords.push(canvasY);

            console.log(baseCoord + " " + coords + " " + type());

            draw(baseCoord[0], baseCoord[1], coords[0], coords[1], type());
        })
    }

    clear() {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

let goDrow = new CanvasVectorEditor();