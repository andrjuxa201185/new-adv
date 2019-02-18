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

  function follow (e){
    for (let i = 0; i < 50; i++) {
      molecule.point[i].speedX = (e.offsetX - molecule.point[i].positionX) / window.innerWidth * Math.random() * 100 ;
      molecule.point[i].speedY = (e.offsetY - molecule.point[i].positionY) / window.innerHeight * Math.random() * 100 ;
    }
  }

  function boom(e){
    for (let i = 0; i < 50; i++) {
      molecule.point[i].setMouseCoord(e);
      molecule.point[i].setParam(e);
      molecule.point[i].color = "red";
      molecule.point[i].speedX = -10 + Math.random() * 20;
      molecule.point[i].speedY = -10 + Math.random() * 20;
    }
    canvas.removeEventListener("mousemove", follow);
    setTimeout(()=>{
      canvas.addEventListener("mousemove", follow);
    }, 7000);
  }

  canvas.addEventListener("mousemove", follow);
  canvas.addEventListener("mousedown", function(){
    canvas.addEventListener("mousemove", drowPoint);
  });

  canvas.addEventListener("mousemove", function (e){
    let sumX = 0;
    let sumY = 0;
    for (let i = 0; i < 50; i++) {
      if (molecule.point[i-1]){
        sumX += Math.abs(molecule.point[i].positionX - molecule.point[i-1].positionX);
        sumY += Math.abs(molecule.point[i].positionY - molecule.point[i-1].positionY);
      }
    }
    if (sumX<200 && sumY < 200){
      canvas.style.cursor = "pointer";
      canvas.addEventListener("click", boom);
    } else {
      canvas.style.cursor = "unset";
      canvas.removeEventListener("click", boom);
    }
  });

  canvas.addEventListener("click", drowPoint);

  canvas.addEventListener("mouseup", function(){
    canvas.removeEventListener("mousemove", drowPoint);
  });


});

