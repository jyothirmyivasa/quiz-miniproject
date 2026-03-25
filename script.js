
let quizData=[];
let current=0;
let score=0;
let selected=-1;
let userAnswers=[];
let timer;

function signup(){

let user=document.getElementById("newUser").value;
let pass=document.getElementById("newPass").value;

localStorage.setItem("user",user);
localStorage.setItem("pass",pass);

alert("Account Created");

window.location="login.html";
}

function login(){

let user=document.getElementById("user").value;
let pass=document.getElementById("pass").value;

let savedUser=localStorage.getItem("user");
let savedPass=localStorage.getItem("pass");

if(user===savedUser && pass===savedPass){

localStorage.setItem("activeUser",user);
window.location="category.html";

}else{

alert("Invalid Login");

}
}

function logout(){

localStorage.removeItem("activeUser");
window.location="home.html";

}

function startQuiz(category){

localStorage.setItem("category",category);
window.location="quiz.html";

}

const questions={

html:[
{q:"What does HTML stand for?",a:["Hyper Text Markup Language","High Tool Markup","Hyperlinks"],c:0},
{q:"Which tag creates link?",a:["&lt;a&gt;","&lt;img&gt;","&lt;p&gt;"],c:0},
{q:"Which tag shows image?",a:["&lt;img&gt;","&lt;src&gt;","&lt;image&gt;"],c:0},
{q:"HTML extension?",a:[".html",".css",".js"],c:0},
{q:"Which tag creates paragraph?",a:["&lt;p&gt;","&lt;h1&gt;","&lt;div&gt;"],c:0},
{q:"Which tag for heading?",a:["&lt;h1&gt;","&lt;span&gt;","&lt;label&gt;"],c:0},
{q:"Which tag creates list?",a:["&lt;ul&gt;","&lt;img&gt;","&lt;table&gt;"],c:0},
{q:"Which attribute for link?",a:["href","src","alt"],c:0},
{q:"Which tag creates table?",a:["&lt;table&gt;","&lt;div&gt;","&lt;span&gt;"],c:0},
{q:"HTML used for?",a:["Structure","Styling","Database"],c:0}
],

css:[
{q:"CSS stands for?",a:["Cascading Style Sheets","Creative Style","Computer Style"],c:0},
{q:"CSS used for?",a:["Styling","Database","Logic"],c:0},
{q:"Change text color?",a:["color","font","style"],c:0},
{q:"Class selector?",a:[".","#","*"],c:0},
{q:"ID selector?",a:["#",".","*"],c:0},
{q:"Background property?",a:["background","color","font"],c:0},
{q:"Font size property?",a:["font-size","text","size"],c:0},
{q:"Margin property?",a:["margin","space","padding"],c:0},
{q:"Padding property?",a:["padding","margin","gap"],c:0},
{q:"Display flex?",a:["flex","grid","block"],c:0}
],

js:[
{q:"JavaScript used for?",a:["Interactivity","Styling","Database"],c:0},
{q:"Print output?",a:["console.log()","print()","echo()"],c:0},
{q:"Variable keyword?",a:["let","define","varname"],c:0},
{q:"JS runs in?",a:["Browser","Database","Compiler"],c:0},
{q:"Array syntax?",a:["[]","{}","()"],c:0},
{q:"Function keyword?",a:["function","fun","define"],c:0},
{q:"Event click?",a:["onclick","onhover","onpress"],c:0},
{q:"String in JS?",a:["\"text\"","text","&lt;text&gt;"],c:0},
{q:"Boolean value?",a:["true","yes","1"],c:0},
{q:"Loop keyword?",a:["for","repeat","iterate"],c:0}
],

gk:[
{q:"Capital of India?",a:["Delhi","Mumbai","Chennai"],c:0},
{q:"Largest planet in the solar system?",a:["Earth","Jupiter","Saturn"],c:1},
{q:"Who wrote the Indian National Anthem?",a:["Rabindranath Tagore","Gandhi","Nehru"],c:0},
{q:"Fastest land animal?",a:["Tiger","Cheetah","Lion"],c:1},
{q:"Which ocean is the largest?",a:["Indian","Pacific","Atlantic"],c:1},
{q:"How many continents are there?",a:["5","6","7"],c:2},
{q:"Which country invented paper?",a:["India","China","Egypt"],c:1},
{q:"Which gas do plants absorb?",a:["Oxygen","Carbon Dioxide","Nitrogen"],c:1},
{q:"National animal of India?",a:["Lion","Elephant","Tiger"],c:2},
{q:"Which planet is called Red Planet?",a:["Mars","Jupiter","Venus"],c:0},
{q:"Largest ocean animal?",a:["Blue Whale","Shark","Dolphin"],c:0},
{q:"Which country has the largest population?",a:["USA","India","China"],c:1},
{q:"Which organ pumps blood?",a:["Brain","Heart","Lungs"],c:1},
{q:"How many days in a leap year?",a:["365","366","364"],c:1},
{q:"Which metal is liquid at room temperature?",a:["Mercury","Iron","Copper"],c:0}
],

c:[
{q:"Who developed C language?",a:["Dennis Ritchie","James Gosling","Bjarne Stroustrup"],c:0},
{q:"C language was developed at?",a:["Bell Labs","Microsoft","Google"],c:0},
{q:"Which symbol is used for comments?",a:["//","##","**"],c:0},
{q:"Which function starts C program?",a:["main()","start()","run()"],c:0},
{q:"Which symbol ends a statement?",a:[":",";","."],c:1},
{q:"Which data type stores integer?",a:["int","float","char"],c:0},
{q:"Which loop runs at least once?",a:["for","while","do while"],c:2},
{q:"Which operator is used for address?",a:["&","*","#"],c:0},
{q:"Which symbol is used for pointer?",a:["&","*","@"],c:1},
{q:"Which header file for printf?",a:["stdio.h","math.h","string.h"],c:0},
{q:"Which keyword declares constant?",a:["final","const","constant"],c:1},
{q:"Which loop is best when iterations known?",a:["for","while","do while"],c:0},
{q:"Array index starts from?",a:["1","0","-1"],c:1},
{q:"Which operator is used for multiplication?",a:["*","x","%"],c:0},
{q:"Which function reads input?",a:["scanf()","input()","get()"],c:0}
],

python:[
{q:"Who created Python?",a:["Guido van Rossum","James Gosling","Dennis Ritchie"],c:0},
{q:"Python released in?",a:["1991","1985","2000"],c:0},
{q:"Which symbol is used for comments?",a:["#","//","--"],c:0},
{q:"Which keyword defines function?",a:["def","function","fun"],c:0},
{q:"Which data type stores text?",a:["str","int","bool"],c:0},
{q:"Which symbol is used for list?",a:["[]","{}","()"],c:0},
{q:"Which loop repeats code?",a:["loop","repeat","for"],c:2},
{q:"Python is?",a:["Compiled","Interpreted","Both"],c:1},
{q:"Which function prints output?",a:["print()","echo()","write()"],c:0},
{q:"Which keyword creates class?",a:["class","object","define"],c:0},
{q:"Which operator is exponent?",a:["^","**","//"],c:1},
{q:"Which keyword stops loop?",a:["stop","break","exit"],c:1},
{q:"Which data structure stores key-value?",a:["List","Dictionary","Tuple"],c:1},
{q:"File extension of Python?",a:[".py",".pt",".p"],c:0},
{q:"Which function gets input?",a:["input()","scan()","get()"],c:0}
],

java:[
{q:"Who developed Java?",a:["James Gosling","Dennis Ritchie","Guido van Rossum"],c:0},
{q:"Java was developed at?",a:["Sun Microsystems","Google","Microsoft"],c:0},
{q:"Which keyword creates class?",a:["class","object","define"],c:0},
{q:"Which method starts Java program?",a:["main()","start()","run()"],c:0},
{q:"Java is?",a:["Platform dependent","Platform independent","None"],c:1},
{q:"Which keyword creates object?",a:["new","create","make"],c:0},
{q:"Which data type stores integer?",a:["int","float","string"],c:0},
{q:"Which loop checks condition first?",a:["for","while","do while"],c:1},
{q:"Java file extension?",a:[".java",".class",".jar"],c:0},
{q:"Which keyword inherits class?",a:["extends","inherits","super"],c:0},
{q:"Which keyword defines constant?",a:["const","final","static"],c:1},
{q:"Which symbol ends statement?",a:[":",";","."],c:1},
{q:"Which keyword stops loop?",a:["break","stop","exit"],c:0},
{q:"Which method prints output?",a:["System.out.println()","print()","echo()"],c:0},
{q:"Java supports?",a:["OOP","Procedural","Both"],c:2}
],

riddles:[

{q:"What has keys but can't open locks?",a:["Piano","Map","Keyboard"],c:2},
{q:"What has hands but can't clap?",a:["Robot","Clock","Tree"],c:1},
{q:"What has a face and two hands but no arms?",a:["Mirror","Robot","Clock"],c:2},
{q:"What goes up but never comes down?",a:["Balloon","Smoke","Age"],c:2},
{q:"What has one eye but cannot see?",a:["Camera","Cyclops","Needle"],c:2},
{q:"What gets wetter the more it dries?",a:["Water","Cloth","Towel"],c:2},
{q:"What has a neck but no head?",a:["Bottle","Snake","Shirt"],c:0},
{q:"What can travel around the world while staying in a corner?",a:["Map","Compass","Stamp"],c:2},
{q:"What has legs but doesn't walk?",a:["Chair","Bed","Table"],c:2},
{q:"What runs but never walks?",a:["Car","River","Dog"],c:1},
{q:"What has a thumb and four fingers but isn't alive?",a:["Hand","Robot","Glove"],c:2},
{q:"What comes down but never goes up?",a:["Rain","Wind","Snow"],c:0},
{q:"What has many teeth but cannot bite?",a:["Dog","Comb","Saw"],c:1},
{q:"What is full of holes but holds water?",a:["Bucket","Bottle","Sponge"],c:2},
{q:"What has an eye but cannot see?",a:["Storm","Needle","Camera"],c:1}

]

};

