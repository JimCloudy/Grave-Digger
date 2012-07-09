var bodies = new Array(81);
holesLeft=71;
var calledHole=" ";

for(x=0;x<81;x++)
{
	bodies[x]=" ";
}

function loadBoard()
{
	newFieldElement = document.createElement('UL');
	newFieldElement.setAttribute('id','graves');
	board.appendChild(newFieldElement);
	for(x=0;x<81;x++)
	{
		newFieldElement = document.createElement('LI');
		newFieldElement.setAttribute('id','grave'+x);
		graves.appendChild(newFieldElement);

		newFieldElement = document.createElement('IMG');
		newFieldElement.setAttribute('id','img'+x);
		newFieldElement.setAttribute('name',x);
		newFieldElement.setAttribute('src','plot.bmp');
		newFieldElement.onclick = digHole;
		document.getElementById('grave'+x).appendChild(newFieldElement);
		
	}

	numBodies=10;
	filled=0;
	while(filled<numBodies)
	{
		y=Math.floor(Math.random()*81);
		if(bodies[y]!="body")
		{
			bodies[y]="body";
			filled++;
		}
	}
	bodiesAround();

}

function digHole()
{

	var x=this.getAttribute('name');
	var dig=this.getAttribute('id');
	
	if(bodies[x]=="body")
	{
		for(y=0;y<81;y++)
		{
			if(bodies[y]=="body")
			{
				dig = "img" + y;
				document.getElementById(dig).setAttribute('src','body.bmp');
			}
		}
	}
	else
	{	
		switch(bodies[x])
		{
			case 0:
			document.getElementById(dig).setAttribute('src','hole.bmp');
//			calledHole=" ";
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
		holesLeft=holesLeft-1;
		if(holesLeft==0)
		{
			alert("HEY YOU DID IT!!!!");
		}
	}
}

function bodiesAround()
{
	for(x=0;x<81;x++)
	{
		count=0;
		n=(x+1)%9;
		if(n!=0)
		{
			check=x+1;
			if(bodies[check]=="body")
			{
				count++;
			}
		
			check=x+10;
			if(bodies[check]=="body")
			{
				count++;
			}
			check=x-8;
			if(check>=0)
			{
				if(bodies[check]=="body")
				{
					count++;
				}
			}
		}
		check=x+9;
		if(bodies[check]=="body")
		{
			count++;
		}
		n=x%9;
		if(n!=0)
		{
			check=x+8;
			if(bodies[check]=="body")
			{
				count++;
			}
			check=x-1;
			if(check>=0)
			{
				if(bodies[check]=="body")
					{
						count++;
					}
			}
			check=x-10;
			if(check>=0)
			{
				if(bodies[check]=="body")
					{
						count++;
					}
			}	
		}
		check=x-9;
		if(check>=0)
		{
			if(bodies[check]=="body")
				{
					count++;
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
	hole = document.getElementById(dig).getAttribute('name');
	hole = hole*1;
	n=(hole+1)%9;
	if(n!=0)
	{
		check=hole+1;
		if(check>=0&&check<81)
		{
			calledHole = "img"+(check+1);
			if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
			{
				showHole(calledHole,check);
				if(bodies[check]==0)
				{
					clearHoles(calledHole);
				}
			}
		}
		check=hole+10;
		if(check>=0&&check<81)
		{
			calledHole = "img"+(check+1);
			if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
			{
				showHole(calledHole,check);
				if(bodies[check]==0)
				{
					clearHoles(calledHole);
				}
			}
		}
		check=hole-8;
		if(check>=0&&check<81)
		{
			calledHole = "img"+(check+1);
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
	check=hole+9;
	if(check>=0&&check<81)
	{
		calledHole = "img"+(check+1);
		if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
		{
			showHole(calledHole,check);
			if(bodies[check]==0)
			{
				clearHoles(calledHole);
			}
		}
	}	n=hole%9;
	if(n!=0)
	{
		check=hole+8;
		if(check>=0&&check<81)
		{
			calledHole = "img"+(check+1);
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
		if(check>=0&&check<81)
		{
			calledHole = "img"+(check+1);
			if(document.getElementById(calledHole).getAttribute("src")=="plot.bmp")
			{
				showHole(calledHole,check);
				if(bodies[check]==0)
				{
					clearHoles(calledHole);
				}
			}
		}
		check=hole-10;
		if(check>=0&&check<81)
		{
			calledHole = "img"+(check+1);
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
	check=hole-9;
	if(check>=0&&check<81)
	{
		calledHole = "img"+(check+1);
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

	switch(bodies[hole])
	{
		case 0:
			alert(dig);
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
