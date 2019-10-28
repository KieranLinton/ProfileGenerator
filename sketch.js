/* eslint-env es6 */

var grid;
var clicking;
var matrix = [];
var screenSize = 1000;
var unitPercenage = 10;
var UnitSize;
var totalScreenUnits;
var mode = 1;

function setup() {
        screenSize = document.getElementById('canvasDiv').offsetWidth;

    UnitSize = (screenSize * unitPercenage) / 100; //turning the unit size in to a percentage

    
    var canvas = createCanvas(screenSize +1, screenSize +1);
    totalScreenUnits = screenSize/UnitSize;
    canvas.parent('canvasDiv');
    
  createGrid();
}

function draw() {
  
  
  
  updateGrid(mouseX, mouseY);
    
}
function mousePressed() {
  clicking = true;
}
function mouseReleased(){
  clicking = false;
}
function createGrid(){
  for(var i=0; i < totalScreenUnits;i ++){
    matrix[i] = [];
     for(var l=0; l < totalScreenUnits;l ++){
       matrix[i][l] = new unit(i,l,UnitSize);
     }
  }
}
function randomize(){
    var RandomizedGridTotal = [];
    var randomizedGridLeftHalf = [];
    var randomizedGridRightHalf = [];
    
    for(var i=0; i < totalScreenUnits/2;i ++){
        
        randomizedGridLeftHalf[i] = [];
        randomizedGridRightHalf[((i - (totalScreenUnits/2) )+1)* (-1)] = [];
        
        for(var l=0; l < totalScreenUnits;l ++){
        
            var value = Math.round(Math.random()) == 1; //is this random number a 1
            randomizedGridLeftHalf[i][l] = value;
            randomizedGridRightHalf[((i - (totalScreenUnits/2) )+1)* (-1)][l] = value;
            console.log("left: " +  i +" is " + (((i - (totalScreenUnits/2) )+1) * (-1)));
        }
    }
    console.log(randomizedGridLeftHalf);
    console.log(randomizedGridRightHalf);
    
    for(var i=0; i < totalScreenUnits;i ++){
        RandomizedGridTotal[i] = [];
        for(var l=0; l< totalScreenUnits; l ++){
            
            if(i < totalScreenUnits/2){
                RandomizedGridTotal[i][l] = randomizedGridLeftHalf[i][l];
            }
            else{
                RandomizedGridTotal[i][l] = randomizedGridRightHalf[i - (randomizedGridLeftHalf.length)][l];
            }
            
        }
    }
    console.log(RandomizedGridTotal);
    for(var i=0; i < matrix.length ;i ++){
        for(var l=0; l < matrix[i].length;l ++){
            matrix[i][l].drawn = RandomizedGridTotal[i][l];
        }
    }
    
}

function updateGrid(mouseCordsX, mouseCordsY){
  var size = UnitSize;
  
  for(var i=0; i < matrix.length ;i ++){
     for(var l=0; l < matrix[i].length;l ++){
    
        var item = matrix[i][l];
        size= item.size;
         
       if(mouseCordsX - size > i * size -size && mouseCordsX - size < i * size && mouseCordsY - size > l * size -size && mouseCordsY - size < l * size){
         if(clicking){
             if(mode==1){
                item.drawn = true;
             }else if(mode==0){
                 item.drawn = false;
             }
         }
         else{
           item.selected = true;
         }
       } else{
         item.selected = false;
       }
       item.render();
      }
  }
}
class unit{
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    
    this.render();
    
    this.selected = false;
    this.drawn = false;
  }
  render(){
    if(this.selected){
        if(mode == 0){
            fill(255);
        }else{
           fill(0);
        }
      
    } else if(this.drawn){
      fill(0);
    }else{
      fill(255);
    }
    square(this.x * this.size ,this.y * this.size, this.size);
  }
}