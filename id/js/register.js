
function register(){
let name=document.getElementById('name').value;
let username=document.getElementById('username').value.replace('@','');
let password=document.getElementById('password').value;

let users=JSON.parse(localStorage.getItem('users')||'{}');

if(users[username]) return alert('exists');

users[username]={
name,username,password,
blue: username==="yurskk",
plus: username==="yurskk"
}
  blue: username==="sonne",
plus: username==="sonne"
};

localStorage.setItem('users',JSON.stringify(users));
alert('done');
location.href='index.html';
}
