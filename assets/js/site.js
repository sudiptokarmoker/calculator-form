function calculate_result(){
    let data = [], variableIndex, formulaString = '', result = 0, onlyValueArray = [], getIsRealValue;
    $.each($(".bdt-ep-field-wrap input[type=text], .bdt-ep-field-wrap input[type=hidden], .bdt-ep-field-wrap input[type=checkbox], .bdt-ep-field-wrap input[type=radio], .bdt-ep-field-wrap input[type=number]"),
      function (index, item) {
        variableIndex = parseInt(index) + 1;
        let itemValue = parseInt($(item).val());
        if ($(item).prop("type") === "checkbox" || $(item).prop("type") === "radio") { // first check if this item is checkbox or radio
          if ($(item).is(":checked") === true) {
            getIsRealValue = getValueIfInteger($(item).val());
            if(Number.isInteger(getIsRealValue)){
              onlyValueArray.push({
                variable: "f" + variableIndex,
                value: getIsRealValue
              });
            }
            data.push({
              type: $(item).prop("type"),
              index: index,
              value: $(item).val(),
              variable: "f" + variableIndex,
              //real_value: getValueIfInteger($(item).val())
              real_value: getIsRealValue
            });
            formulaString += Number.isInteger(itemValue) && itemValue < 0 ? "-f" + variableIndex + ', ' : "f" + variableIndex + ', ';
            variableIndex++;
          }
        } else if ($(item).prop("type") === "number") {
          getIsRealValue = getValueIfInteger($(item).val());
          if(Number.isInteger(getIsRealValue)){
            onlyValueArray.push({
              variable: "f" + variableIndex,
              value: getIsRealValue
            });
          }
            data.push({
              type: $(item).prop("type"),
              index: index,
              value: $(item).val(),
              variable: "f" + variableIndex,
              //real_value: getValueIfInteger($(item).val())
              real_value: getIsRealValue
            });
            formulaString += Number.isInteger(itemValue) && itemValue < 0 ? "-f" + variableIndex + ', ' : "f" + variableIndex + ', ';
            variableIndex++;
        } else {
          getIsRealValue = getValueIfInteger($(item).val());
          if(Number.isInteger(getIsRealValue)){
            onlyValueArray.push({
              variable: "f" + variableIndex,
              value: getIsRealValue
            });
          }
          data.push({
            type: $(item).prop("type"),
            index: index,
            value: $(item).val(),
            variable: "f" + variableIndex,
            //real_value: getValueIfInteger($(item).val())
            real_value: getIsRealValue
          });
          formulaString += Number.isInteger(itemValue) && itemValue < 0 ? "-f" + variableIndex + ', ' : "f" + variableIndex + ', ';
          variableIndex++;
        }
      }
    );
  return [
    data,
    onlyValueArray
  ];
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
let getDataArray;
$(function(){
    // getDataArray = calculate_result();
    // console.log(getDataArray);
    // $(".bdt-ep-calculator-form").change(function(){
    //   getDataArray = calculate_result();
    // });
});

$('.bdt-ep-calculator-form').submit(function(e){
  e.preventDefault();
  let getDataArray = calculate_result();
  console.log(getDataArray);
  //return;
  //let regexp = new RegExp('[f][0-9]*','g');
  let regexp = new RegExp('[f][1-9][0-9]{0,2}|1000$','g');
  let str = $('.uk-textarea').val();
  let match;
  let data = {
    f1: 20,
    f2: 30,
    f999: 658554
  };
  /*
  while ((match = regexp.exec(str)) !== null) {
      if(data[match[0]]){
        let regex = match[0];
        str = str.replace(match[0], data[match[0]]);
      }
  }
  */
  /*
    //variableArray[i] = 0: {variable: 'f2', value: 20}
    1: {variable: 'f5', value: 876}
    2: {variable: 'f6', value: 876}
    3: {variable: 'f7', value: 36}
    length: 4
  */
 console.log('textarea value : ' + str);
  let variableArray = getDataArray[1];
  while ((match = regexp.exec(str)) !== null) {
    for(let i = 0; i < variableArray.length; i++){
      // console.log("varable : ");
      //console.log('varable : ' + variableArray[i]['variable']);
      //console.log('mathch : ' + match[0]);
      if(variableArray[i]['variable'] === match[0]){
        let regex = match[0];
        ///console.log(match[0]);
        str = str.replace(match[0], variableArray[i]['value']);
      } 
    }
    //console.log(str);
    //return;
    /*
    if(data[match[0]]){
      let regex = match[0];
      str = str.replace(match[0], data[match[0]]);
    }
    */
}
//console.log(str);
//return;

  let value;
  try{
    //let formulaString = "LEFT('Sale Price', 4)";
    value = eval('formulajs.' + str);
    console.log(value);
    $('.bdt-result-count p span').text(value);
  } catch(error){
    //console.log("error occured");
    alert('error occured, invalid data format. please fix the data format and send again. thanks!')
  }
})