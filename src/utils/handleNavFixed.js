function handleFixed() {
  let nav = document.querySelector("#navigate");
  let follow = document.querySelector("#follow");

  window.addEventListener("scroll", function () {
    if (nav) {
      let left = nav.getBoundingClientRect().left;
      let top = nav.getBoundingClientRect().top;
      nav.style.position = "fixed";
      nav.style.top = top + "px";
      nav.style.left = left + "px";
    }
    if (follow) {
      let left = follow.getBoundingClientRect().left;
      let top = follow.getBoundingClientRect().top;
      follow.style.position = "fixed";
      follow.style.top = top + "px";
      follow.style.left = left + "px";
    }
  });
}
function addNavFixed() {
  window.addEventListener("load", handleFixed);
}
function removeNavFixed() {
  window.removeEventListener("scroll", handleFixed);
}
export { addNavFixed, removeNavFixed };
