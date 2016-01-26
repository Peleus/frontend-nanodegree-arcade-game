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
    var screenEdgeRight = 535;
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
    if (this.y < 20) {
        //Reset the player
        this.reset();
    }
    //Collision detection for enemies
    for (var i = 0, len = app.allEnemies.length; i < len; i++) {
        var targetEnemy = app.allEnemies[i];
        var colDist = Math.hypot(targetEnemy.x - this.x, targetEnemy.y - this.y);
        if (colDist < collisionRange) {
            //Reset the player
            //TODO: This is where I will reset to a new game after lives have been used up.
            this.reset();
        }
    }
};
//Player reset function
Player.prototype.reset = function() {
    // Reset to start positions
    this.x = this.startX;
    this.y = this.startY;

};
//Render the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(code) {

    //Takes in Code and moves the player
    if (code === 'left' & this.x > 25) {
        this.x = this.x - 101;
    } else if (code === 'up') {
        this.y = this.y - 80;
    } else if (code === 'right' & this.x < 390) {
        this.x = this.x + 101;
    } else if (code === 'down' & this.y < 370) {
        this.y = this.y + 80;
    }
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var app = app || {};

app.player = Player(300, 375);

app.allEnemies = [];

app.enemy1 = Enemy(-35, 135);
app.enemy2 = Enemy(-35, 305);
app.enemy3 = Enemy(-35, 220);
app.enemy4 = Enemy(-35, 55);

app.allEnemies.push(app.enemy1);
app.allEnemies.push(app.enemy2);
app.allEnemies.push(app.enemy3);
app.allEnemies.push(app.enemy4);

app.globalFunction = function(){};


// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    app.player.handleInput(allowedKeys[e.keyCode]);
});