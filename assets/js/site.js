function getVarableDataArray() {
    let data = [],
        variableIndex,
        onlyValueArray = [],
        formulaString = "",
        getIsRealValue,
        radioNameArrayStack = []; // radioNameArrayStack is for escaping duplicating value of radio button
    $.each(
        $(
            ".bdt-ep-field-wrap input[type=text], .bdt-ep-field-wrap input[type=hidden], .bdt-ep-field-wrap input[type=checkbox], .bdt-ep-field-wrap input[type=radio], .bdt-ep-field-wrap input[type=number]"
        ),
        function (index, item) {
            variableIndex = parseInt(index) + 1;
            let itemValue = parseInt($(item).val());
            if ($(item).prop("type") === "radio") {
                let currentRadioButtonName = $(item).attr('name');
                if ($("input[name='"+currentRadioButtonName+"']").is(":checked") === true && radioNameArrayStack.indexOf(currentRadioButtonName) < 0) {
                    radioNameArrayStack.push(currentRadioButtonName);
                    getIsRealValue = getValueIfInteger($('input[name="'+currentRadioButtonName+'"]:checked').val());
                    if (Number.isInteger(getIsRealValue)) {
                        onlyValueArray.push({
                            variable: "f" + variableIndex,
                            value: getIsRealValue,
                        });
                    }
                    data.push({
                        type: $(item).prop("type"),
                        index: index,
                        value: $(item).val(),
                        variable: "f" + variableIndex,
                        //real_value: getValueIfInteger($(item).val())
                        real_value: getIsRealValue,
                    });
                    formulaString +=
                        Number.isInteger(itemValue) && itemValue < 0
                            ? "-f" + variableIndex + ", "
                            : "f" + variableIndex + ", ";
                    variableIndex++;
                }
            }
            else if ($(item).prop("type") === "checkbox") {
                // first check if this item is checkbox or radio
                if ($(item).is(":checked") === true) {
                    getIsRealValue = getValueIfInteger($(item).val());
                    if (Number.isInteger(getIsRealValue)) {
                        onlyValueArray.push({
                            variable: "f" + variableIndex,
                            value: getIsRealValue,
                        });
                    }
                    data.push({
                        type: $(item).prop("type"),
                        index: index,
                        value: $(item).val(),
                        variable: "f" + variableIndex,
                        //real_value: getValueIfInteger($(item).val())
                        real_value: getIsRealValue,
                    });
                    formulaString +=
                        Number.isInteger(itemValue) && itemValue < 0
                            ? "-f" + variableIndex + ", "
                            : "f" + variableIndex + ", ";
                    variableIndex++;
                }
            } else if ($(item).prop("type") === "number") {
                getIsRealValue = getValueIfInteger($(item).val());
                if (Number.isInteger(getIsRealValue)) {
                    onlyValueArray.push({
                        variable: "f" + variableIndex,
                        value: getIsRealValue,
                    });
                }
                data.push({
                    type: $(item).prop("type"),
                    index: index,
                    value: $(item).val(),
                    variable: "f" + variableIndex,
                    //real_value: getValueIfInteger($(item).val())
                    real_value: getIsRealValue,
                });
                formulaString +=
                    Number.isInteger(itemValue) && itemValue < 0
                        ? "-f" + variableIndex + ", "
                        : "f" + variableIndex + ", ";
                variableIndex++;
            } else {
                getIsRealValue = getValueIfInteger($(item).val());
                if (Number.isInteger(getIsRealValue)) {
                    onlyValueArray.push({
                        variable: "f" + variableIndex,
                        value: getIsRealValue,
                    });
                }
                data.push({
                    type: $(item).prop("type"),
                    index: index,
                    value: $(item).val(),
                    variable: "f" + variableIndex,
                    //real_value: getValueIfInteger($(item).val())
                    real_value: getIsRealValue,
                });
                formulaString +=
                    Number.isInteger(itemValue) && itemValue < 0
                        ? "-f" + variableIndex + ", "
                        : "f" + variableIndex + ", ";
                variableIndex++;
            }
        }
    );
    return [data, onlyValueArray];
}
/**
 * casting value
 */
function getValueIfInteger(value) {
    if (value === undefined) return null;
    // first convert this value to integer
    let valueConvert = parseInt(value);
    // and then check if this item is integer or not. if integer then return that value otherwise return false
    return Number.isInteger(valueConvert) === true ? valueConvert : value;
    //return Number.isInteger(valueConvert) === true ? valueConvert : null;
}
/**
 * get the data settings from targetted element
 */
function getFormulaStringFromDataSettings() {
    let str = $(".bdt-ep-calculator").data("settings"),
        extract = str ? str.match(/'(.*)'/).pop() : false;
    return extract ? extract : false;
}
/**
 * processing calculation
 */
function procesingFormDataWithFormulaJs() {
    let getDataArray = getVarableDataArray(),
        regexp = new RegExp("[f][1-9][0-9]{0,2}|1000$", "g"),
        str = getFormulaStringFromDataSettings(),
        match,
        value;
    let variableArray = getDataArray[1]; // here variableArray is just contain all variable information
    if (variableArray.length > 0) {
        while ((match = regexp.exec(str)) !== null) {
            let isElementExistsCounter = 0;
            for (let i = 0; i < variableArray.length; i++) {
                if (variableArray[i]["variable"] === match[0]) {
                    str = str.replace(match[0], variableArray[i]["value"]);
                    isElementExistsCounter++;
                }
            }
            if(isElementExistsCounter === 0){
                str = str.replace(match[0], null);
            }
        }
        try {
            value = eval("formulajs." + str);
            console.log(value);
            $(".bdt-result-count p span").text(value);
        } catch (error) {
            alert("error occured, invalid data format. please fix the data format and send again. thanks!");
        }
    }
}

$(".bdt-ep-calculator-form").submit(function (e) {
    e.preventDefault();
    procesingFormDataWithFormulaJs();
});

$(".bdt-ep-calculator-form").change(function () {
    procesingFormDataWithFormulaJs();
});