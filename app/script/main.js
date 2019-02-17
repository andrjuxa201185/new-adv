document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById('canvas');

  canvas.setAttribute("height", window.innerHeight);
  canvas.setAttribute("width", window.innerWidth);

  let molecule = new Molecule(canvas, Point, 50);

  molecule.start(); 

  document.addEventListener("scroll", function (){
    let coord = canvas.getBoundingClientRect();
    if (coord.bottom < 0){
      molecule.stop();
    } else {
      molecule.start();
    }
  });

  function drowPoint(e){
    let i = Math.round(Math.random() * 49);
    molecule.point[i].setMouseCoord(e);
    molecule.point[i].setParam(e);
  }

  canvas.addEventListener("mousedown", function(){
    canvas.addEventListener("mousemove", drowPoint);
  });

  canvas.addEventListener("mousemove", function (e) {
    for (let i = 0; i < 50; i++) {
      molecule.point[i].speedX = (e.offsetX - molecule.point[i].positionX) / window.innerWidth * Math.random() * 100;
      molecule.point[i].speedY = (e.offsetY - molecule.point[i].positionY) / window.innerHeight * Math.random() * 100;
    }
  });

  // canvas.addEventListener("click", drowPoint);
  canvas.addEventListener("click", drowPoint);

  canvas.addEventListener("mouseup", function(){
    canvas.removeEventListener("mousemove", drowPoint);
  });



});

