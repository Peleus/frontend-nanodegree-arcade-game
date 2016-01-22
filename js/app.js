// Enemies our player must avoid
var Enemy = function(posx,posy) {
    var obj = Object.create(Enemy.prototype);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    obj.x = posx;
    obj.y = posy;
    obj.speed = 50;
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
    obj.x = posx;
    obj.y = posy;
    obj.sprite = 'images/char-boy.png';
    //this.sprite  = 'images/char-boy.png';
    return obj;
};

Player.prototype.update = function(dt) {
    
    //(ToDo: Player win condition)
    if(player.y <20){
        player.x = 300;
        player.y = 300;
    }

    for(var i = 0; i < allEnemies.length; i++){

        console.log("check");
        if(player.x){

        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(code) {
    //Takes in Code and moves the player
    if (code === 'left'){
        player.x = player.x - 92;
    } else if(code === 'up'){
        player.y = player.y - 92;
    } else if(code === 'right'){
        player.x = player.x + 92;
    } else if(code === 'down'){
        player.y = player.y + 92;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = Enemy(100,135);
var enemy2 = Enemy(50,300);
var allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);

var player = Player(300,300); 
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