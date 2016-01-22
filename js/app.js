// Enemies our player must avoid
var Enemy = function(posx,posy) {
    var obj = Object.create(Enemy.prototype);
    // Variables applied to each of our instances go here,
    
    //Save off instance 
    obj.posx = posx;
    obj.posy = posy;

    obj.x = posx;
    obj.y = posy;
    // Generate a random speed for the instance
    obj.speed = Math.floor(Math.random() * 100 ) + 50;
    obj.sprite = 'images/enemy-bug.png';
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //this.sprite = 'images/enemy-bug.png';
    return obj;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + (this.speed * dt);

    //Chack to see if the enemy has gone off screen left or right
    if(this.x > 535 || this.x < -35){
        this.x = this.posx;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(posx,posy){
    var obj = Object.create(Player.prototype);
    obj.startx = posx;//Start x of player
    obj.starty = posy;//Starty of player

    obj.x = posx;
    obj.y = posy;
    obj.sprite = 'images/char-boy.png';
    //this.sprite  = 'images/char-boy.png';
    return obj;
};

Player.prototype.update = function(dt) {
    
    //ToDo: Player win condition. This works but could be better.
    if(player.y <20){
        player.x = player.startx;
        player.y = player.starty;
    }
    //ToDo: Collision detection goes here
    for(var i = 0; i < allEnemies.length; i++){

        if(player.x){

        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(code) {
    
    //Takes in Code and moves the player
    if (code === 'left' & player.x > 25){
        player.x = player.x - 92;
    } else if(code === 'up'){
        player.y = player.y - 92;
    } else if(code === 'right' & player.x < 390){
        player.x = player.x + 92;
    } else if(code === 'down' & player.y < 390){
        player.y = player.y + 92;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = Enemy(-35,135);
var enemy2 = Enemy(-35,300);
var enemy3 = Enemy(-35,250);
var enemy4 = Enemy(-35,75);
var enemy5 = Enemy(-35,275);
var allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);

var player = Player(300,375); 
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});