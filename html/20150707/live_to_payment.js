$(function(){
	threeSelect(); 
});
function threeSelect(){ 
var $s1=$("#Select1"); 
var $s2=$("#Select2"); 
var $s3=$("#Select3"); 
var v1=null; 
var v2=null; 
var v3=null; 
$s1.html("<option>请选择省份</option>");
$.each(threeSelectData,function(k,v){ 
  appendOptionTo($s1,k,v.val,v1); 
}); 
$s1.change(function(){ 
$s2.html("<option value='|'>请选择城市</option>"); 
$s3.html("<option valkue='|'>请选择区县</option>"); 
if(this.selectedIndex==-1) return; 
var s1_curr_val = this.options[this.selectedIndex].value; 
$.each(threeSelectData,function(k,v){ 
if(s1_curr_val==v.val){ 
if(v.items){ 
$.each(v.items,function(k,v){ 
appendOptionTo($s2,k,v.val,v2); 
}); 
} 
} 
}); 
if($s2[0].options.length==0){appendOptionTo($s2,"...","",v2);} 
$s2.change(); 
}).change(); 
$s2.change(function(){ 
$s3.html("<option value='|'>请选择区县</option>"); 
var s1_curr_val = $s1[0].options[$s1[0].selectedIndex].value; 
if(this.selectedIndex==-1) return; 
var s2_curr_val = this.options[this.selectedIndex].value; 
$.each(threeSelectData,function(k,v){ 
if(s1_curr_val==v.val){ 
if(v.items){ 
$.each(v.items,function(k,v){ 
if(s2_curr_val==v.val){ 
$.each(v.items,function(k,v){ 
appendOptionTo($s3,k,v,v3); 
}); 
} 
}); 
if($s3[0].options.length==0){appendOptionTo($s3,"...","",v3);} 
} 
} 
}); 
}).change(); 
function appendOptionTo($o,k,v,d){ 
  var $opt=$("<option>").text(k).val(v); 
  if(v==d){$opt.attr("selected", "selected")} 
     $opt.appendTo($o); 
  } 
} 
function show(postcode){
	//alert(postcode);
   $("#postcode").html(postcode);
  
}