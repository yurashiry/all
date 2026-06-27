function login(){
let u=document.getElementById('loginUsername').value;
let p=document.getElementById('loginPassword').value;

let users=JSON.parse(localStorage.getItem('users')||"{}");

if(users[u] && users[u].password===p){
localStorage.setItem('wr_current_user',JSON.stringify(users[u]));
window.location.href='home.html';
}else{
alert('wrong');
}
}
