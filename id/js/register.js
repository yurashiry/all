function register(){
let name=document.getElementById('regName').value;
let username=document.getElementById('regUsername').value;
let password=document.getElementById('regPassword').value;

let users=JSON.parse(localStorage.getItem('users')||"{}");

users[username]={
name,username,password,
blue: username==="yurskk",
plus: username==="yurskk"
};

localStorage.setItem('users',JSON.stringify(users));
alert('ok');
}
