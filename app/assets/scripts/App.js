const circlesArr = document.querySelectorAll("path");

console.log(circlesArr);

setTimeout(() => {
  circlesArr[1].classList.add("grow");
}, 1000);
