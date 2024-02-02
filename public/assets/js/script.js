

function openSidebar() {
    document.getElementById("main").style.marginLeft = "300px";
    document.getElementById("mySidebar").classList.add("show");
}
function closeSidebar() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("mySidebar").classList.remove("show");
    document.getElementById("openNav").style.display = "0%";
}

// modal hasil
const modalHasil = document.querySelector(".modal")

function showModal() {
    modalHasil.style.display = "flex"
}





