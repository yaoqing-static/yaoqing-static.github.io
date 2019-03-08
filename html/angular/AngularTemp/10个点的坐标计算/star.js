
var path = star(600,8);
var ctx = document.getElementById("canvas").getContext("2d");
ctx.save();
//ctx.translate(300,300);
function draw(){
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#88ccff";
    ctx.fillStyle = "#ffcc88";
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for(var i = 1; i < path.length; i++){
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
    //ctx.fill();
}
var angle = 0;
function rotate(){
    ctx.save();
    ctx.clearRect(0,0,600,600);
    ctx.translate(300,300);
    angle += 0.008;
    ctx.rotate(angle);
    draw();
    ctx.restore();
    window.requestAnimationFrame(rotate);
}
rotate();

function star(w, bw){
    var c18 = Math.cos(Math.PI / 10);
    var s18 = Math.sin(Math.PI / 10);
    var c36 = Math.cos(Math.PI / 5);
    var s36 = Math.sin(Math.PI / 5);
    var r = w/2 - bw/2 / s18;
    var r1 = (w/2*s18 - bw /2) / c36;

    var rtn = [];
    rtn.push({x:0,y:-r});
    rtn.push({x:r1 * s36,y:-r1*c36});
    rtn.push({x:r *c18,y:-r*s18});
    rtn.push({x:r1*c18,y:r1*s18});
    rtn.push({x:r*s36,y:r*c36});
    rtn.push({x:0,y:r1});
    rtn.push({x:-r*s36,y:r*c36});
    rtn.push({x:-r1*c18,y:r1*s18});
    rtn.push({x:-r *c18,y:-r*s18});
    rtn.push({x:-r1 * s36,y:-r1*c36});
    rtn.push({x:0,y:-r});
    return rtn;
}