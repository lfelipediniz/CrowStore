function createSlider(sliderSelector, slidesSelector, prevBtnSelector, nextBtnSelector) {
  const slider = document.querySelector(sliderSelector);
  const slides = document.querySelector(slidesSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  let scrollPos = 0;
  let direction = 1; // 1 = forward, -1 = backward

  const slideImgs = slides.querySelectorAll('img');

  function setOpacity() {
    const sliderRect = slides.getBoundingClientRect();
    const sliderRight = sliderRect.left + sliderRect.width;

    slideImgs.forEach(img => {
      const imgRect = img.getBoundingClientRect();
      const imgRight = imgRect.left + imgRect.width;

      if (imgRight > sliderRight) {
        img.classList.add('last-visible');
      } else {
        img.classList.remove('last-visible');
      }
    });
  }

  setOpacity();
  slides.addEventListener('scroll', setOpacity);

  const maxScrollPos = slides.scrollWidth - slider.offsetWidth;

  function moveSlides() {
    scrollPos += direction * 300;

    if (scrollPos > maxScrollPos || scrollPos < 0) {
      direction = -direction;
    }

    slides.scrollTo({
      left: scrollPos,
      behavior: 'smooth'
    });
  }

  prevBtn.addEventListener('click', () => {
    scrollPos -= 300;
    slides.scrollTo({
      left: scrollPos,
      behavior: 'smooth'
    });
    direction = -1;
  });

  nextBtn.addEventListener('click', () => {
    scrollPos += 300;
    slides.scrollTo({
      left: scrollPos,
      behavior: 'smooth'
    });
    direction = 1;
  });

  setInterval(moveSlides, 7000);
}

window.addEventListener('load', () => {
  createSlider('.slider-releases', '.slides-releases', '.prev-releases', '.next-releases');
  createSlider('.slider-best-sellers', '.slides-best-sellers', '.prev-best-sellers', '.next-best-sellers');
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
