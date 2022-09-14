"use strict";
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (() => window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {window.setTimeout(callback, 1000 / 60);})();


/* // [START pointereventsupport] */
let pointerDownName = window.navigator.msPointerEnabled ? "MSPointerDown" : "pointerdown";
let pointerUpName = window.navigator.msPointerEnabled ? "MSPointerUp" : "pointerup";
let pointerMoveName = window.navigator.msPointerEnabled ? "MSPointerMove" : "pointermove";
window.PointerEventsSupport = (window.PointerEvent || window.navigator.msPointerEnabled) ? true : false; // Simple way to check if some form of pointerevents is enabled or not (Not being referenced????)
/* // [END pointereventsupport] */



function SwipeRevealItem(element) {
  // Gloabl state variables
  let STATE_DEFAULT = 1;
  let STATE_LEFT_SIDE = 2;
  let STATE_RIGHT_SIDE = 3;

  let swipeFrontElement = element.querySelector(".swipe-front");
  let rafPending = false;
  let initialTouchPos = null;
  let lastTouchPos = null;
  let currentXPosition = 0;
  let currentState = STATE_DEFAULT;
  let handleSize = 10;

  // Perform client width here as this can be expensive and doens't change until window.onresize
  let itemWidth = swipeFrontElement.clientWidth;
  let slopValue = itemWidth * (1 / 4);

  // On resize, update client width and slop value
  this.resize = () => {
    itemWidth = swipeFrontElement.clientWidth;
    slopValue = itemWidth * (1 / 4);
  };

  /* // [START handle-start-gesture] */
  // Handle the start of gestures
  this.handleGestureStart = evt => {
    
    evt.preventDefault();
    if (evt.touches && evt.touches.length > 1) {return;}

    // Add the move and end listeners
    if (window.PointerEvent) {
      evt.target.setPointerCapture(evt.pointerId);
    } else {
      // Add Mouse Listeners
      document.addEventListener("mousemove", this.handleGestureMove, true);
      document.addEventListener("mouseup", this.handleGestureEnd, true);
    }

    initialTouchPos = getGesturePointFromEvent(evt);
    swipeFrontElement.style.transition = "initial";
  }
  /* // [END handle-start-gesture] */

  
  
  // Handle move gestures
  //
  /* // [START handle-move] */
  this.handleGestureMove = evt => {
    
    evt.preventDefault();
    if (!initialTouchPos) {return;}

    lastTouchPos = getGesturePointFromEvent(evt);

    if (rafPending) {return;}

    rafPending = true;

    window.requestAnimFrame(onAnimFrame);
    
  }
  /* // [END handle-move] */

  
  
  /* // [START handle-end-gesture] */
  // Handle end gestures
  this.handleGestureEnd = evt => {
    
    evt.preventDefault();
    if (evt.touches && evt.touches.length > 0) {return;}
    rafPending = false;

    // Remove Event Listeners
    if (window.PointerEvent) {
      evt.target.releasePointerCapture(evt.pointerId);
    } else {
      // Remove Mouse Listeners
      document.removeEventListener("mousemove", this.handleGestureMove, true);
      document.removeEventListener("mouseup", this.handleGestureEnd, true);
    }

    updateSwipeRestPosition();

    initialTouchPos = null;
    
  }
  /* // [END handle-end-gesture] */

  
  function updateSwipeRestPosition() {
    let differenceInX = initialTouchPos.x - lastTouchPos.x;
        currentXPosition = currentXPosition - differenceInX;

    // Go to the default state and change
    let newState = STATE_DEFAULT;

    // Check if we need to change state to left or right based on slop value
    if (Math.abs(differenceInX) > slopValue) {
      if (currentState === STATE_DEFAULT) {
        if (differenceInX > 0) {
          newState = STATE_LEFT_SIDE;
        } else {
          newState = STATE_RIGHT_SIDE;
        }
      } else {
        if (currentState === STATE_LEFT_SIDE && differenceInX > 0) {
          newState = STATE_DEFAULT;
        } else if (currentState === STATE_RIGHT_SIDE && differenceInX < 0) {
          newState = STATE_DEFAULT;
        }
      }
    } else {
      newState = currentState;
    }

    changeState(newState);

    swipeFrontElement.style.transition = "all 150ms ease-out";
  }
  

  function changeState(newState) {
    let transformStyle;
    switch (newState) {
      case STATE_DEFAULT:
        currentXPosition = 0;
        break;
      case STATE_LEFT_SIDE:
        currentXPosition = -(itemWidth - handleSize);
        break;
      case STATE_RIGHT_SIDE:
        currentXPosition = itemWidth - handleSize;
        break;
    }

    transformStyle = "translateX(" + currentXPosition + "px)";

    swipeFrontElement.style.msTransform = transformStyle;
    swipeFrontElement.style.MozTransform = transformStyle;
    swipeFrontElement.style.webkitTransform = transformStyle;
    swipeFrontElement.style.transform = transformStyle;

    currentState = newState;
  }
  

  function getGesturePointFromEvent(evt) {
    let point = {};

    if (evt.targetTouches) {
      point.x = evt.targetTouches[0].clientX;
      point.y = evt.targetTouches[0].clientY;
    } else {
      // Either Mouse event or Pointer Event
      point.x = evt.clientX;
      point.y = evt.clientY;
    }

    return point;
  }
  

  /* // [START on-anim-frame] */
  function onAnimFrame() {
    if (!rafPending) {return;}

    let differenceInX = initialTouchPos.x - lastTouchPos.x;

    let newXTransform = currentXPosition - differenceInX + "px";
    let transformStyle = "translateX(" + newXTransform + ")";
    swipeFrontElement.style.webkitTransform = transformStyle;
    swipeFrontElement.style.MozTransform = transformStyle;
    swipeFrontElement.style.msTransform = transformStyle;
    swipeFrontElement.style.transform = transformStyle;

    rafPending = false;
  }
  /* // [END on-anim-frame] */

  
  /* // [START addlisteners] */
  // Check if pointer events are supported.
  if (window.PointerEvent) {
    // Add Pointer Event Listener
    swipeFrontElement.addEventListener("pointerdown", this.handleGestureStart, true);
    swipeFrontElement.addEventListener("pointermove", this.handleGestureMove, true);
    swipeFrontElement.addEventListener("pointerup", this.handleGestureEnd, true);
    swipeFrontElement.addEventListener("pointercancel", this.handleGestureEnd, true);
  } else {
    // Add Touch Listener
    swipeFrontElement.addEventListener("touchstart", this.handleGestureStart, true);
    swipeFrontElement.addEventListener("touchmove", this.handleGestureMove, true);
    swipeFrontElement.addEventListener("touchend", this.handleGestureEnd, true);
    swipeFrontElement.addEventListener("touchcancel", this.handleGestureEnd, true);

    // Add Mouse Listener
    swipeFrontElement.addEventListener("mousedown", this.handleGestureStart, true);
  }
  /* // [END addlisteners] */
  
}


let swipeRevealItems = [];

window.onload = () => {
  let swipeRevealItemElements = document.querySelectorAll(".swipe-element");
  
  for (let i = 0; i < swipeRevealItemElements.length; i++) {swipeRevealItems.push(new SwipeRevealItem(swipeRevealItemElements[i]));}
  
  // We do this so :active pseudo classes are applied.
  if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
    document.body.addEventListener("touchstart", () => {}, false);
  }
};

window.onresize = () => swipeRevealItems.forEach(revealItem => revealItem.resize());
