var bodies; 
var holesLeft;
var calledHole;
var dugABody;
var numCells;
var curGame;
var clockId;
var gameStarted;
var gameTime=0;

function Timer() 
{
	gameTime = gameTime+1;
	var hldr = String(gameTime);
	if(hldr.length == 1)
	{
		document.getElementById("clock").firstChild.nodeValue = "00" + gameTime;
	}
	else if(hldr.length == 2)
	{
		document.getElementById("clock").firstChild.nodeValue = "0" + gameTime;
	}
	else if(hldr.length == 3)
	{
		document.getElementById("clock").firstChild.nodeValue = gameTime;
	}
	else
	{
		document.getElementById("clock").firstChild.nodeValue = "999";
	}

}

function loadBoard(numRow)
{
	gameTime=0;
	if(gameStarted)
	{
		clearInterval(clockId);
		document.getElementById("clock").firstChild.nodeValue = "000";
	}
	gameStarted=false;
	curGame=numRow;
	numCells = curGame*curGame;
	bodies = new Array(numCells);
	board.innerHTML="";
	if(curGame==9)
	{
		numBodies=10;
		board.style.width="450px";
	}
	else if(curGame==12)
	{
		numBodies=36;
		board.style.width="600px";
	}
	else if(curGame==15)
	{
		numBodies=40;
		board.style.width="750px";
	}
	holesLeft=numCells-numBodies;
	calledHole=" ";
	dugABody = false;
	for(x=0;x<numCells;x++)
	{
		bodies[x]=" ";
	}
	newFieldElement = document.createElement('UL');
	newFieldElement.setAttribute('id','graves');
	board.appendChild(newFieldElement);
	for(x=0;x<numCells;x++)
	{
		newFieldElement = document.createElement('LI');
		newFieldElement.setAttribute('id','grave'+x);
		graves.appendChild(newFieldElement);

		newFieldElement = document.createElement('IMG');
		newFieldElement.setAttribute('id','img'+x);
		newFieldElement.setAttribute('name',x);
		newFieldElement.setAttribute('src','plot.bmp');
		newFieldElement.onmousedown = digHole;
		document.getElementById('grave'+x).appendChild(newFieldElement);
		
	}

	filled=0;
	while(filled<numBodies)
	{
		y=Math.floor(Math.random()*numCells);
		if(bodies[y]!="body")
		{
			bodies[y]="body";
			filled++;
		}
	}
	bodiesAround();

}

function digHole(e)
{
	if(dugABody)
	{
		return;
	}
	
	var x=this.getAttribute('name');
	var dig=this.getAttribute('id');

	if(document.getElementById(dig).getAttribute('src') != 'headstone.bmp' && document.getElementById(dig).getAttribute('src') != 'plot.bmp')
	{
		return;
	}


	if (navigator.appName == 'Netscape' && (e.which == 3 || e.which == 2))
	{
		if(e.which == 3)
		{
			if(!gameStarted)
			{
				gameStarted = true;
				clockId = setInterval('Timer()', 1000 );
			}
				
			if(document.getElementById(dig).getAttribute('src') == 'headstone.bmp')
			{
				document.getElementById(dig).setAttribute('src','plot.bmp');
			}
			else
			{
				document.getElementById(dig).setAttribute('src','headstone.bmp');
			}
		}
		else
		{
			e.preventDefault();
		}
		return;
	}
	else if (navigator.appName == 'Microsoft Internet Explorer' && (event.button == 2 || event.button == 3))
       	{
		if(e.button == 3)
		{
			if(!gameStarted)
			{
				gameStarted = true;
				clockId = setInterval('Timer()', 1000 );
			}
			if(document.getElementById(dig).getAttribute('src') == 'headstone.bmp')
			{
				document.getElementById(dig).setAttribute('src','plot.bmp');
			}
			else
			{
				document.getElementById(dig).setAttribute('src','headstone.bmp');
			}
		}
		else
		{
			e.preventDefault();
		}
		return;
	}
	else
	{
		if(!gameStarted)
		{
			gameStarted = true;
			clockId = setInterval('Timer()', 1000 );
		}
		if(document.getElementById(dig).getAttribute('src') == 'headstone.bmp')
		{
			return;
		}
	}	
	
	if(bodies[x]=="body")
	{
		for(y=0;y<numCells;y++)
		{
			if(bodies[y]=="body")
			{
				dig = "img" + y;
				document.getElementById(dig).setAttribute('src','body.bmp');
				dugABody=true;
				clearInterval(clockId);
			}
		}
	}
	else
	{	
		if(document.getElementById(dig).getAttribute('src')=='plot.bmp')
		{
			holesLeft=holesLeft-1;
		}
		switch(bodies[x])
		{
			case 0:
			document.getElementById(dig).setAttribute('src','hole.bmp');
			clearHoles(dig);
			break;
			case 1:
			document.getElementById(dig).setAttribute('src','1hole.bmp');
			break;
			case 2:
			document.getElementById(dig).setAttribute('src','2hole.bmp');
			break;
			case 3:
			document.getElementById(dig).setAttribute('src','3hole.bmp');
			break;
			case 4:
			document.getElementById(dig).setAttribute('src','4hole.bmp');
			break;
			case 5:
			document.getElementById(dig).setAttribute('src','5hole.bmp');
			break;
			case 6:
			document.getElementById(dig).setAttribute('src','6hole.bmp');
			break;
			case 7:
			document.getElementById(dig).setAttribute('src','7hole.bmp');
			break;
			case 8:
			document.getElementById(dig).setAttribute('src','8hole.bmp');
			break;
			default:
			document.getElementById(dig).setAttribute('src','hole.bmp');
			break;
		}
		if(holesLeft==0)
		{
			clearInterval(clockId);
			alert("HEY YOU DID IT!!!! It took you " + gameTime + " seconds!");
			//loadBoard(curGame);
		}
	}
}

