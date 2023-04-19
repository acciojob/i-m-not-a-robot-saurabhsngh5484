//your JS code here. If required.
//selected required elements 
const imgContainer = document.querySelector('.img-container');
const reset = document.querySelector("#reset")
const verify = document.querySelector("#btn")
let images = document.querySelectorAll('img');
let para = document.querySelector("#para");

//created a new image tag for identical image 
let newele = document.createElement('img');

//suffle the images on load and appended identical image
window.addEventListener("load",()=>{shuffle(images);copy(images)});

//creating an array of image from node-list returned by querySelector
let allimages = (function(){
    let imageArr = [];
    let l = images.length;
	while (l--) { 
        imageArr.push(images[l]);
     }
     imageArr.push(newele)
     return imageArr;
})();

// adding event-listener to all images
function addLintener(){
    let selected = [];
    for(let i = 0; i<allimages.length; i++){
        allimages[i].addEventListener("click", (e)=>{
            if(!e.target.classList.contains("img-active")){
                e.target.classList.add("img-active");
                selected.push(e.target);
                reset.style.display="inline-block";
            }
            else{
                e.target.classList.remove("img-active");
                selected.pop();
            }

            //adding event-listener to reset button
            reset.addEventListener("click",()=>{
                reset.style.display="none";
                for(let j = 0; j<allimages.length; j++){
                    allimages[j].classList.remove("img-active");
                }
                selected = [];
                para.textContent = "";
            })

            //condition for buttons to be rendered or not
            if(selected.length==0){
                reset.style.display="none";
                para.textContent = "";
            }

            if(selected.length===2){
                verify.style.display = "inline-block";
                verified(selected);
            }
            else{
                verify.style.display = "none";
            }
            console.log(selected);
        })
    }
}

//calling function to add event-listener
addLintener();

// add event-listener to verify button
function verified(selected){
    let allClass = ['img1', 'img2', 'img3', 'img4', 'img5'];
    let bool = true;
    verify.addEventListener("click", ()=>{
        console.log("verify");
        console.log(selected);
        verify.style.display = "none"
        for(let k = 0; k<allClass.length; k++){
            if(selected[0].classList.contains(allClass[k]) && selected[1].classList.contains(allClass[k])){
                console.log("same");
                para.textContent = "You are a human. Congratulations!";
                bool = true
				break;
            }
            else{
                bool = false;
            }
        }
        if(bool==false){
            console.log("not same");
            para.textContent = "We can't verify you as a human. You selected the non-identical tiles."
        }
    })
    if(selected.length==0){
        reset.style.display="none";
    }
}


//function to suffle the images
function shuffle(elems) {
    let allElems = (function(){
        let ret = [], l = elems.length;
        while (l--) { 
            ret[ret.length] = elems[l];
        }
        return ret;
    })();
   
    let shuffled = (function(){
        let l = allElems.length;
        while (l--) {
            let random = Math.floor(Math.random() * allElems.length);
            random = Math.floor(Math.random() * l);
            [allElems[l], allElems[random]] = [allElems[random], allElems[l]];
        }
        return allElems; 
    })(), l = elems.length;
      
    for(let i = 0; i<l; i++){
        imgContainer.appendChild(shuffled[i]);
        // imgContainer.removeChild(elems[l]);
    }
}

//function to create and append random identical image
function copy(element){
    let random = Math.floor(Math.random() * element.length);
    let elem = element[random];
    let source = elem.src;
    let classN = elem.className;
    newele.src=source;
    newele.className = classN;

    // console.log(newele);
    imgContainer.appendChild(newele);
}