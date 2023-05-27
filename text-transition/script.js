const text = ["Hello", "I'am", "Huynh"];

const h1 = document.querySelector("h1");
const rate = 1000;
let index = 0;

const displayText = () => {
  setTimeout(function show() {
    document.startViewTransition(() => {
      h1.innerHTML = text[index];
      index++;
      if (index >= text.length) {
        index = 0;
        setTimeout(show, rate + 500);
      } else {
        setTimeout(show, rate);
      }
    });
  }, rate);
};

if (document.startViewTransition) {
  displayText();
} else {
  document.querySelector(".no-support").style.display = "block";
}
