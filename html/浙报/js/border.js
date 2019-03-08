function borderInit(){
    function border(){
        $('.subNav').height(Math.max($(window).height()-161,$('.content').height()));
    };
    border();
    $(window).resize(function(){
        border();
    });
}
