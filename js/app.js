// Enemies our player must avoid
var Enemy = function(row, initial, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    if (typeof(row) != 'undefined') {
        this.row = row;
    } else {
        this.row = Math.floor((Math.random() * 3) + 1);
    }
    this.sprite = 'images/enemy-bug.png';
    if (initial) {
        this.x = Math.floor(Math.random() * 5) * 101;
    } else {
        this.x = -101;
    }
    this.y = this.row * 83 - 20;
    if (typeof(speed) == 'undefined') {
        speed = 0;
    }
    this.speed = (Math.floor(Math.random() * 5) + 3 + speed) * 15;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        // off the screen, cycle back around
        this.x = -101;
        this.speed = (Math.floor(Math.random() * 5) + 3) * 15;
    } else {
        this.x += this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Get faster when player wins
Enemy.prototype.speedUp = function() {
    this.speed += 15;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.row = 5;
    this.col = 2;
    this.update();
};

// Update the player
Player.prototype.update = function() {
    this.x = this.col * 101;
    this.y = this.row * 83;
    if (this.y > 0) {
        this.y -= 32;
    } else {
        this.y -= 10;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle key presses
Player.prototype.handleInput = function(direction) {
    if (this.row == 0) {
        this.reset();
    } else if (direction === 'left' && this.col > 0) {
        this.col -= 1;
    } else if (direction === 'right' && this.col < 4) {
        this.col += 1;
    } else if (direction === 'up' && this.row > 0) {
        this.row -= 1;
    } else if (direction === 'down' && this.row < 5) {
        this.row += 1;
    }
};

// Reset because of win or collision
Player.prototype.reset = function() {
    player.row = 5;
    player.col = Math.floor(Math.random() * 5);
    player.update();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(1, true), new Enemy(2, true), new Enemy(3, true), new Enemy()];
var player = new Player();


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
