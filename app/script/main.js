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
});

