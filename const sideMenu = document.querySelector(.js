const sideMenu = document.querySelector("aside");
const menubutton = document.querySelector("#menu-btn");
const closebutton = document.querySelector("#close-btn")
const themetoggler = document.querySelector(".theme-toggler");




menubutton.addEventListener('click',()=>{
    sideMenu.style.display = "block";
})

closebutton.addEventListener('click',()=>{
    sideMenu.style.display = "none";
})


themetoggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-var');
    themetoggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themetoggler.querySelector('span:nth-child(2)').classList.toggle('active');
})