const goalCheckboxes = [
  document.querySelector(".checkbox-1"),
  document.querySelector(".checkbox-2"),
  document.querySelector(".checkbox-3"),
];

const goalInputBoxes = [
  document.querySelector(".goal-input-1"),
  document.querySelector(".goal-input-2"),
  document.querySelector(".goal-input-3"),
];

let textInputContents = [
  document.querySelector(".goal-input-1").value,
  document.querySelector(".goal-input-2").value,
  document.querySelector(".goal-input-3").value,
];
for (let i = 0; i < 3; i++) {
  goalCheckboxes[i].addEventListener("click", function () {
    let allTextInputBoxesEmpty = textInputContents.some(
      (content) => content.trim() === ""
    );
    // console.log(allTextInputBoxesEmpty);

    if (allTextInputBoxesEmpty) {
      goalCheckboxes[i].checked = false;

      document.querySelector(".error-div").textContent =
        "Please set all three goals first !";
    } else {
      document.querySelector(".error-div").textContent = "";
      if (goalCheckboxes[i].checked === true) {
        goalInputBoxes[i].style.textDecoration = "line-through";
      } else {
        goalInputBoxes[i].style.textDecoration = "none";
      }
      const checkedBoxes = goalCheckboxes.filter((box) => box.checked === true);

      document.querySelector(
        ".progress-bar .level-completed"
      ).innerText = `${checkedBoxes.length}`;
      if (checkedBoxes.length > 0) {
        dynamicProgress = document.querySelector(".progress-level");
        dynamicProgress.classList.add("dynamicProgressLevel");
        dynamicProgress.style.color = "white";
        dynamicProgress.style.width = `${100 / (3 / checkedBoxes.length)}%`;
      } else {
        dynamicProgress.classList.remove("dynamicProgressLevel");
        dynamicProgress.style.color = "gainsboro";
      }
    }
  });

  for (let j = 0; j < 3; j++) {
    goalInputBoxes[j].addEventListener("input", (e) => {
      textInputContents[j] = e.target.value;
      goalInputBoxes[j].addEventListener("blur", () => {
        if (e.target.value.length >= 1) {
          e.target.classList.add("inputTextOnBlur");
        }
      });
      document.querySelector(".error-div").textContent = "";
      e.target.classList.remove("inputTextOnBlur");
      goalInputBoxes[j].style.textDecoration = "none";
      goalCheckboxes[j].checked = false;
      const filledBoxes = textInputContents.filter((item) => item != "");
      document.querySelector(
        ".progress-bar .total-level"
      ).innerText = `${filledBoxes.length}`;
    });
  }
}
