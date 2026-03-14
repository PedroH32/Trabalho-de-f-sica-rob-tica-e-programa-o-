const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const track = {
x:100,
y:100,
w:800,
h:500
}

const checkpoints = [
{x:200,y:150},
{x:600,y:120},
{x:850,y:300},
{x:700,y:550},
{x:300,y:580},
{x:150,y:350}
]

class Kart{

constructor(x,y,color){

this.x=x
this.y=y
this.angle=0
this.vel=0
this.maxSpeed=6
this.color=color
this.target=0
}

move(){

this.x += Math.cos(this.angle*Math.PI/180)*this.vel
this.y -= Math.sin(this.angle*Math.PI/180)*this.vel

if(this.vel>0){
this.vel -=0.03
}
}

accelerate(){

this.vel+=0.2

if(this.vel>this.maxSpeed){
this.vel=this.maxSpeed
}

}

turnLeft(){
if(this.vel>0.2){
this.angle+=3
}
}

turnRight(){
if(this.vel>0.2){
this.angle-=3
}
}

collision(){

if(
this.x<track.x ||
this.x>track.x+track.w ||
this.y<track.y ||
this.y>track.y+track.h
){
this.vel*=-0.5
}

}

draw(){

ctx.save()

ctx.translate(this.x,this.y)
ctx.rotate(this.angle*Math.PI/180)

ctx.fillStyle=this.color
ctx.fillRect(-20,-10,40,20)

ctx.restore()

}

}

class AIKart extends Kart{

aiDrive(){

let target = checkpoints[this.target]

let dx = target.x - this.x
let dy = target.y - this.y

let desired = Math.atan2(-dy,dx)*180/Math.PI

let diff = desired - this.angle

if(diff>5){
this.turnLeft()
}

if(diff<-5){
this.turnRight()
}

this.accelerate()

let dist = Math.hypot(dx,dy)

if(dist<40){
this.target=(this.target+1)%checkpoints.length
}

}

}

const player = new Kart(500,520,"red")

let enemies=[]

for(let i=0;i<7;i++){

enemies.push(
new AIKart(
500+Math.random()*50-25,
520+Math.random()*50-25,
"hsl("+Math.random()*360+",70%,60%)"
)
)

}

const keys={}

document.addEventListener("keydown",e=>{
keys[e.key]=true
})

document.addEventListener("keyup",e=>{
keys[e.key]=false
})

function update(){

if(keys["ArrowUp"]){
player.accelerate()
}

if(keys["ArrowLeft"]){
player.turnLeft()
}

if(keys["ArrowRight"]){
player.turnRight()
}

player.move()
player.collision()

enemies.forEach(e=>{
e.aiDrive()
e.move()
e.collision()
})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="gray"
ctx.fillRect(track.x,track.y,track.w,track.h)

checkpoints.forEach(c=>{
ctx.fillStyle="yellow"
ctx.beginPath()
ctx.arc(c.x,c.y,5,0,Math.PI*2)
ctx.fill()
})

player.draw()

enemies.forEach(e=>{
e.draw()
})

}

function gameLoop(){

update()
draw()

requestAnimationFrame(gameLoop)

}

gameLoop()const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const track = {
x:100,
y:100,
w:800,
h:500
}

const checkpoints = [
{x:200,y:150},
{x:600,y:120},
{x:850,y:300},
{x:700,y:550},
{x:300,y:580},
{x:150,y:350}
]

class Kart{

constructor(x,y,color){

this.x=x
this.y=y
this.angle=0
this.vel=0
this.maxSpeed=6
this.color=color
this.target=0
}

move(){

this.x += Math.cos(this.angle*Math.PI/180)*this.vel
this.y -= Math.sin(this.angle*Math.PI/180)*this.vel

if(this.vel>0){
this.vel -=0.03
}
}

accelerate(){

this.vel+=0.2

if(this.vel>this.maxSpeed){
this.vel=this.maxSpeed
}

}

turnLeft(){
if(this.vel>0.2){
this.angle+=3
}
}

turnRight(){
if(this.vel>0.2){
this.angle-=3
}
}

collision(){

if(
this.x<track.x ||
this.x>track.x+track.w ||
this.y<track.y ||
this.y>track.y+track.h
){
this.vel*=-0.5
}

}

draw(){

ctx.save()

ctx.translate(this.x,this.y)
ctx.rotate(this.angle*Math.PI/180)

ctx.fillStyle=this.color
ctx.fillRect(-20,-10,40,20)

ctx.restore()

}

}

class AIKart extends Kart{

aiDrive(){

let target = checkpoints[this.target]

let dx = target.x - this.x
let dy = target.y - this.y

let desired = Math.atan2(-dy,dx)*180/Math.PI

let diff = desired - this.angle

if(diff>5){
this.turnLeft()
}

if(diff<-5){
this.turnRight()
}

this.accelerate()

let dist = Math.hypot(dx,dy)

if(dist<40){
this.target=(this.target+1)%checkpoints.length
}

}

}

const player = new Kart(500,520,"red")

let enemies=[]

for(let i=0;i<7;i++){

enemies.push(
new AIKart(
500+Math.random()*50-25,
520+Math.random()*50-25,
"hsl("+Math.random()*360+",70%,60%)"
)
)

}

const keys={}

document.addEventListener("keydown",e=>{
keys[e.key]=true
})

document.addEventListener("keyup",e=>{
keys[e.key]=false
})

function update(){

if(keys["ArrowUp"]){
player.accelerate()
}

if(keys["ArrowLeft"]){
player.turnLeft()
}

if(keys["ArrowRight"]){
player.turnRight()
}

player.move()
player.collision()

enemies.forEach(e=>{
e.aiDrive()
e.move()
e.collision()
})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="gray"
ctx.fillRect(track.x,track.y,track.w,track.h)

checkpoints.forEach(c=>{
ctx.fillStyle="yellow"
ctx.beginPath()
ctx.arc(c.x,c.y,5,0,Math.PI*2)
ctx.fill()
})

player.draw()

enemies.forEach(e=>{
e.draw()
})

}

function gameLoop(){

update()
draw()

requestAnimationFrame(gameLoop)

}

gameLoop()
