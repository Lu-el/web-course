// abstract class Shape {
//     constructor(public x: number, public y: number) {}
//     abstract render(ctx: CanvasRenderingContext2D): void;
//     abstract setCoords(coordsAndParams: number[]): void;
//     abstract isPointWithing(x: number, y: number): boolean;
//     abstract setColor(color: string): void; 
// }
// let figures: Array<any> = [];

class BrokenLine {
    constructor(public baseX: number, public baseY: number, public endX: number, public endY: number, public colorPrint: string) { 
        this.render();
    }

    public render(): void {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let ctx = canvas.getContext('2d');
        
        ctx.beginPath;
        ctx.moveTo(this.baseX, this.baseY);
        ctx.lineTo(this.endX, this.endY);
        ctx.strokeStyle = this.colorPrint;
        ctx.stroke;
    }
}

class Rectangle {
    constructor(public baseX: number, public baseY: number, public endX: number, public endY: number, public colorPrint: string) {
        this.render();
    }

    public render(): void {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let ctx = canvas.getContext('2d');
        let width: number = this.endX - this.baseX;
        let height: number = this.endY - this.baseY;

        ctx.beginPath;
        ctx.moveTo(this.baseX, this.baseY);
        ctx.strokeStyle = this.colorPrint;
        ctx.strokeRect(this.baseX, this.baseX, width, height);
        ctx.stroke();
    }
}

class Circle {
    constructor(public baseX: number, public baseY: number, public endX: number, public endY: number, public colorPrint: string) {
        this.render();
    }

    render(): void {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let ctx = canvas.getContext('2d');
        let radius: number = Math.sqrt((this.endX - this.baseX)**2 + (this.endY - this.baseY)**2);

        ctx.beginPath;
        ctx.moveTo(this.baseX, this.baseY);
        ctx.strokeStyle = this.colorPrint;
        ctx.arc(this.baseX, this.baseY, radius, 0, Math.PI * 2, false);
        ctx.stroke();
    }
}

class CanvasVectorEditor {
    canvas: HTMLCanvasElement;
    button: any;
    color: any;
    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.button = document.querySelectorAll('btn-canvas-control');
        this.color = document.getElementById('colors');
        this.initializeSubscriptions();
    }

    private initializeSubscriptions(): void {
        this.canvas.addEventListener('mousedown', this.getBaseCoord, false);
        this.canvas.addEventListener('mousemove', this.getLastCoord, false);
        document.addEventListener('mouseup', this.clear, false);
    }

    public destroy(): void {
        this.canvas.removeEventListener('mousedown', this.getBaseCoord, false);
        this.canvas.removeEventListener('mousemove', this.getLastCoord, false);
        document.removeEventListener('mouseup', this.clear, false);
    }

    public getControlType(): string {
        for (let elem of this.button) {
            if (elem.checked) 
            return elem.getAttribute('data-control');
        }
    }

    clear(): void {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }


    getBaseCoord(): Array<number> {
        let positionBox = this.canvas.getBoundingClientRect();
        let canvasX: number = 0;
        let canvasY: number = 0;
        let baseCoord = [];

        this.canvas.addEventListener('mousedown', function(event) {
            canvasX = Math.round(event.clientX - positionBox.left);
            baseCoord.push(canvasX);
            canvasY = Math.round(event.clientY - positionBox.top);
            baseCoord.push(canvasY);
        })
        return baseCoord;
    }

    getLastCoord(): Array<number> {
        let baseCoord = this.getBaseCoord();
        let positionBox = this.canvas.getBoundingClientRect();
        let canvasVX: number = baseCoord[0];
        let canvasVY: number = baseCoord[1];

        this.canvas.addEventListener('mousemove', function(event) {
            canvasVX = Math.round(event.clientX - positionBox.left);
            baseCoord.push(canvasVX);
            canvasVY = Math.round(event.clientY - positionBox.top);
            baseCoord.push(canvasVY);
        })

        return baseCoord;
    }


    public drawShape(): void {
        let color = this.color.value;
        let baseCoord = this.getLastCoord();

        


        let controlType: string = this.getControlType();
        switch (controlType) {
            case "new": this.destroy(); 
            break;
            case "pencil": this.clear(); new BrokenLine(baseCoord[0], baseCoord[1], baseCoord[2], baseCoord[3], color); 
            break;
            case "rectangle": this.clear(); new Rectangle(baseCoord[0], baseCoord[1], baseCoord[2], baseCoord[3], color); 
            break;
            case "circle": this.clear(); new Circle(baseCoord[0], baseCoord[1], baseCoord[2], baseCoord[3], color); 
            break;
            default: this.destroy();
        }
    } 
}

