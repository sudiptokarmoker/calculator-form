$(function(){
    //var all = document.querySelectorAll(".bdt-ep-field-wrap input, bdt-ep-field-wrap select");
    //var all = document.querySelectorAll(".bdt-ep-field-wrap input, .bdt-ep-field-wrap select");
    var all = $(".bdt-ep-field-wrap");
    $.each($(".bdt-ep-field-wrap"), function( index, value ) {
        if($(this).find("input[type=text]")){
            console.log($(this, 'input[type=text]').val());
        }
    });
    return;
    console.log(all);
    return;
    var data = [];
    for (var i=0; i < all.length; i++) {
        //console.log("type : " + all[i].value);
        //console.log($(all[i]).val());
        console.log(all[i].tagName);
        if(all[i].tagName === 'INPUT'){
            data.push({
                type: 'INPUT',
                index: i,
                value: all[i].value
            });
        } 
        if(all[i].tagName === 'SELECT'){
            data.push({
                type: 'SELECT',
                index: i,
                value: all[i].value
            });
        }
    }
    console.log(data);
});