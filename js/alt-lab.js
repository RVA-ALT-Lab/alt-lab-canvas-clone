//ALT LAB STUFF

// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("wrapper-navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop+60;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

//hide and show menu
let navHider = document.getElementById('menu-hider');
navHider.addEventListener('click', menuClassChanger);

function menuClassChanger (){
	let menu = document.getElementById('left-sidebar');
	menu.classList.toggle("hidden")
}

//full size video
var videos = document.querySelectorAll('iframe[src^="https://www.youtube.com/"], iframe[src^="https://player.vimeo.com"], iframe[src^="https://www.youtube-nocookie.com/"], iframe[src^="https://www.nytimes.com/"]'); //get video iframes for regular youtube, privacy+ youtube, and vimeo

videos.forEach(function(video) {
      let wrapper = document.createElement('div'); //create wrapper 
      wrapper.classList.add("video-responsive"); //give wrapper the class      
      video.parentNode.insertBefore(wrapper, video); //insert wrapper      
      wrapper.appendChild(video); // move video into wrapper
});


const currentPage = document.querySelectorAll('h1')[0].innerHTML;
const navList = document.querySelectorAll('#default-menu li');

buildNav(navList, currentPage)

function buildNav(navList, currentPage){
  navList.forEach((list, index) => {
    if (list.childNodes[0].innerHTML == currentPage){     
      if (index-1 > 0){
       let prevLink = navList[(index-1)].childNodes[0].href;  
        console.log(prevLink)
         setNavUrl('prev-btn',prevLink)
      } else {
        hideEmptyNav('prev-btn')
      }
       if (index+1 < navList.length){
        let nextLink = navList[(index+1)].childNodes[0].href;
         console.log(nextLink)
          setNavUrl('next-btn',nextLink)
       } else {
          hideEmptyNav('next-btn')
       }
    }
  })
}


function setNavUrl(id,url){
 const nav = document.getElementById(id);
 nav.href = url; 
}

function hideEmptyNav(id){
  const nav = document.getElementById(id);
  nav.classList.add('hidden')
}