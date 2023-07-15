const liftData =[];

const submitClick =()=>{
    const groundFloor = document.getElementById("floors");
    groundFloor.innerHTML = "";
    const floorCount = document.getElementById("floorCount").value;
    const liftCount = document.getElementById("liftCount").value;
    console.log("floorcount : "+floorCount+"   liftCount : "+liftCount);
    createFloor(floorCount,liftCount);

}

const createFloor =(floorCount,liftCount)=>{
    for(idx=1;idx<=floorCount;idx++){
        const floors = document.getElementById("floors");
        let floorIdx = floors.childElementCount;
        let currentFloor = floorIdx+1;

        const floor = creatFloorSkeleton(currentFloor);
        floors.insertBefore(floor,floors.firstChild);
        if(floorIdx === 0){
            floors.setAttribute("class","floors-border");
            createLift(liftCount);
        }
    }
    const floors = document.getElementById("floors");
    floors.lastChild.children[0].children[1].children[1].setAttribute("style","visibility:hidden");
    floors.firstChild.children[0].children[1].children[0].setAttribute("style","visibility:hidden")
}

const createLift =(liftCount)=>{
    const groundFloor = document.getElementById('lifts-container-1');
  
    for(idx2=1;idx2<=liftCount;idx2++){
        const lift=document.createElement('div');
        const liftLeftDoor = document.createElement('div');
        const liftRightDoor = document.createElement('div');
    
        lift.setAttribute('class','lift');
        lift.setAttribute('id','lift-'+idx2);
        liftLeftDoor.setAttribute('class','liftLeftDoor');
        liftRightDoor.setAttribute('class','liftRightDoor');
        lift.appendChild(liftLeftDoor);
        lift.appendChild(liftRightDoor);
        groundFloor.appendChild(lift);
        liftData.push({
            id :'lift-'+idx2,
            floor: 1,
            inTransition:false
        })
    }
    
}

const creatFloorSkeleton = (id)=>{
    const floor = document.createElement("div");
    floor.setAttribute("class","floor");
    floor.setAttribute("id",id);

    // Floor Details
    const floorDetails = document.createElement("div");
    floorDetails.setAttribute("class","floorDetails");

    const liftsContainer=document.createElement('div');
    liftsContainer.setAttribute('class','lifts-container');
    liftsContainer.setAttribute('id','lifts-container-'+id);

    const floorName = document.createElement("div");
    floorName.innerHTML = "Floor "+id;

    const floorButtons = document.createElement("div");
    floorButtons.setAttribute("class","floorButtons")

    const upButton = document.createElement("input");
    upButton.setAttribute("type","button");
    upButton.setAttribute("value","up");
    upButton.setAttribute("onclick","moveup("+(id)+")")
    const downButton = document.createElement("input");
    downButton.setAttribute("type","button");
    downButton.setAttribute("value","down");
    downButton.setAttribute("onclick","movedown("+(id)+")")

    floorButtons.appendChild(upButton);
    floorButtons.appendChild(downButton);

    floorDetails.appendChild(floorName)
    floorDetails.appendChild(floorButtons)

    floor.appendChild(floorDetails);
    floor.appendChild(liftsContainer);

    return floor;
}

const openLift = (lift,floorNumber)=>{
    setTimeout(()=>{
        lift.children[0].setAttribute("style","width:0px");
        lift.children[1].setAttribute("style","width:0px")
    },1000*floorNumber)
}

const closeLift = (lift,floorNumber)=>{
    setTimeout(()=>{
        lift.children[0].setAttribute("style","width:30px");
        lift.children[1].setAttribute("style","width:30px");
        liftData.forEach((l)=>{
            if(l.id == liftId){
                l.floor=floorNumber;
                l.inTransition=false;
            }
        })
    },(1000*floorNumber)+2500)
}

const movedown= (floorNumber)=>{ 
    const liftId=calculateLiftMovement(floorNumber,"down");
    const lift = document.getElementById(liftId)
    movelift(lift,floorNumber);
    liftData.forEach((l)=>{
        if(l.id == liftId){
            l.floor=floorNumber;
        }
    })
}

const moveup= (floorNumber)=>{   
    const liftId=calculateLiftMovement(floorNumber,"up");
    const lift = document.getElementById(liftId)
    liftData.forEach((l)=>{
        if(l.id == liftId){
            l.inTransition=true;
        }
    })
    movelift(lift,floorNumber);
}

const movelift= (lift,floorNumber)=>{
    lift.setAttribute("style","transform: translateY(-"+(floorNumber-1)*116+"px); transition: transform "+1000*(floorNumber-1)+"ms ease 0s;")
    openLift(lift,floorNumber);
    closeLift(lift,floorNumber);
}

const calculateLiftMovement =(floorNumber,movement)=>{
    liftId=findClosestLift(floorNumber);
    return liftId;
}

const findClosestLift = (floorNumber)=>{
    let diff=Infinity;
    let closestLift;
    liftData.forEach((l)=>{
        let subtract=floorNumber-l.floor;
        if((diff*diff)>(subtract*subtract) ){
            diff=Math.abs(subtract);
            closestLift=l.id;
        }
    })

    return closestLift;
}
