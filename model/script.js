var canvas = document.getElementById('canvas').getContext("2d");
//pixelArt
canvas.imageSmoothingEnabled = false;
var currentScener = {};

function changeScener(scene){
  currentScener = scene;

}

var menu = {

  bg : new Obj(0,0,500,715,"../assets/fundo.png"),
  bg2 : new Obj(0,-715,500,715,"../assets/fundo.png"),
  title : new Texto("Navy Space"),


  movebg(){
    this.bg.y +=1;
    this.bg2.y +=1;
    
    if(this.bg.y >= 715){
      this.bg.y =0;
    }
    if (this.bg2.y >= 0){
      this.bg2.y = -715;
    }

  },

  draw(){
    this.bg.draw();
    this.bg2.draw();
    this.title.draw_text(40,"Arial",155,450,"white");

  },
  update(){

    this.movebg();

  }
}

var game = {

  bg : new Obj(0,0,500,900,"../assets/fundo.png"),
  score : new Texto("0"),
  nave : new Obj(220,600,60,50,"../assets/nave.png"),

  draw(){
    this.bg.draw();
    this.score.draw_text(45,"Arial",240,100,"white"); 
    this.nave.draw();

  },
  update(){

  }
}

var gameOver = {
  bg : new Obj(0,0,500,900,"../assets/fundo.png"),
  score : new Texto("0"),

  draw(){
    this.bg.draw();
    this.score.draw_text(45,"Arial",240,100,"white"); 
  },
  update(){},


}




function main(){
  canvas.clearRect(0,0,500,900);
  currentScener.draw();
  currentScener.update();
  requestAnimationFrame(main);
}

changeScener(menu);
main();
