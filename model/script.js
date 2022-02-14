var canvas = document.getElementById('canvas').getContext("2d");
//pixelArt
canvas.imageSmoothingEnabled = false;

var currentScener = {};
var tiro = 1;
var pts = 0;

var groupShot = [];

var groupmeteor = [];


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

var meteors = { 

  time: 0,


  spawMeteors(){
  this.time +=1;

  size = Math.random() * (80 - 50) +50;
  posX = Math.random() * (440- 10) + 10;

  if(this.time >=60){

    this.time =0;
    groupmeteor.push(new Meteors(posX,-100,size,size,"../assets/meteoro.png"));

  } 
  },

  destroyMeteord(){

    groupShot.forEach(shoot => {
      groupmeteor.forEach(meteors => {

        if(shoot.collide(meteors)){
          groupShot.slice(groupShot.indexOf(shoot),1);
          groupmeteor.splice(groupmeteor.indexOf(meteors),1);
          tiro =1;
          pts += 1;
        }
        
      });
      
    });


  },

  draw(){

    groupmeteor.forEach(m => {
      m.draw(); 
      
    });

  

},

update(){

  this.spawMeteors();
  this.destroyMeteord();

  groupmeteor.forEach(m => {
    m.move();
    if(m.y > 715){
      groupmeteor.splice(groupmeteor.indexOf(m),1);
      changeScener(gameOver);

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
    //varios tiros
   // groupShot.push(new Shoot(this.nave.x +this.nave.width / 2,this.nave.y,2,10,"../assets/tiro.png"));
   
   if(tiro >0){
     tiro -=1;
     groupShot.push(new Shoot(this.nave.x +this.nave.width / 2,this.nave.y,2,10,"../assets/tiro.png"));
   }

  },


  draw(){
    infinityBg.draw();
    this.score.draw_text(45,"Arial",240,100,"white"); 
    this.nave.draw(); 
    shoots.draw();
    meteors.draw();

   



  },
  update(){
  infinityBg.movebg();
  shoots.update();
  meteors.update(); 
  this.score.update_text(pts);
 
  }
};

var gameOver = {
  
  score : new Texto("0"),
  label_gameover : new Texto("GAME OVER"),

  draw(){
    infinityBg.draw();
    this.score.draw_text(45,"Arial",240,100,"white"); 
    this.label_gameover.draw_text(60,"Arial",70,300,"orange");
  },
  update(){
    infinityBg.movebg();
    this.score.update_text(pts); 
 

  },

  cleanScener(){
    tiro = 1;
    groupmeteor = [];
    groupShot = [];
    pts = 0;

  },


  click(){
  this.cleanScener();
  changeScener(menu);
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
