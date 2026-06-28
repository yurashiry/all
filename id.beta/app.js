
const container = document.getElementById("users");
const search = document.getElementById("search");

function render(list){
container.innerHTML="";

list.forEach(u=>{
container.innerHTML+=`
<div class="card" onclick="openProfile(${u.id})">
<img src="${u.avatar}" class="avatar">
<div class="name">
${u.name}
${u.verified ? `<img src="icons/verified.png" class="badge">`:""}
${u.wrplus ? `<img src="icons/wrplus.png" class="badge">`:""}
</div>
<div class="bio">${u.bio}</div>
</div>
`;
});
}

function openProfile(id){
localStorage.setItem("selectedUser",id);
window.location.href="profile.html";
}

search.addEventListener("input",e=>{
const v=e.target.value.toLowerCase();
render(users.filter(u=>u.name.toLowerCase().includes(v)));
});

render(users);
