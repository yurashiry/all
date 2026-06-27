let user=JSON.parse(localStorage.getItem('wr_current_user'));

if(!user) location.href='index.html';

document.getElementById('name').innerText=user.name;
document.getElementById('username').innerText='@'+user.username;

if(user.blue) document.getElementById('blue').style.display='inline';
if(user.plus) document.getElementById('plus').style.display='inline';

function logout(){
localStorage.removeItem('wr_current_user');
location.href='index.html';
}

function openQR(){
document.getElementById('qr').innerHTML="";
QRCode.toCanvas(document.createElement('canvas'),user.username,function(err,canvas){
document.getElementById('qr').appendChild(canvas);
});
}
