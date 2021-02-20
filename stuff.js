
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

class GameElement {
    constructor(jquery_obj)
    {
        this.jq = jquery_obj;
        this. velocity = { // in px / 10 ms
            x: 0, // positive = to the right
            y: 0 // positive = up
        }
    }
    get width()
    {
        return this.jq.width();
    }
    get height()
    {
        return this.jq.height();
    }
    get x() // relative to game 
    {
        return this.jq.position().left;
    }
    get y()
    {
        return this.jq.position().top;
    }
    get xCenter() // relative to page
    {
        return this.jq.offset().left+(this.width/2);
    }
    get yCenter()
    {
        return this.jq.offset().top+(this.height/2);
    }
    move(down, right)
    {
        this.jq.offset({top: this.jq.offset().top+down, left: this.jq.offset().left+right});
    }
    moveTo(x, y) // relative to game
    {
        let new_y = game.offset().top+y;
        let new_x = game.offset().left+x;
        this.jq.offset({top: new_y, left: new_x});
    }
}

var dino = new GameElement($('#dino'));
document.getElementById('dino').style.zIndex = 100;
var game = $('#game');

class Projectile extends GameElement{
    //start_x and start_y relative to game
    constructor(start_x, start_y, vel_x, vel_y){
        // make a projectile
        super($('<img/>'));
        console.log(game.offset().left+start_x);
        this.jq.attr('src', 'blue_circle.png');
        this.jq.attr('width', 20);
        game.append(this.jq);
        this.jq.offset({top: game.offset().top+start_y, left: game.offset().left+start_x});
        this.velocity.x = vel_x;
        this.velocity.y = vel_y;
    }
}
var proj_list = [];

class Enemy{
    constructor(){
        //generate an enemy
        var img = new Image(); //create 
        img.src = 'https://cdn0.iconfinder.com/data/icons/birds-colored/48/Animals_Birds_Artboard_7-128.png'
        img.setAttribute('draggable', false);
        //set enemy position/details
        //img.style.left="1px";

        //appending to the board
        document.getElementById('game').appendChild(img);
    }
}
var enemy_list = [];


$(document).ready(function() {//when the doc loads
    enemy_list.push(new Enemy());
    dino.moveTo(game.width()/2, game.height()/2);
});

document.addEventListener('click', function(e){
    // have a velocity vector in the opposite direction of the click
    let x_portion = e.x - dino.xCenter; 
    let y_portion = e.y - dino.yCenter;
    let x_comp = x_portion/Math.sqrt(x_portion*x_portion+y_portion*y_portion);
    let y_comp = y_portion/Math.sqrt(x_portion*x_portion+y_portion*y_portion);
    let dino_vel_coef = -1;
    dino.velocity.x += x_comp * dino_vel_coef;
    dino.velocity.y += y_comp * dino_vel_coef;

    //shoot projectile
    proj_list.push(new Projectile(dino.x, dino.y, x_comp, y_comp));
})

//Game Loop
setInterval(function(){
    //console.log(dino.velocity.x, dino.velocity.y);
    dino.move(dino.velocity.y, dino.velocity.x);
    for(let i=0; i < proj_list.length; ++i)
    {
        //check if exits screen
        console.log(proj_list[i]);
        if(proj_list[i].x+proj_list[i].width < 0
        || proj_list[i].x > game.width()
        || proj_list[i].y+proj_list[i].height < 0
        || proj_list[i].y > game.height())
        {
            //remove from screen
            
            //remove from array
            proj_list.splice(i, 1);
            --i;
            continue;
        }
        //move projectile
        console.log
        proj_list[i].move(proj_list[i].velocity.y, proj_list[i].velocity.x);
    }

}, 10);