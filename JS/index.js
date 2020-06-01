'use strict';
const wordEl = document.getElementById("word");
const wronglettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById("final-message-reveal-word");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application","programming","interface","wizard","material","frontend","backend","fullstack"];

let selectedWord = words[Math.floor(Math.random()*words.length)];

const correctLetters = [];
const wrongLetters = [];
let playable = true;

//Show Hidden <using> template Sting

function displayword(){
	wordEl.innerHTML=`${selectedWord.split('').map(letter=>{
		return `<span class="letter">
		${correctLetters.includes(letter)?letter:''}
		</span>`
	}).join('')}`;

	const innerword = wordEl.innerText.replace(/[\n]/g,'');
	//console.log(innerword);
	if(innerword === selectedWord){
		finalMessage.innerText = "Congratulations ! You won !";
		popup.style.display="flex";
		playable = false;
	}
}


function showNotification(){
	notification.classList.add("show");
	setTimeout(function(){
		notification.classList.remove("show");
	},2000);
}


function updateWrongLettersEL(){
	//Display wrong letters
	wronglettersEl.innerHTML =`
	${wrongLetters.length>0?`
		<p>Wrong Letters </p>`:''}
	${wrongLetters.map(letter=>`<span>${letter}</span>`)}
	`
figureParts.forEach((part,index)=>{
	const errors = wrongLetters.length;
	if(index<errors){
		part.style.display="block";
	}
	else{
		part.style.display="none";
	}

	if(wrongLetters.length === figureParts.length){
		playable=false;
		finalMessage.innerText="Game Over !! You Lost !!";
		popup.style.display="flex";
	}

});

}




//Add Event Listener for key pressed
window.addEventListener('keydown',e=>{
	
	if(playable){
	
		if(e.keyCode>=65 && e.keyCode<=90){
			const letter = e.key.toLowerCase();
			//console.log(letter);
			if(selectedWord.includes(letter)){
				if(!correctLetters.includes(letter)){
					correctLetters.push(letter);
					displayword();
				}
				//if letter already pressed
				else{
					showNotification();
				}
			}
			else{
				//letter not in string and pushed to already pushed
				if(!wrongLetters.includes(letter)){
					wrongLetters.push(letter);
					updateWrongLettersEL();
				}
				else{
					//not in string and already pressed.
					showNotification();
				}
			}
		}
	}
})

playAgainBtn.addEventListener('click',function(){
	playable=true;
	correctLetters.splice(0);
	wrongLetters.splice(0);
	selectedWord = words[Math.floor(Math.random()*words.length)];
	displayword();
	updateWrongLettersEL();
	popup.style.display="none";
})

displayword();