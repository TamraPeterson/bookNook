<template>
<div class="hide-overflow">

  <div class="slideshow-container">
    <!-- Full-width images with number and caption text -->
    <div class="mySlides fade">
      <div class="numbertext">1 / 3</div>
      <img src="src/assets/img/BookCloseup.jpg" style="width: 100%" class="landing-img"/>
      <div class="text">Caption Text</div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">2 / 3</div>
      <img src="src/assets/img/Ladder.jpg" style="width: 100%" class="landing-img"/>
      <div class="text">Caption Two</div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">3 / 3</div>
      <img src="src/assets/img/BookPathway.jpg" style="width: 100%" class="landing-img"/>
      <div class="text">Caption Three</div>
    </div>

    <div class="quote-text text-light rounded-2">
      <h1>"Fill your house with stacks of books, all the crannies and all the nooks"</h1>
      <p>Dr. Seuss</p>
    </div>

    <!-- Next and previous buttons -->
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
  </div>
  <br />

  <!-- The dots/circles -->
  <!-- <div style="text-align: center">
    <span class="dot" onclick="currentSlide(1)"></span>
    <span class="dot" onclick="currentSlide(2)"></span>
    <span class="dot" onclick="currentSlide(3)"></span>
  </div> -->
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';

export default {
  name: 'Home',
  setup() {
    let slideIndex = 0
    onMounted(async () => {
      showSlides()
    })
    function showSlides() {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) { slideIndex = 1 }
      slides[slideIndex - 1].style.display = "block";
      setTimeout(showSlides, 2000)
    }
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.hide-overflow{
  overflow: hidden;
  max-height: 87vh;
}

* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  // overflow: hidden;
  min-height: 87vh;
  max-width: 100vw;
  position: relative;
  // margin: auto;
}

/* Hide the images by default */
.mySlides {
  display: none;
  height: 87vh;
  img{
    height: 87vh;
  }
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  position: fixed;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.466);
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  bottom: 8px ;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

.quote-text {
    background-color: #111927;
    background-color: rgba(17, 25, 39, 0.4);
    color: #e9ecef;
    font-weight: bold;
    border: 3px solid #e9ecef;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 80%;
    padding: 2rem;
    text-align: center;
}

.landing-img {
  min-height: 10vh;
  max-height: 88vh;
  border-bottom: 0vh;
  // max-width: 100vw;
  background-size: cover;
  object-fit: cover;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
</style>
