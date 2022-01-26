
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let running = false;
let raf;

window.addEventListener('mouseup', function(e){
  running = false;
  ctx.save();
});


  canvas.addEventListener('mousedown', function(e){
    let positionBox = this.getBoundingClientRect();
    console.log(positionBox);
    let canvasX = Math.round(e.clientX - positionBox.left);
    console.log(canvasX);
    let canvasY = Math.round(e.clientY - positionBox.top);
    console.log(canvasX, canvasY);
  
    if (!running) {
      rectangle.x = canvasX;
      rectangle.y = canvasY;
      rectangle.width = 0;
      rectangle.height = 0;

      running = true;
      return;
    }
    running = false;
  })

  canvas.addEventListener('mousemove', function(e){
    let positionBox = this.getBoundingClientRect();
    let canvasX = Math.round(e.clientX - positionBox.left);
    let canvasY = Math.round(e.clientY - positionBox.top);
  
    if (running) {
      clear();
      rectangle.width = canvasX - rectangle.x;
      rectangle.height =  canvasY - rectangle.y;
      rectangle.drawRect();
    }
  })

  let rectangle = {
    x: 10,
    y: 10,
    width: 0,
    height: 0,
    radius: 0,
  
    drawRect: function() {
      ctx.beginPath(); 
      ctx.moveTo(this.x, this.y);
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
      ctx.strokeRect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    },
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

//   canvas.addEventListener('mousedown', function(e){

//     let positionBox = this.getBoundingClientRect();
//     console.log(positionBox);
//     let canvasX = e.clientX - positionBox.left;
//     console.log(canvasX);
//     let canvasY = e.clientY - positionBox.top;
//     console.log(canvasX, canvasY);
  
//     if (!running) {
//       rectangle.x = canvasX;
//       rectangle.y = canvasY;
//       rectangle.width = 0;
//       rectangle.height = 0;
//       running = true;
//     }
// })

//   canvas.addEventListener('mousemove', function(e) {
//     if (running) {
//       let positionBox = this.getBoundingClientRect();
//       let canvasX = e.clientX - positionBox.left;
//       let canvasY = e.clientY - positionBox.top;
//       clear();
//       ctx.restore();
//       rectangle.width = canvasX - rectangle.x;
//       rectangle.height =  canvasY - rectangle.y;
//       rectangle.drawRect();
//     }
//   });

//   canvas.addEventListener('mousedown', function(e){
//     let positionBox = this.getBoundingClientRect();
//     console.log(positionBox);
//     let canvasX = Math.round(e.clientX - positionBox.left);
//     console.log(canvasX);
//     let canvasY = Math.round(e.clientY - positionBox.top);
//     console.log(canvasX, canvasY);
  
//     if (!running) {
//       rectangle.x = canvasX;
//       rectangle.y = canvasY;
//       rectangle.radius = 0;
//       running = true;
//     }
// })

// canvas.addEventListener('mousemove', function(e) {
// if (running) {
//   let positionBox = this.getBoundingClientRect();
//   let canvasX = Math.round(e.clientX - positionBox.left);
//   let canvasY = Math.round(e.clientY - positionBox.top);
//   clear();
//   rectangle.width = canvasX - rectangle.x;
//   rectangle.height =  canvasY - rectangle.y;
//   rectangle.radius = Math.pow((Math.pow(rectangle.width, 2) + Math.pow(rectangle.height, 2)), 0.5);
//   rectangle.drawCircle();
// }
// })


//     drawCircle: function() {
//       ctx.beginPath(); 
//       ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//       ctx.closePath();
//       ctx.stroke();
//     }
//   }








// function drawByPencil() {
// canvas.addEventListener('mousedown', function(e){
  // let positionBox = this.getBoundingClientRect();
  // console.log(positionBox);
  // let canvasX = Math.round(e.clientX - positionBox.left);
  // console.log(canvasX);
  // let canvasY = Math.round(e.clientY - positionBox.top);
  // console.log(canvasX, canvasY);

//   if (!running) {
//     point.x = canvasX;
//     point.y = canvasY;
//     running = true;
//     return;
//   }
//   running = false;
// });

// canvas.addEventListener('mousemove', function(e){
  // let positionBox = this.getBoundingClientRect();
  // let canvasX = Math.round(e.clientX - positionBox.left);
  // let canvasY = Math.round(e.clientY - positionBox.top);

//   if (running) {
//     point.vx = canvasX;
//     point.vy = canvasY;
//     point.drawLines();

//     point.x = point.vx;
//     point.y = point.vy;
//   }
// })

// let point = {
//   x: 10,
//   y: 10,
//   vx: this.vx,
//   vy: this.vy,

//   drawLines: function() {
//     ctx.beginPath(); 
//     ctx.moveTo(this.x, this.y);
//     ctx.lineTo(this.vx, this.vy);
//     ctx.closePath();
//     ctx.stroke();
//   }
// }
// }

// document.addEventListener('click', function(event){
//   let target = event.target;
//   let targetParent = target.closest('.canvas-checkbox');
//   if (!targetParent.checked) return;
//   let controlType = targetParent.getAttribute('data-control');

//   function actionsOfCanvas(controlType) {
//     switch (controlType) { 
//       case "pencil": drawByPencil(); 
//       break;
//     }
//   }

//   actionsOfCanvas(controlType);
// })

//rectangle

// function drawRectangle() {