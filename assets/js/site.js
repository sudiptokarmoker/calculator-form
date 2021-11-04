function calculate_result(){
    let data = [], variableIndex, formulaString = '', result = 0;
    $.each($(".bdt-ep-field-wrap input[type=text], .bdt-ep-field-wrap input[type=hidden], .bdt-ep-field-wrap input[type=checkbox], .bdt-ep-field-wrap input[type=radio], .bdt-ep-field-wrap input[type=number]"),
      function (index, item) {
        variableIndex = parseInt(index) + 1;
        let itemValue = parseInt($(item).val());
        if ($(item).prop("type") === "checkbox" || $(item).prop("type") === "radio") { // first check if this item is checkbox or radio
          if ($(item).is(":checked") === true) {
            data.push({
              type: $(item).prop("type"),
              index: index,
              value: $(item).val(),
              variable: "f" + variableIndex,
              real_value: getValueIfInteger($(item).val())
            });
            formulaString += Number.isInteger(itemValue) && itemValue < 0 ? "-f" + variableIndex + ', ' : "f" + variableIndex + ', ';
            variableIndex++;
          }
        } else if ($(item).prop("type") === "number") {
            data.push({
              type: $(item).prop("type"),
              index: index,
              value: $(item).val(),
              variable: "f" + variableIndex,
              real_value: getValueIfInteger($(item).val())
            });
            formulaString += Number.isInteger(itemValue) && itemValue < 0 ? "-f" + variableIndex + ', ' : "f" + variableIndex + ', ';
            variableIndex++;
        } else {
          data.push({
            type: $(item).prop("type"),
            index: index,
            value: $(item).val(),
            variable: "f" + variableIndex,
            real_value: getValueIfInteger($(item).val())
          });
          formulaString += Number.isInteger(itemValue) && itemValue < 0 ? "-f" + variableIndex + ', ' : "f" + variableIndex + ', ';
          variableIndex++;
        }
      }
    );
    /**
     * its means that sum event have to trigger here
     */
    /*
    if(data.length > 0){
      for(let i = 0; i < data.length; i++)
      {
          let getValue = parseInt(data[i].value);
          if(Number.isInteger(getValue)){
            result += getValue;
          }
      }
      console.log(data);
      $(".bdt-result-count p span").text(result);
      $(".uk-textarea").text("SUM(" + formulaString.replace(/,\s*$/, "") + ")"); // removing comma at end
    }
    */
   //SUM(-f1, f2, f3, f4, 'Hello World!')
    let result_formula = formulajs.SUM([1, 2 , 3]);
    $(".bdt-result-count p span").text(result_formula);
  //  if(data.length > 0){
  //   let variableArray = [];
  //   for(let i = 0; i < data.length; i++)
  //   {
  //       variableArray.push()
  //   }
  //  }
}
/**
 * casting value
 */
function getValueIfInteger(value){
  if(value === undefined) return null;
  // first convert this value to integer 
  let valueConvert = parseInt(value);
  // and then check if this item is integer or not. if integer then return that value otherwise return false
  return Number.isInteger(valueConvert) === true ? valueConvert : value;
}
/**
 * trigger on ready default
 */
$(function(){
    calculate_result();
    $(".bdt-ep-calculator-form").change(function(){
        calculate_result();
    });
});