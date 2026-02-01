const userInput = document.getElementById('username');
const searchBtn = document.getElementById('searchbtn');
const result = document.getElementById('result');
const error = document.getElementById('error');

searchBtn.addEventListener('click', function() {
    const username = userInput.value;
    if(username === "") {
        alert("กรอกข้อมูล");
        return;
    }

    getUser(username);
});

async function getUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if(!response.ok){
            throw new Error("ไม่พบผู้ใช้");
        }
        const data = await response.json();
        showProfile(data);
    } catch (error) {
        result.innerHTML = `<p style="color:red">${error.message}</p>`;
    }
}
function showProfile(user) {
    result.innerHTML = `
    <img src="${user.avatar_url}" width = "120"></img>
    <h3>${user.name || "ไม่มีชื่อ"}</h3>
    <p>${user.bio || "ไม่มี bio"}</p>
    <p>Repos: ${user.public_repos}</p>
    <p>Followers: ${user.followers}</p>
    `;
}
