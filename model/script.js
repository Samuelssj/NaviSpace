var canvas = document.getElementById('canvas').getContext("2d");
//pixelArt
canvas.imageSmoothingEnabled = false;
var currentScener = {};


var groupShot = [];

var shoots = {

  draw(){
    
    groupShot.forEach((shoot) => {
    shoot.draw();
    });

  },

  update(){

    groupShot.forEach((shoot) => {
      shoot.move();
  
      if(shoot.y <= -100){
        //remover objeto da lista posição 0 e quandtos por vez seram removidos 
        groupShot.splice(shoot[0],1);
      }
  
  
    });
  
  },

};



function changeScener(scene){
  currentScener = scene;

};

var infinityBg = {
  bg : new Obj(0,0,500,715,"../assets/fundo.png"),
  bg2 : new Obj(0,-715,500,715,"../assets/fundo.png"),

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
  }


};


var menu = {

  
  title : new Texto("Navy Space"),
  label : new Texto(">>Click Para Jogar<<"),
  nave : new Obj(220,430,60,50,"../assets/nave.png"),


  click(){
  changeScener(game);
  },


 

  draw(){
    infinityBg.draw();
    this.title.draw_text(60,"Arial",100,300,"white");
    this.label.draw_text(25,"Arial",130,370,"orange");
    this.nave.draw();

  },
  update(){

    infinityBg.movebg();

  }
};

var game = {

  score : new Texto("0"),
  nave : new Obj(220,600,60,50,"../assets/nave.png"),

  moveNave(event){
    //diminuir apenas para ajustar o tamanho da sprite junto do mouse
    this.nave.x = event.offsetX - this.nave.width/2;
    this.nave.y = event.offsetY -30 ;


  },

  click(){

    groupShot.push(new Shoot(this.nave.x +30,this.nave.y,2,10,"../assets/tiro.png"));

  },


  draw(){
    infinityBg.draw();
    this.score.draw_text(45,"Arial",240,100,"white"); 
    this.nave.draw(); 
    shoots.draw();

   



  },
  update(){
  infinityBg.movebg();
  shoots.update();
 
  }
};

var gameOver = {
  
  score : new Texto("0"),

  draw(){
    infinityBg.draw();
    this.score.draw_text(45,"Arial",240,100,"white"); 
  },
  update(){
    infinityBg.movebg();

  },


};




function main(){
  canvas.clearRect(0,0,500,900);
  currentScener.draw();
  currentScener.update();
  requestAnimationFrame(main);
};

changeScener(menu);
main();
