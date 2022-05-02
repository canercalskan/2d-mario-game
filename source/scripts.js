
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 2;
const body = document.querySelector('body');
var lives = 1;
let livesArea = document.getElementById('lives');
let scoreboard = document.getElementById('scoreboard')
var movingcounter = 0
class Platform {
    constructor(x , y , image , velocityX , id) {
        this.position = {
            x,
            y,
        };
        this.id = id
        this.firstX = x;
        this.velocityX = velocityX;
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }
    draw() {
         c.drawImage(this.image , this.position.x , this.position.y);
    }

    update() {
        //  if(this.position.x >= this.firstX + 200 || this.position.x <= this.firstX-1 && this.id == 'movable') { 
        //      this.velocityX = -this.velocityX
        // }
         if(this.id =='movable') 
            this.position.x += this.velocityX;
         
        this.draw();
        }
    }

class GameObject {
    constructor(x , y , image , identifier) {
        this.position = {
            x,
            y
        };
        this.image = image;
        this.width = image.width;
        if(identifier != 'bg')
            this.height = image.height;
        else if(identifier == 'bg') {
            this.height = innerHeight + 120
        }
    }
    draw() {
         c.drawImage(this.image , this.position.x , this.position.y);
    }
}


class Player {
    constructor() {
        this.position = {
            x:100,
            y:100
        }

        this.velocity = {
            x : 0,
            y : 1
        }
        this.limitFrames = 28;
        this.width = 66;
        this.height =200;
        this.image = playerimageRight;
        this.frames = 0;
        this.currentCropWidth = 177;
    }
    draw() {
        c.drawImage(
            this.image ,
            this.currentCropWidth  * this.frames, 
            0 , 
            this.currentCropWidth , 
            400, // cropping the image . Order : startCropX , startCropY, endWidth , endHeight
            this.position.x ,
            this.position.y ,
            this.width ,
            this.height
            );
    }

    update() {
        this.frames++
        if(this.frames >= this.limitFrames) { // 28 : count of the characters from our png , so if the animation is done we will reset it to make it continous
            this.frames = 0
        }
        this.position.x += this.velocity.x; 
            if(this.velocity.y <= 0 &&  this.position.y <= 0) {
                this.velocity.y = -this.velocity.y;
            }
            this.position.y += this.velocity.y;
            this.velocity.y += gravity;

         if(this.position.y < 0) {
            this.velocity.y = -this.velocity.y ;
        } // this statement makes sure that player is not reaching over top of the screen.
        this.draw();
    }
}

function CreateImages(ImageSource) { //Whenever we call this function, it will create and return image from specified source
    const image = new Image();
    image.src = ImageSource;
    return image;
}

let playerimageRight = CreateImages('./images/spriteStandRight.png');
let playerimageLeft = CreateImages('./images/spriteStandLeft.png');
let playerRunRight = CreateImages('./images/spriteRunRight.png');
let playerRunLeft = CreateImages('./images/spriteRunLeft.png');
let platformimage = CreateImages('./images/platform.png')
let hillsimage = CreateImages('./images/hills.png');
let backgroundimage = CreateImages('./images/background.png')
let smallplatformimage = CreateImages('./images/platformSmallTall.png');
let player = new Player(playerimageRight , playerimageLeft);

