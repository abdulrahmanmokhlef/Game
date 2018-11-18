var ballValue; // this var contain the value of 'top' property of ball 
var barriersCounter = 0;  

$(function(){
  
    whenKeyIsPressed();
    instructions();
});


function whenKeyIsPressed(){
    $(document).keydown(function(e){

        switch (e.which){
         case 37:    //left arrow key
            moveTheBall(37);
             break;
         case 38:    //up arrow key
         moveTheBall(38);
         break;
         case 39:    //right arrow key
             moveTheBall(39);
             break;
         case 40:    //bottom arrow key
            moveTheBall(40);
             break;
         case 70: // f key
         myMove();   
             break; 
         }
         processing();
     });
     
}


function moveTheBall(key){
   if(key == 37){
    $(".player").finish().animate({
        left: "-=10"
    });
   }
   if(key == 38){
    $(".player").finish().animate({
        top: "-=10"
    });
   
   }
   if(key == 39){
    $(".player").finish().animate({
        
        left: "+=10"
    });
   }
   if(key == 40){
    $(".player").finish().animate({
        
        top: "+=10"
    });
   }
}
// general prototype
function element(selector){
    var elem = $(selector);
    this.x = elem.offset().left;
    this.y = elem.offset().top;
    this.width = elem.outerWidth();
    this.height=elem.outerHeight();

    this.distanceFromTop =this.y + this.height;
    this.distanceFromLeft = this.x + this.width;
    
    this.marginTop = elem.css('margin-top');
}   


function checkIfTouch(obj1, obj2){

    if(!(obj2.distanceFromTop  < obj1.y || obj2.y > obj1.distanceFromTop 
        || obj2.distanceFromLeft < obj1.x || obj2.x >  obj1.distanceFromLeft) ){  
        
           return true;
    }else{
       return false; 
    }        
}
    
// check is the ball hits any barriers
function processing(){
    
    var player = new element('.player');
    player.distanceFromTop = player.y +player.height;
    player.distanceFromLeft = player.x +player.width;

    var ball = new element('.ball');
    ball.distanceFromTop = ball.y + ball.height;  
    ball.distanceFromLeft = ball.x + ball.width;

    // create a list of  divs
    var test = $('.barriersMain > div');
    // loop throught all divs in the main div
    test.each(function(){
       
        var barriers = new element( $(this));
        barriers.distanceFromTop = barriers.y + barriers.height;
        barriers.distanceFromLeft = barriers.x + barriers.width;

           
        if(checkIfTouch(barriers, ball)){
            $(this).hide();
                resetBall();              
                ballValue = parseInt($(".ball").css("top"));
                barriersCounter++;
                    
        } if(checkIfTouch(barriers, player)){
            gameOverAlert();
            
            
            } 
        
    });
}

var screenHight =  screen.height;
function myMove() {
    
    var elem = document.getElementById("myBall");   
    var pos = 0 ;

    var id = setInterval(frame, 0.1);
     
    function frame() {
      if (pos == -screenHight || ballValue == 0) {
        clearInterval(id);
        resetBall(); // reset top = 0  if top == -500
        ballValue = -1;
      } else {
        pos -=3; 
        elem.style.top = pos + 'px'; 
        processing();
        displayScore(barriersCounter);         
        WinnerAlert();
      }
    }
  }
  

  // reset ball to position 0 after it crashed  
function resetBall(){
    $(".ball").css("top", "0");
} 
function WinnerAlert(){
      if(barriersCounter == 7){
        resetTheGame();
        swal({
            title: "Wow!",
            text: "Congrats. You won!",
            icon: "success",
            button: "Play again",
        }).then(function() {
            window.location = "index.html";
        });
      }
  }
  
function gameOverAlert(){
    resetTheGame(); 
    swal({
        title: "Opps!",
        text: "Game Over",
        type: "success",
        button: "Play again",
    }).then(function() {
        window.location = "index.html";
    });
}

 function resetTheGame(){
     //$('.player').css({"top": "450px", "left": "500px"});
     $('.player').hide();
     //$('.barriers').removeClass("rotate"); //remove class rotate from all barriers;
     barriersCounter = 0;
     displayScore(barriersCounter);
     
 } 

function displayScore(counter){
    counter = barriersCounter;
    $('.score').text(counter);
}

function instructions(){
    swal({
        title: "Use Arrows UP Down Right Left for moving the ball,\n and Press F to fire.",
        text: "Happy Plaly",
        type: "success",
        button: "Ok",
    });
}