function initQuiz(){

document.getElementById("username").innerText =
"User: "+localStorage.getItem("activeUser");

let category=localStorage.getItem("category");

let allQuestions=[...questions[category]];

allQuestions.sort(()=>Math.random()-0.5);

quizData=allQuestions.slice(0,10);

showQuestion();

startTimer();

}

function showQuestion(){

selected=-1;

let q=quizData[current];

document.getElementById("qnumber").innerText =
"Question "+(current+1)+" / "+quizData.length;

document.getElementById("question").innerText=q.q;

let html="";

q.a.forEach((opt,i)=>{
html+=`<div class="option" onclick="selectOption(${i},this)">${opt}</div>`;
});

document.getElementById("options").innerHTML=html;

updateProgress();

}

function selectOption(i,el){

selected=i;

document.querySelectorAll(".option").forEach(o=>o.classList.remove("selected"));

el.classList.add("selected");

}

function nextQuestion(){

if(selected === -1){
userAnswers[current] = -1;
}
else{
userAnswers[current] = selected;
}

if(selected === quizData[current].c){
score++;
}

current++;

if(current < quizData.length){

showQuestion();

}
else{

clearInterval(timer);

localStorage.setItem("score", score + " / " + quizData.length);
localStorage.setItem("quizData", JSON.stringify(quizData));
localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

window.location="result.html";

}

}

function updateProgress(){

let percent=(current/quizData.length)*100;

document.getElementById("progressBar").style.width=percent+"%";

}

function startTimer(){

let time = 60;

timer = setInterval(()=>{

document.getElementById("timer").innerText="Time: "+time;

time--;

if(time < 0){

clearInterval(timer);

localStorage.setItem("score",score+" / "+quizData.length);
localStorage.setItem("quizData",JSON.stringify(quizData));
localStorage.setItem("userAnswers",JSON.stringify(userAnswers));

window.location="result.html";

}

},1000);

}
function selectCategory(cat){

localStorage.setItem("category",cat);

window.location="quiz.html";

}