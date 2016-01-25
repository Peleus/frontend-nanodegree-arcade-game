// Enemies our player must avoid
var Enemy = function(posx, posy) {
    var obj = Object.create(Enemy.prototype);
    //Save off instance start position of enemy
    obj.startX = posx;
    obj.startY = posy;
    //Enemy current position x and y
    obj.x = posx;
    obj.y = posy;
    // Generate a random speed for the instance of the enemy
    obj.speed = Math.floor(Math.random() * 300) + 75;
    // The image/sprite for our enemies
    obj.sprite = 'images/enemy-bug.png';
    return obj;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var screenEdge_Right = 535;
    var screenEdgeLeft = -35;

    //Move feature
    this.x = this.x + (this.speed * dt);

    //Chack to see if the enemy has gone off screen left or right
    if (this.x > screenEdgeRight || this.x < screenEdgeLeft) {
        this.x = this.startX;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(posx, posy) {
    var obj = Object.create(Player.prototype);
    obj.startX = posx; //Start x of player
    obj.startY = posy; //Start y of player

    // Set local pos vars
    obj.x = posx;
    obj.y = posy;
    //Sprite for player
    obj.sprite = 'images/char-boy.png';
    return obj;
};

Player.prototype.update = function(dt) {
    // Distance from player to collide with enemies
    var collisionRange = 55;

    //TODO: Player win condition. This works but could be better.
    if (player.y < 20) {
        //Reset the player
        player.reset();
    }
    //Collision detection for enemies
    for (var i = 0; i < allEnemies.length; i++) {
        var targetEnemy = allEnemies[i];
        var colDist = Math.hypot(targetEnemy.x - player.x, targetEnemy.y - player.y);
        if (colDist < collisionRange) {
            //Reset the player
            //TODO: This is where I will reset to a new game after lives have been used up.
            player.reset();
        }
    }
};
//Player reset function
Player.prototype.reset = function() {
    // Reset to start positions
    player.x = player.startX;
    player.y = player.startY;

};
//Render the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(code) {

    //Takes in Code and moves the player
    if (code === 'left' & player.x > 25) {
        player.x = player.x - 101;
    } else if (code === 'up') {
        player.y = player.y - 80;
    } else if (code === 'right' & player.x < 390) {
        player.x = player.x + 101;
    } else if (code === 'down' & player.y < 370) {
        player.y = player.y + 80;
    }
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = Enemy(-35, 135);
var enemy2 = Enemy(-35, 305);
var enemy3 = Enemy(-35, 220);
var enemy4 = Enemy(-35, 55);
var allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

var player = Player(300, 375);
// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});