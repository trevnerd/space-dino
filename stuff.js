
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
    velocity: {
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
    get x()
    {
        return this.jq.position().x;
    },
    get y()
    {
        return this.jq.position().y;
    },
    move(up, right)
    {
        this.jq.offset({top: this.y-up, left: this.x+right});
    },
    moveTo(x, y) // relative to screen
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
    document.getElementById('game').appendChild(img);
}

$(document).ready(function() {//when the doc loads
    makeEnemy();
    dino.moveTo(game.width()/2, game.height()/2);
});

document.addEventListener('click', function(e){
    console.log("shoot")
})

// document.addEventListener('mousemove', function(e){
//     console.log(e.x, e.y);
// })