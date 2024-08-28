// refrence varaiable that represent all the buttons on the centre
// inside bracket, has the class name or css selector  

let btnRef = document.querySelectorAll(".btn-move")
let popupRef = document.querySelector(".popup")
let newGameBtn = document.querySelector("#btn-new-game")
let restartBtn = document.querySelector("#btn-restart");
let msgRef = document.querySelector("#message");
let turnX =document.querySelector("#x-turn");
let turnO = document.querySelector("#o-turn");

// adding the custom class
turnX.classList.add("glow");

// for winning condition we need to check all the boxes , so we make an array then we'll aply loop in it 
let winningPattern =  [[0,1,2],
                       [3,4,5],
                       [6,7,8],
                       [0,3,6],
                       [1,4,7],
                       [2,5,8],
                       [0,4,8],
                       [2,4,6]];

let xTurn = true;
let count = 0;

//  checking winning condition

const winChecker = () =>{
    // arr will contain subarrays
    for(let arr of winningPattern){
        let[ele1,ele2,ele3] =[btnRef[arr[0]].innerText,
                             btnRef[arr[1]].innerText,
                             btnRef[arr[2]].innerText];
        // before deciding ele1 ele2 ele3 are equal or not we will check if they are blank
        if(ele1 !== "" && ele2 !== "" && ele3 !== ""){
            if(ele1 === ele2 && ele2 === ele3){
                winFunction(ele1);
                break;
            }
        }
    }
};

const winFunction = (character) => {
    setTimeout(() =>{ //for a delay before showing the results and while its is deciding we'll disable the buttons so that no one can use it 
        disableButtons();
        if( character === "X"){
            msgRef.innerHTML = "Winner is X ! &#x1f3c6"
            // winning trouphy
          }
          else{
            msgRef.innerHTML = "Winner is O ! &#x1f3c6"
          }
    },500);
      
};

const disableButtons = () => {
    // each button will be disabled
    btnRef.forEach((btn) => {
        btn.disabled = true;
    });
    //  now we will enable the popup, we had given hide class to hide it now remove the class
    popupRef.classList.remove("hide");
};
//when count == 9 that is draw
btnRef.forEach((element) =>{
    //  for each button we adding an event 
    element.addEventListener("click", ()=> {
        if(xTurn === true){
            element.innerText = "X";
            xTurn = false;
            // after this click we need to change the turn from x to o and also the turn indicator
            turnX.classList.remove("glow");
            turnO.classList.add("glow");
            
        }
        else{
            element.innerText = "O";
            xTurn = true;
            turnO.classList.remove("glow");
            turnX.classList.add("glow");
        }
        // once the button has been used or the action has been performed it must nit be re-clicked -- making event insensitive
        element.disabled = true;
        count++;
        // form here we need to check 3 condition win,loss,draw
        if(count === 9){
            drawFunction();
            return;

        }
        winChecker();
    });
});          
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "It's a draw ! &#128546"
};
// handling event for the new game button
newGameBtn.addEventListener("click",() => {
    count = 0;
    xTurn = true;
    turnX.classList.add("glow");
    turnO.classList.remove("glow");
    //  bcoz for before starting you need enables all the buttons you have previously disabled 
    enableButtons();
});

const enableButtons = () => {
    // each button will be enabled
    btnRef.forEach((btn) => {
        btn.disabled = false;
        // after enabling earse content
        btn.innerText = "";
    });
    popupRef.classList.add("hide"); // so that now popup will be hidden after clicking the new game button and game page will be opened

};

// handling event for the restart game button
restartBtn.addEventListener("click" , () => {
    count = 0;
    xTurn = true;
    // after restarting indictor must show x chance first 
    turnX.classList.add("glow");
    turnO.classList.remove("glow");
    enableButtons();
    
});
// when window ewfreshed enables all the buttons ie run enableButtons
window.onload = enableButtons;

