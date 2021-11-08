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
    //let result_formula = formulajs.SUM([1, 2 , 3]);

    //let result_formula = formulajs.SUM([1, 2 , 3]);
    //$(".bdt-result-count p span").text(result_formula);

  //  if(data.length > 0){
  //   let variableArray = [];
  //   for(let i = 0; i < data.length; i++)
  //   {
  //       variableArray.push()
  //   }
  //  }

/*
  let regexp = new RegExp('f[d]*','g');
  let str = 'SUM(f1, f2, f6)';
  let match;

  while ((match = regexp.exec(str)) !== null) {
    console.log(`Found ${match[0]} start=${match.index} end=${regexp.lastIndex}.`);
    // expected output: "Found football start=6 end=14."
    // expected output: "Found foosball start=16 end=24."
  }
*/
/*
let regexp = new RegExp('[f][0-9]','g');
let str = 'SUM(f1, f2, f64)';
let match;

while ((match = regexp.exec(str)) !== null) {
  console.log(`Found ${match[0]} start=${match.index} end=${regexp.lastIndex}.`);
}
VM702:6 Found f1 start=4 end=6.
VM702:6 Found f2 start=8 end=10.
VM702:6 Found f6 start=12 end=14.
*/
  return data;
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
    getDataArray = calculate_result();
    console.log(getDataArray);
    $(".bdt-ep-calculator-form").change(function(){
      getDataArray = calculate_result();
    });
    
});

$('.bdt-ep-calculator-form').submit(function(e){
  e.preventDefault();
  const cloneArray = getDataArray;
  let newArray = {};
  for(let i = 0; i < cloneArray.length; i++){
    if(Number.isInteger(cloneArray[i].real_value)){
      variableText = cloneArray[i].variable;
      newArray[i] = {
        variableText: cloneArray[i].real_value
      }
    }
  }
  console.log(newArray);


  //let regexp = new RegExp('[f][0-9]*','g');
  let regexp = new RegExp('[f][1-9][0-9]{0,2}|1000$','g');

  let str = $('.uk-textarea').text();
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
  while ((match = regexp.exec(str)) !== null) {
    if(data[match[0]]){
      let regex = match[0];
      str = str.replace(match[0], data[match[0]]);
    }
}
  let value;
  try{
    let formulaString = "LEFT('Sale Price', 4)";
    value = eval('formulajs.' + formulaString);
    console.log(value);
  } catch(error){
    console.log("error occured");
  }
})