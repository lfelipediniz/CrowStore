const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let slideIndex = 0;
const slideWidth = slides.children[0].offsetWidth;

prevBtn.addEventListener('click', () => {
  if (slideIndex === 0) {
    slideIndex = slides.children.length - 1;
  } else {
    slideIndex--;
  }
  slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
});

nextBtn.addEventListener('click', () => {
  if (slideIndex === slides.children.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
});

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
