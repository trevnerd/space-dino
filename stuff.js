
//TODO
//game board
    //christina is making a GIF space background - in css file
//character
    //if move off screen, can wrap around
//lasers bullets
    //should have delay between each shot
    //cause character to move when shot - opposite direction
    //code as wrap around BUT we should see if it's nice 
        //if not, we can just comment it out
//enemies
    //evil seagulls - kamakazi style 
    //do we wanna keep score count?
    //3 seaguls 
//power ups - LAST PRIORITY??
    //garbage :) like literal space trash

//end game
    //3 lives? - seagulls charge you to kill you x_x
    //1 hit 1 kill


var dino = {
    jq: $('#dino'),
    velocity: { // in px / 10 ms
        x: 0, // positive = to the right
        y: 0 // positive = up
    },
    get width()
    {
        return this.jq.width();
    },
    get height()
    {
        return this.jq.height();
    },
    get x() // relative to game 
    {
        return this.jq.position().left;
    },
    get y()
    {
        return this.jq.position().top;
    },
    get xCenter() // relative to window
    {
        return this.jq.offset().left+(this.width/2);
    },
    get yCenter()
    {
        return this.jq.offset().top+(this.height/2);
    },
    move(down, right)
    {
        this.jq.offset({top: this.jq.offset().top+down, left: this.jq.offset().left+right});
    },
    moveTo(x, y) // relative to game
    {
        let new_y = game.offset().top+y;
        let new_x = game.offset().left+x;
        this.jq.offset({top: new_y, left: new_x});
    }
};
var game = $('#game');

function makeEnemy()
{
    //generate an enemy
    var img = new Image(); //create 
    img.src = 'https://cdn0.iconfinder.com/data/icons/birds-colored/48/Animals_Birds_Artboard_7-128.png'
    
    //set enemy position/details
    //img.style.left="1px";

    //appending to the board
    document.getElementById('game').appendChild(img);
}

$(document).ready(function() {//when the doc loads
    makeEnemy();
    dino.moveTo(game.width()/2, game.height()/2);
});

document.addEventListener('click', function(e){
    // have a velocity vector in the opposite direction of the click
    let x_portion = dino.xCenter - e.x; 
    let y_portion = dino.yCenter - e.y;
    let x_comp = x_portion/Math.sqrt(x_portion*x_portion+y_portion*y_portion);
    let y_comp = y_portion/Math.sqrt(x_portion*x_portion+y_portion*y_portion);
    let vel_coef = 1;
    dino.velocity.x += x_comp * vel_coef;
    dino.velocity.y += y_comp * vel_coef;
})

setInterval(function(){
    console.log(dino.velocity.y)
    dino.move(dino.velocity.y, dino.velocity.x);
}, 10);