let platforms = [new Platform(0 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' )  , 
     new Platform(platformimage.width-1 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const'),
     new Platform(platformimage.width*2-2 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) , 
     new Platform(platformimage.width*3.2 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*4.6 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) , 
     new Platform(platformimage.width*6.2 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*7.4 , 350 , smallplatformimage , 0 , 'movable'),
     new Platform(platformimage.width*8.8 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*10 , canvas.height - (platformimage.height / 1.5) , smallplatformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*11 , canvas.height - (platformimage.height / 1.5) - 30 , smallplatformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*12 , canvas.height - (platformimage.height / 1.5) - 70 , smallplatformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*13 , canvas.height - (platformimage.height / 1.5) - 110 , smallplatformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*14 , canvas.height - (platformimage.height / 1.5) - 160 , smallplatformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*15 , canvas.height - (platformimage.height / 1.5) - 210 , platformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*16.5 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*17.5-2 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
     new Platform(platformimage.width*18.92 , canvas.height - (platformimage.height / 1.5) , smallplatformimage , 0 , 'movable' ) ,
     ];

let gameObjects = [new GameObject(0 , -1 , backgroundimage , 'bg') , new GameObject(200,100,hillsimage)];
const keys = {
    right:{
        pressed:false
    },
    left: {
        pressed:false
    }
}

let ScrollTracker = 0;
let positionTracker = 0;
function resetGame() {
    movingcounter = 0
 playerimageRight = CreateImages('./images/spriteStandRight.png');
 playerimageLeft = CreateImages('./images/spriteStandLeft.png');
 platformimage = CreateImages('./images/platform.png')
 hillsimage = CreateImages('./images/hills.png');
 backgroundimage = CreateImages('./images/background.png')
 smallplatformimage = CreateImages('./images/platformSmallTall.png');
 player = new Player(playerimageRight , playerimageLeft);

  platforms = [new Platform(0 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' )  , 
 new Platform(platformimage.width-1 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const'),
 new Platform(platformimage.width*2-2 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) , 
 new Platform(platformimage.width*3.2 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*4.6 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) , 
 new Platform(platformimage.width*6.2 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*7.4 , 350 , smallplatformimage , 0 , 'movable'),
 new Platform(platformimage.width*8.8 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*10 , canvas.height - (platformimage.height / 1.5) , smallplatformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*11 , canvas.height - (platformimage.height / 1.5) - 30 , smallplatformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*12 , canvas.height - (platformimage.height / 1.5) - 70 , smallplatformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*13 , canvas.height - (platformimage.height / 1.5) - 110 , smallplatformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*14 , canvas.height - (platformimage.height / 1.5) - 160 , smallplatformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*15 , canvas.height - (platformimage.height / 1.5) - 210 , platformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*16.5 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*17.5-2 , canvas.height - (platformimage.height / 1.5) , platformimage , 0 , 'const' ) ,
 new Platform(platformimage.width*18.92 , canvas.height - (platformimage.height / 1.5) , smallplatformimage , 0 , 'movable' ) ,
 ];

 gameObjects = [new GameObject(0 , 0 , backgroundimage) , new GameObject(200,100,hillsimage)];
 ScrollTracker = 0
 positionTracker = 0
}

let playerWon = false;

function animate() {
    if(lives != -1 && !playerWon){
        livesArea.textContent = 'Lives : ' + lives
    } 
    else if(lives == -1 && !playerWon){
        livesArea.textContent = 'GAME OVER'
    }
    else {
        scoreboard.style.top = '200px'
        livesArea.textContent = 'YOU WON!'
    }

    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    
    gameObjects.forEach((object) => {
        object.draw();
    })
    platforms.forEach((platform) => {
        platform.update();
    })
    player.update();
    if(keys.right.pressed && player.position.x <= 800) {
        player.velocity.x = 20;
    }
    else if(keys.left.pressed && player.position.x >= 200) {
        player.velocity.x = -20;
    }
    else {
        player.velocity.x = 0;
    }

    if(keys.right.pressed && player.position.x >= 800) {
       platforms.forEach((platform) => {
            platform.position.x -= 9; // parralax1
            ScrollTracker += 9;
            positionTracker += 9;
       })
      gameObjects.forEach((object) => {
         object.position.x -= 4;
        })
     }
     
     

     if(keys.left.pressed && player.position.x <= 200 && ScrollTracker > 0) {
        platforms.forEach((platform) => {
            platform.position.x +=9;
            ScrollTracker -=9;
            positionTracker -=9;
        })
        gameObjects.forEach((object) => {
            object.position.x += 4;
           })
    }

    //Collusion detection between player and platforms
    platforms.forEach((platform) => {
        console.log(movingcounter)
        if(player.position.y + player.height <= platform.position.y && player.position.y +player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x && player.position.x <=platform.position.x + platform.width
            ) {
            player.velocity.y = 0
            
            if(platform.id == 'movable' && !keys.left.pressed && !keys.right.pressed)  {
                platform.velocityX = 3
                // canvas.style.backgroundColor = 'red'
                player.velocity.x = platform.velocityX
                movingcounter += 100
                if(movingcounter >= 13000) {
                    platform.velocityX = 0
                    player.velocity.x =0
                }
            }
        }
        else {
            platform.velocityX =0
        }
    }) 
   

    //Win Condition
    if(positionTracker > 174000 && player.velocity.y == 0) {
        player.velocity.y = -25
        playerWon = true;
    }

    //Loose Condition
    if(player.position.y + player.height > canvas.height + 500) {
        if(lives >= 0)
            lives--
        playerWon = false
       resetGame()
    }
    //scroll the scoreboard to the center of screen
    if(lives < 0) {
        scoreboard.style.top = '200px'
    }

}


addEventListener('keydown' , ({keyCode}) => {
    switch(keyCode) {
        case 87:
            player.velocity.y -= 32;
            break;
        case 68:
            keys.right.pressed = true;
            player.image = playerRunRight
            player.currentCropWidth = 341;
            player.width = 127.875
            player.limitFrames = 30
            break;
        case 65:
            keys.left.pressed = true;
            player.image = playerRunLeft
            player.currentCropWidth = 341
            player.width = 127.875
            player.limitFrames = 30
            break;
    }
})

addEventListener('keyup' , ({keyCode}) => {
    switch(keyCode) {
        case 87:
            
            break
        case 68:
            keys.right.pressed = false;
            player.image = playerimageRight
            player.currentCropWidth = 177
            player.width = 66
            player.limitFrames = 28
            break
        case 65:
            keys.left.pressed = false;
            player.image = playerimageLeft
            player.currentCropWidth = 177
            player.width = 66
            player.limitFrames = 28
    }
})
addEventListener('resize' , function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
animate()

