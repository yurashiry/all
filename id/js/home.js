
let user=JSON.parse(localStorage.getItem('wr_current_user'));
if(!user) location.href='index.html';

document.getElementById('name').innerText=user.name;
document.getElementById('username').innerText='@'+user.username;
document.getElementById('avatar').innerText=user.name[0];

if(user.blue) document.getElementById('blue').style.display='inline';
if(user.plus) document.getElementById('plus').style.display='inline';

function logout(){
localStorage.removeItem('wr_current_user');
location.href='index.html';
}

// QR
function openQR(){
document.getElementById('qrModal').style.display='flex';
QRCode.toCanvas(document.getElementById('qrCanvas'),user.username);
}
function closeQR(){
document.getElementById('qrModal').style.display='none';
}

// CARDS
let cards=JSON.parse(localStorage.getItem('cards_'+user.username)||'[]');

function openCard(){
document.getElementById('cardModal').style.display='flex';
renderCards();
}
function closeCard(){
document.getElementById('cardModal').style.display='none';
}

function saveCard(){
let num=document.getElementById('cardNumber').value;
let type=document.getElementById('cardType').value;

cards.push({num:type+" **** "+num.slice(-4)});
localStorage.setItem('cards_'+user.username,JSON.stringify(cards));
renderCards();
}

function renderCards(){
document.getElementById('cards').innerHTML=
cards.map(c=>"<div>"+c.num+"</div>").join("");
}
