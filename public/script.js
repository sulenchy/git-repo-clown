
const apiUrl = 'http://localhost:3000/ggql/repositories';

let loadingState = true;

// making request for the repositories
if (!localStorage.getItem('data')) {
    fetch(apiUrl)
    .then(response => response.json())
    .then((data) => {
        localStorage.setItem('data', JSON.stringify(data));
        loadingState = false;
    }).catch(err => err.message);
}
else {
    loadingState = false;
}

const svgStar = '<svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" style="padding-right: 5px;border-color:grey;"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>';

const repoInfo = localStorage.getItem('data');

const avatar = document.getElementById("avatar");
avatar.setAttribute("src", JSON.parse(repoInfo).viewer.avatarUrl);

const elem_full_name = document.getElementById("fullname");
elem_full_name.textContent = JSON.parse(repoInfo).viewer.name;

const elem_nickname = document.getElementById('nickname');
elem_nickname.textContent =JSON.parse(repoInfo).viewer.login;

const user_profile_bio = document.getElementById("user-profile-bio");
user_profile_bio.textContent = JSON.parse(repoInfo).viewer.bio;

// handling the sticky navbar
window.onscroll = function() { toggleSticky() };

var tab = document.getElementById("tab");
var sticky = tab.offsetTop;

function toggleSticky() {
  if (window.pageYOffset >= sticky) {
    tab.classList.add("sticky")
  } else {
    tab.classList.remove("sticky");
  }
}
// add repo list
const repoList = document.getElementById('repo-list');
const repositories = JSON.parse(repoInfo).viewer.repositories.edges;
for (var i =0; i < repositories.length; i++) {
    var repoListItem = document.createElement("li");
    repoListItem.classList.add('repo-list-item');
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    
    div1.classList.add('width-80');
    div2.classList.add('width-20');
    var repoNameLink = document.createElement("a");
    repoNameLink.classList.add("repoDesc");
    var repoDescWrap = document.createElement('p');
    var repoLangWrap = document.createElement('div');
    var repoForkNumber = document.createElement('a');
    var langColorWrap = document.createElement('span');
    var repoUpdateInfoWrap = document.createElement('span');
    var repoLangNameWrap = document.createElement('span');
    var repoStarInfoWrap = document.createElement('button');
    
    
    repoStarInfoWrap.classList.add('btn');
    repoLangNameWrap.classList.add('mg-r-16')
    
    
    
    var repoName = document.createTextNode(repositories[i].node.name);
    repoNameLink.appendChild(repoName);
    repoNameLink.title = repositories[i].node.name;
    repoNameLink.href = `https://github.com/sulenchy/${ repositories[i].node.name }`;
    
    var repoDesc = document.createTextNode(repositories[i].node.description);
    repoDescWrap.appendChild(repoDesc)
    var repoLangName = repositories[i].node.languages.nodes[0] && document.createTextNode(repositories[i].node.languages.nodes[0].name);
    var repoLangColor = repositories[i].node.languages.nodes[0] && repositories[i].node.languages.nodes[0].color;
    langColorWrap.classList.add('repo-language-color');
    if (repoLangColor) langColorWrap.style.backgroundColor= repoLangColor;
    
    const updateAt = new Date(repositories[i].node.pushedAt).toDateString();
    const repoUpdateInfo = `Updated on ${ updateAt }`;
    repoUpdateInfoWrap.innerText = repoUpdateInfo;
    
    const repoStarInfo = 'Star';
    repoStarInfoWrap.innerHTML = `${ svgStar } ${ repoStarInfo }`;
    
    repoLangName && repoLangNameWrap.appendChild(repoLangName);
    
    div1.appendChild(repoNameLink);
    div1.appendChild(repoDescWrap);
    langColorWrap && div1.appendChild(langColorWrap);
    repoLangName && div1.appendChild(repoLangNameWrap);
    div1.appendChild(repoUpdateInfoWrap);
    div2.appendChild(repoStarInfoWrap)
    repoListItem.appendChild(div1);
    repoListItem.appendChild(div2);
    
    repoList.appendChild(repoListItem);
}
console.log('data ===> ', JSON.parse(repoInfo).viewer);

  
