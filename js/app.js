// Entity superclass
var Entity = function(col, row) {
    this.col = col;
    this.row = row;
}

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(row, initial, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    if (typeof(row) == 'undefined') {
        row = Math.floor((Math.random() * 3) + 1);
    }
    if (initial) {
        col = Math.floor(Math.random() * 5);
    } else {
        col = -1;
    }
    Entity.call(this, col, row);
    this.sprite = 'images/enemy-bug.png';
    this.y = this.row * 83 - 20;
    this.x = this.col * 101;
    if (typeof(speed) == 'undefined') {
        speed = 0;
    }
    this.speed = (Math.floor(Math.random() * 5) + 3 + speed) * 15;
};
Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

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
        this.row = Math.floor((Math.random() * 3) + 1);
        this.y = this.row * 83 - 20;
    } else {
        this.x += this.speed * dt;
    }
};

// Get faster when player wins
Enemy.prototype.speedUp = function() {
    this.speed += 15;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Entity.call(this, 2, 5);
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

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

// Handle key presses
Player.prototype.handleInput = function(direction) {
    if (this.row === 0) {
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
    this.row = 5;
    this.col = Math.floor(Math.random() * 5);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = []
for (var i=0; i < 4; i++) {
    if (i) {
        allEnemies.push(new Enemy(i, true));
    } else {
        allEnemies.push(new Enemy());
    }
}
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
