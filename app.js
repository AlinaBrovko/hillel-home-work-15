Array.from(document.querySelectorAll(".add-btn")).map(function (item) {
  item.addEventListener("click", function () {
    document
      .querySelector("." + this.getAttribute("data-form"))
      .classList.toggle("hidden");
  });
});
