
const id = localStorage.getItem("selectedUser");
const user = users.find(u=>u.id==id);

document.getElementById("profile").innerHTML=`
<div class="box">
<img src="${user.avatar}" class="avatar">
<h1>
${user.name}
${user.verified ? `<img src="icons/verified.png" class="badge">`:""}
${user.wrplus ? `<img src="icons/wrplus.png" class="badge">`:""}
</h1>
<p>${user.bio}</p>
</div>
`;
