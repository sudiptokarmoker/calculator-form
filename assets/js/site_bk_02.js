function calculate_result(){
  let data = [], variableIndex, formulaString = '', result = 0;
  $.each($(".bdt-ep-field-wrap input[type=text], .bdt-ep-field-wrap input[type=hidden], .bdt-ep-field-wrap input[type=checkbox], .bdt-ep-field-wrap input[type=radio], .bdt-ep-field-wrap input[type=number]"),
    function (index, item) {
      variableIndex = parseInt(index) + 1;
      if ($(item).prop("type") === "checkbox" || $(item).prop("type") === "radio") {
        let itemValue = parseInt($(item).val());
        if ($(item).is(":checked") === true && itemValue >= 0) {
          data.push({
            type: $(item).prop("type"),
            index: index,
            value: itemValue,
            variable: "f" + variableIndex
          });
          formulaString += "f" + variableIndex + ', ';
          variableIndex++;
        }
      } else if ($(item).prop("type") === "number") {
        let radioButtonValue = parseInt($(item).val());
        if (radioButtonValue >= 0) {
          data.push({
            type: $(item).prop("type"),
            index: index,
            value: radioButtonValue,
            variable: "f" + variableIndex
          });
          formulaString += "f" + variableIndex + ', ';
          variableIndex++;
        }
      } else if(parseInt($(item).val()) >= 0){
        data.push({
          type: $(item).prop("type"),
          index: index,
          value: parseInt($(item).val()),
          variable: "f" + index + 1
        });
        formulaString += "f" + variableIndex + ', ';
        variableIndex++;
      }
    }
  );
  /**
   * its means that sum event have to trigger here
   */
  if(data.length > 0){
    for(let i = 0; i < data.length; i++)
    {
        result += data[i].value;
    }
    console.log(result);
    $(".bdt-result-count p span").text(result);
    $(".uk-textarea").text("SUM(" + formulaString.replace(/,\s*$/, "") + ")"); // removing comma at end
  }
}
/**
* trigger on ready default
*/
$(function(){
  calculate_result();
});