
// TODO
// game board
//     christina is making a GIF space background - in css file
// character
//     if move off screen, can wrap around
//     code as wrap around BUT we should see if it's nice 
//         if not, we can just comment it out
// lasers bullets
//  /
// enemies
//     have the collistion end the game or lose life

// power ups - LAST PRIORITY??
//     garbage :) like literal space trash

// sound FX
// end game
//     3 lives? - seagulls charge you to kill you x_x
//     1 hit 1 kill

class GameElement {
    constructor(jquery_obj)
    {
        this.jq = jquery_obj;
        this.velocity = { // in px / 10 ms
            x: 0, // positive = to the right
            y: 0 // positive = down
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
    overlapsWith(ele)
    {
        return !(this.x+this.width < ele.x || 
                this.x > ele.x+ele.width || 
                this.y+this.height < ele.y || 
                this.y > ele.y+ele.height);
    }
}

class Projectile extends GameElement{
    //start_x and start_y are relative to game
    constructor(start_x, start_y, vel_x, vel_y){
        // make a projectile
        super($('<img/>'));
        this.jq.attr('src', 'laser.png');
        this.jq.attr('width', 13);
        game.append(this.jq);
        this.jq.css('position', 'absolute');
        //start position
        this.moveTo(start_x, start_y);
        //this.jq.offset({top: game.offset().top+start_y, left: game.offset().left+start_x});
        this.velocity.x = vel_x;
        this.velocity.y = vel_y;
    }
}
var proj_list = [];

class Enemy extends GameElement{
    constructor(center_start_x, center_start_y, vel_x, vel_y){
        // make a projectile
        super($('<img/>'));
        this.jq.attr('width', 50);
        game.append(this.jq);
        this.jq.css('position', 'absolute');
        this.jq.offset({top: game.offset().top+center_start_y, left: game.offset().left+center_start_x});
        this.velocity.x = vel_x;
        this.velocity.y = vel_y;
        this.setDirectionImage();
    }

    setDirectionImage()
    {
        if(this.velocity.x >= 0)
        {
            this.jq.attr('src', 'spacegull_right.gif');
        }
        else
        {
            this.jq.attr('src', 'spacegull_left.gif');
        }
    }
}
var enemy_list = [];


var dino = new GameElement($('#dino'));
document.getElementById('dino').style.zIndex = 100;
var game = $('#game');
var score = 0;
var isResetting = false;
//gameblockers
function drawBoarders()
{
    $('#left-block').css(
        {
            top: `${-100}px`,
            left: `${-100}px`,
            width: `${100}px`,
            height: `${200 + game.height()}`
        }
    );
    $('#right-block').css(
        {
            top: `${-100}px`,
            left: `${game.width()}px`,
            width: `${100}px`,
            height: `${200 + game.height()}`
        }
    );
    $('#top-block').css(
        {
            top: `${-100}px`,
            left: `${-100}px`,
            width: `${200+game.width()}px`,
            height: `${100}`
        }
    );
    $('#bottom-block').css(
        {
            top: `${game.height()}px`,
            left: `${-100}px`,
            width: `${200+game.width()}px`,
            height: `${100}`
        }
    );
}

$(document).ready(function() {//when the doc loads
    //enemy_list.push(new Enemy());
    dino.moveTo(game.width()/2, game.height()/2);
});

document.addEventListener('click', function(e){
    if(isResetting) return;
    // have a velocity vector in the opposite direction of the click
    let x_portion = e.pageX - dino.xCenter; 
    let y_portion = e.pageY - dino.yCenter;
    let x_comp = x_portion/Math.sqrt(x_portion*x_portion+y_portion*y_portion);
    let y_comp = y_portion/Math.sqrt(x_portion*x_portion+y_portion*y_portion);
    let dino_vel_coef = -2.0;
    dino.velocity.x += x_comp * dino_vel_coef;
    dino.velocity.y += y_comp * dino_vel_coef;

    //shoot projectile
    let proj_vel_coeff = 15;
    proj_list.push(new Projectile(dino.x+(dino.width/2), dino.y+(dino.height/2), x_comp*proj_vel_coeff, y_comp*proj_vel_coeff));
})

//enemy creation loop
setInterval(function(){
    let enemy = new Enemy();
    let side = Math.floor(Math.random()*4);
    let dist = Math.random()*(game.width()+enemy.width); // assuming the game width and height are the same
    let vel_x = 0;
    let vel_y = 0;
    //spawn based on side
    if(side == 0) //top side
    {
        enemy.moveTo(-enemy.width+dist, -enemy.height+1);
        vel_y = 1;
    }
    else if(side == 1) //left side
    {
        enemy.moveTo(-enemy.width+1, -enemy.height+dist);
        vel_x = 1;
    }
    else if(side == 2) //bottom side
    {
        enemy.moveTo(-enemy.width+dist, game.height());
        vel_y = -1;
    }
    else if(side == 3) //right side
    {
        enemy.moveTo(game.width(), -enemy.height+dist);
        vel_x = -1;
    }
    let enemy_vel_coeff = 5;
    enemy.velocity.x = vel_x * enemy_vel_coeff;
    enemy.velocity.y = vel_y * enemy_vel_coeff;

    enemy.setDirectionImage();
    enemy_list.push(enemy);
    //enemy_list.push(new Enemy(Math.random()*game.width(), Math.random()*game.height()));
}, 3000);


//Game Loop
setInterval(function(){
    drawBoarders();
    //console.log(dino.velocity.x, dino.velocity.y);
    dino.move(dino.velocity.y, dino.velocity.x);
        //kill when moved off screen
    if(dino.x+dino.width < 0
    || dino.x > game.width()
    || dino.y+dino.height < 0
    || dino.y > game.height())
    {
        //background becomes GAME OVER
        reset();
    }
    

    for(let i=0; i < proj_list.length; ++i)
    {
        //check if exits screen
        if(proj_list[i].x+proj_list[i].width < 0
        || proj_list[i].x > game.width()
        || proj_list[i].y+proj_list[i].height < 0
        || proj_list[i].y > game.height())
        {
            //remove from screen
            proj_list[i].jq.remove();
            //remove from array
            proj_list.splice(i, 1);
            --i;
            continue;
        }
        //move projectile
        proj_list[i].move(proj_list[i].velocity.y, proj_list[i].velocity.x);
    }
    for(let i = 0; i < enemy_list.length; ++i)
    {
        if(enemy_list[i].x+enemy_list[i].width < 0
        || enemy_list[i].x > game.width()
        || enemy_list[i].y+enemy_list[i].height < 0
        || enemy_list[i].y > game.height())
        {
            //remove from screen
            enemy_list[i].jq.remove();
            //remove from array
            enemy_list.splice(i, 1);
            --i;
            continue;
        }
        enemy_list[i].move(enemy_list[i].velocity.y, enemy_list[i].velocity.x);
    }

    // check collisions between enemies and projectiles
    for(let i = 0; i < enemy_list.length; ++i)
    {
        for(let j = 0; j < proj_list.length; ++j)
        {
            if(enemy_list[i].overlapsWith(proj_list[j]))
            {
                // delete the enemy
                //remove from screen
                enemy_list[i].jq.remove();
                //remove from array
                enemy_list.splice(i, 1);
                --i;
                score += 1;
                updateScore();
                break;
            }
        }
    }

    for(let i = 0; i < enemy_list.length; ++i)
    {
        if(dino.overlapsWith(enemy_list[i])) // d e a t h :O
        {
            //background becomes GAME OVER
            reset();
        }
    }

}, 33); // about 30 fps

function reset()
{
    isResetting = true;
    dino = new GameElement($('#dino'));
    dino.moveTo(game.width()/2, game.height()/2);
    score = 0;
    updateScore()
    for(let i=0; i < proj_list.length; ++i)
    {
        //remove from screen
        proj_list[i].jq.remove();
    }
    for(let i = 0; i < enemy_list.length; ++i)
    {
        //remove from screen
        enemy_list[i].jq.remove();
    }
    proj_list = [];
    enemy_list = [];
    setTimeout(function()
    {
        isResetting = false;
    }, 100)
}

function updateScore()
{
    document.getElementById('score').innerHTML = 'Score: '+ score;
}

document.addEventListener('mousemove', function(e){
    if(dino.xCenter < e.pageX) dino.jq.attr('src', 'dino_right.png');
    else dino.jq.attr('src', 'dino_left.png');
})

$('#reset').offset({
    top: (game.offset().top + game.height()) + ($('#reset').height()/2),
    left: (game.offset().left + game.width()/2) - ($('#reset').width()/2)
});