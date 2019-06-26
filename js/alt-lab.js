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



document.addEventListener("DOMContentLoaded", function(){
  const currentPage = document.querySelectorAll('h1')[0].innerHTML;
  const currentURL = window.location.href;
  newBreadCrumbBuilder(document.querySelectorAll('#left-sidebar li .current-menu-item')[0],'', true);
  makeExpandingMenu(document.querySelectorAll('#left-sidebar li'), document.querySelectorAll('#left-sidebar ul')[0]), currentPage;
  if (document.getElementById('default-menu')){//if default menu
    var navList = document.querySelectorAll('#default-menu li');
    buildNav(navList, currentURL)
} else {
    var navList = document.querySelectorAll('#left-sidebar li');
    buildNav(navList, currentURL)
}
    
});

function buildNav(navList, currentURL){
  navList.forEach((list, index) => {
    if (list.childNodes[0].href == currentURL){
      console.log(currentURL)
      if (index-1 > -1){
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


//BREAD CRUMB BAKER
function newBreadCrumbBuilder(currentItem, html, first){
  if (currentItem != null){
    if (first === true ){
      console.log(currentItem)
    html = '<span class="crumb-finalchild">' + currentItem.firstChild.innerHTML + '</span>' + html;
    }
    let grandParentItem = currentItem.parentNode.parentNode;
    let grandParentTag = grandParentItem.tagName;
    let parentItem = currentItem.parentNode;
     if (grandParentTag != 'LI'){      
        let target = document.getElementById('nav-title');
        target.insertAdjacentHTML('afterend', html);
      } 
    if (grandParentTag === 'LI') {
      //console.log(grandParentItem.firstChild)
      html = '<a href="' +grandParentItem.firstChild + '" class="crumb">' + grandParentItem.firstChild.innerText + '</a> <span class="fa fa-chevron-right" aria-hidden="true"></span>' +  html;
      newBreadCrumbBuilder(grandParentItem, html, false);
       }
     }
  }



  //EXPANDING CHILD MAKER
  function makeExpandingMenu(lis, topMenu, currentPage){
    lis.forEach((li, index) => {
      if (li.childNodes.length > 1 && li.parentNode.parentNode.parentNode.tagName != 'UL' ) {
          var button = document.createElement("button"); // Create a <li> node
          var textnode = document.createTextNode("+"); // Create a text node
          button.appendChild(textnode);
          button.classList.add("expand"); // Append the text to <li>
          button.setAttribute("aria-pressed", "false");
          button.setAttribute("id", "button-expand-" + index);
          li.childNodes[0].insertAdjacentElement("afterend", button);
        } else {
          if (li.parentNode != topMenu && li.parentNode.parentNode.parentNode.id === topMenu.id && !li.classList.contains('current-menu-ancestor') && !li.classList.contains('current-menu-item')){
            console.log(li);
            console.log(li.parentNode.parentNode.parentNode.id);
            var siblings = li.parentNode.childNodes;
            var currentMenuSibling = false;
            // console.log(siblings);
            siblings = Array.from(siblings)
            siblings = siblings.filter(node => node.nodeType === 1)
            siblings.forEach(sibling => {
              if(sibling.classList.contains('current-menu-item')){
                currentMenuSibling = true
              }
            })
            if (!currentMenuSibling && !li.parentNode.parentNode.classList.contains("current-menu-item")){
              console.log(li.parentNode)
              li.parentNode.classList.add('hidden')
            }
          }
        }
    });

    let buttons = document.querySelectorAll("button");

    buttons.forEach(function(button) {
      //button.addEventListener("click", buttonClick(e));
      button.onclick = function(e) {
        buttonClick(this.id, this.parentElement);
      };
    });

    function buttonClick(id, parent) {
      parent.childNodes[3].classList.toggle("hidden");
    }

}

