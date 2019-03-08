function dateStartGtdateEnd(startDate,endDate,parentDiv){
  window.setTimeout(function(){
    var startDateNum=$(startDate).val().replace(/\-/g,"").replace(/\:/g,"").replace(/\s+/g,"");
    startDateNum.length==8 ? startDateNum+="0000" : startDateNum=startDateNum;
    console.log(startDateNum);
    var endDateNum=$(endDate).val().replace(/\-/g,"").replace(/\:/g,"").replace(/\s+/g,"");
    endDateNum.length==8 ? endDateNum+="0000" : endDateNum=endDateNum;
    if(parseInt(startDateNum)>parseInt(endDateNum)){
      $(startDate).parents(parentDiv).find(".error").show();
    }else{
      $(endDate).parents(parentDiv).find(".error").hide();
    };
  },300);
};

function dateStartGtdateEnd1(startDate,endDate,parentDiv){
  window.setTimeout(function(){
    var startDateNum=startDate.val().replace(/\-/g,"").replace(/\:/g,"").replace(/\s+/g,"");
    startDateNum.length==8 ? startDateNum+="0000" : startDateNum=startDateNum;
    console.log(startDateNum);
    var endDateNum=endDate.val().replace(/\-/g,"").replace(/\:/g,"").replace(/\s+/g,"");
    endDateNum.length==8 ? endDateNum+="0000" : endDateNum=endDateNum;
    console.log(startDate.parents(parentDiv));
    if(parseInt(startDateNum)>parseInt(endDateNum)){
      parentDiv.find(".error").show();
    }else{
      parentDiv.find(".error").hide();
    };
  },300);
};