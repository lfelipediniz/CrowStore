const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slidesPerPage = 4;
let currentPage = 0;

function showPage(page) {
    const startIndex = page * slidesPerPage;
    const endIndex = startIndex + slidesPerPage;
    slider.style.transform = `translateX(-${startIndex * (100 / slidesPerPage)}%)`;

    const totalSlides = slider.children.length;
    prevButton.classList.toggle('disabled', page === 0);
    nextButton.classList.toggle('disabled', endIndex >= totalSlides);

    currentPage = page;
}

function prevPage() {
    showPage(currentPage - 1);
}

function nextPage() {
    showPage(currentPage + 1);
}

prevButton.addEventListener('click', prevPage);
nextButton.addEventListener('click', nextPage);

setInterval(() => {
    if (currentPage === Math.floor(slider.children.length / slidesPerPage)) {
        showPage(0);
    } else {
        nextPage();
    }
}, 10000);


filterSelection("all")
function filterSelection(c) {
    let x, i;
    x = document.getElementsByClassName("column");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
    }
}

function addClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

function removeClass(element, name) {
    let i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
let btnContainer = document.getElementById("btnContainer");
let btns = btnContainer.getElementsByClassName("gender-btn");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}