function bodiesAround()
{
	for(x=0;x<numCells;x++)
	{
		count=0;
		n=(x+1)%curGame;
		if(n!=0)
		{
			check=x+1;
			if(check>=0&&check<numCells)
			{
				if(bodies[check]=="body")
				{
					count++;
				}
			}
			check=x+curGame+1;
			if(check>=0&&check<numCells)
			{
				if(bodies[check]=="body")
				{
					count++;
				}
			}
			check=x-curGame+1;
			if(check>=0&&check<numCells)
			{
				if(check>=0)
				{
					if(bodies[check]=="body")
					{
						count++;
					}
				}
			}
		}
		check=x+curGame;
		if(check>=0&&check<numCells)
		{
			if(bodies[check]=="body")
			{
				count++;
			}
		}
		n=x%curGame;
		if(n!=0)
		{
			check=x+curGame-1;
			if(check>=0&&check<numCells)
			{
				if(bodies[check]=="body")
				{
					count++;
				}
			}
			check=x-1;
			if(check>=0&&check<numCells)
			{
				if(check>=0)
				{
					if(bodies[check]=="body")
						{
							count++;
						}
				}
			}
			check=x-curGame-1;
			if(check>=0&&check<numCells)
			{
				if(check>=0)
				{
					if(bodies[check]=="body")
						{
							count++;
						}
				}	
			}
		}
		check=x-curGame;
		if(check>=0&&check<numCells)
		{
			if(check>=0)
			{
				if(bodies[check]=="body")
					{
						count++;
					}
			}
		}
		if(bodies[x]!="body")
		{
			bodies[x]=count;
		}	
	}
}

function clearHoles(dig)
{
	var hole = document.getElementById(dig).getAttribute('name');
	hole = hole*1;
	if(bodies[hole]!=0)
	{
		return;
	}
	n=(hole+1)%curGame;
	if(n!=0)
	{
		check=hole-curGame+1;
		if(check>=0&&check<numCells)
		{
			calledHole = "img"+(check);
			if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
			{
				showHole(calledHole,check);
				if(bodies[check]==0)
				{
					clearHoles(calledHole);
				}
			}
		}
		check=hole+1;
		if(check>=0&&check<numCells)
		{
			calledHole = "img"+(check);
			if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
			{
				showHole(calledHole,check);
				if(bodies[check]==0)
				{
					clearHoles(calledHole);
				}
			}
		}
		check=hole+curGame+1;
		if(check>=0&&check<numCells)
		{
			calledHole = "img"+(check);
			if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
			{
				showHole(calledHole,check);
				if(bodies[check]==0)
				{
					clearHoles(calledHole);
				}
			}
		}
	}
	check=hole+curGame;
	if(check>=0&&check<numCells)
	{
		calledHole = "img"+(check);
		if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
		{
			showHole(calledHole,check);
			if(bodies[check]==0)
			{
				clearHoles(calledHole);
			}
		}
	}	
	n=hole%curGame;
	if(n!=0)
	{
		check=hole+curGame-1;
		if(check>=0&&check<numCells)
		{
			calledHole = "img"+(check);
			if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
			{
				showHole(calledHole,check);
				if(bodies[check]==0)
				{
					clearHoles(calledHole);
				}
			}
		}
		check=hole-1;
		if(check>=0&&check<numCells)
		{
			calledHole = "img"+(check);
			if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
			{
				showHole(calledHole,check);
				if(bodies[check]==0)
				{
					clearHoles(calledHole);
				}
			}
		}
		check=hole-curGame-1;
		if(check>=0&&check<numCells)
		{
			calledHole = "img"+(check);
			if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
			{
				showHole(calledHole,check);
				if(bodies[check]==0)
				{
					clearHoles(calledHole);
				}
			}
		}
	}
	check=hole-curGame;
	if(check>=0&&check<numCells)
	{
		calledHole = "img"+(check);
		if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
		{
			showHole(calledHole,check);
			if(bodies[check]==0)
			{
				clearHoles(calledHole);
			}
		}
	}
}

function showHole(dig,hole)
{
	holesLeft=holesLeft-1;
	switch(bodies[hole])
	{
		case 0:
		document.getElementById(dig).setAttribute('src','hole.bmp');
		break;
		case 1:
		document.getElementById(dig).setAttribute('src','1hole.bmp');
		break;
		case 2:
		document.getElementById(dig).setAttribute('src','2hole.bmp');
		break;
		case 3:
		document.getElementById(dig).setAttribute('src','3hole.bmp');
		break;
		case 4:
		document.getElementById(dig).setAttribute('src','4hole.bmp');
		break;
		case 5:
		document.getElementById(dig).setAttribute('src','5hole.bmp');
		break;
		case 6:
		document.getElementById(dig).setAttribute('src','6hole.bmp');
		break;
		case 7:
		document.getElementById(dig).setAttribute('src','7hole.bmp');
		break;
		case 8:
		document.getElementById(dig).setAttribute('src','8hole.bmp');
		break;
		default:
		document.getElementById(dig).setAttribute('src','hole.bmp');
		break;
	}
}
