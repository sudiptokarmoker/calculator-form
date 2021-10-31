let inputs, index;

inputs = document.getElementsByTagName("input");
for (index = 0; index < inputs.length; index++) {
  console.log(inputs[index].type);
  if (
    inputs[index].type === "text" ||
    inputs[index].type === "number" ||
    inputs[index].type === "radio" ||
    inputs[index].type === "hidden" ||
    inputs[index].type === "checkbox"
  ) {

  }
}
