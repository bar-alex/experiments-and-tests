//Based on a pen by @nicksheffield
var anchors = document.querySelectorAll('a.like')

Array.prototype.forEach.call(anchors, function(anchor) {
	anchor.addEventListener('click', explode)
})

function explode(e) {
    [].map.call(anchors, function(el) {
            el.classList.toggle('active');
        });
	var x = e.clientX
	var y = e.clientY
	var c = document.createElement('canvas')
	var ctx = c.getContext('2d')
	var ratio = window.devicePixelRatio
	var particles = []
	
	document.body.appendChild(c)
	
	c.style.position = 'absolute'
	c.style.left = (x - 50) + 'px'
	c.style.top = (y - 50) + 'px'
	c.style.pointerEvents = 'none'
	c.style.width = 100 + 'px'
	c.style.height = 100 + 'px'
	c.width = 100 * ratio
	c.height = 100 * ratio
	
	function Particle() {
		return {
			x: c.width / 2,
			y: c.height / 2,
			radius: 10,
			color: 'rgb(' + [r(100,255), r(100,255), r(100,255)].join(',') + ')',
			rotation: r(0,360, true),
			speed:4,
			friction: 0.9,
			opacity: r(0,0.5, true),
			yVel: 0,
			gravity: 0
		}
	}
	
	for(var i=0; ++i<15;) {
		particles.push(Particle())
	}
	
	
	
	function render() {
		ctx.clearRect(0, 0, c.width, c.height)
		
		particles.forEach(function(p, i) {
			
			angleTools.moveOnAngle(p, p.speed)
			
			p.opacity -= 0.01
			p.speed *= p.friction
			p.radius *= p.friction
			
			p.yVel += p.gravity
			p.y += p.yVel
			
			if(p.opacity < 0) return
			if(p.radius < 0) return
			
			ctx.beginPath()
			ctx.globalAlpha = p.opacity
			ctx.fillStyle = p.color
			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false)
			ctx.fill()
		})
	}
	
	;(function renderLoop(){
		requestAnimationFrame(renderLoop)
		render()
	})()
	
	setTimeout(function() {
		document.body.removeChild(c)
	}, 3000)
}

var angleTools={
        getAngle: function(t,n){
                var a=n.x-t.x,
                    e=n.y-t.y;
                return Math.atan2(e,a)/Math.PI*180
            },
        getDistance: function(t,n){
                var a=t.x-n.x,
                    e=t.y-n.y;
                return Math.sqrt(a*a+e*e)
            },
        moveOnAngle: function(t,n){
                var a=this.getOneFrameDistance(t,n);
                t.x+=a.x,
                t.y+=a.y
            },
        getOneFrameDistance: function(t,n){
                return {
                    x: n*Math.cos(t.rotation*Math.PI/180),
                    y: n*Math.sin(t.rotation*Math.PI/180)
                        }
            }
    };

function r(a,b,c){ 
    return parseFloat((Math.random()*((a?a:1)-(b?b:0))+(b?b:0)).toFixed(c?c:0)); 
}
