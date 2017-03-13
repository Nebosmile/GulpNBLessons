window.addEventListener('load', function(){

    var alignBlock = document.getElementsByClassName("alignBlock");

    for(var i = 0; i < alignBlock.length; i++ ){
        (function () {
            var j =i;
            alignFunc(alignBlock[j]);
        }())

    }



    function alignFunc(obj){



        var tr = obj.getElementsByTagName('tr')[0];

        $(document).on('scroll', function(e){
            var thead =obj.getElementsByTagName('thead')[0];
            var elem =obj.getElementsByTagName('table')[0];
            var nav =obj.getElementsByClassName("navigate")[0];
            var rowchik =obj.getElementsByClassName("rowchik")[0];

            var a = nav.getBoundingClientRect();
            var scroling1 =a.top;
            var newscroling =scroling1-92;
            if(scroling1>92){
                rowchik.style.transform ="";
                thead.style.transform ="";
            }else if (scroling1 ==0) {
                thead.style.transform ="0px";
                rowchik.style.transform ="0px";
            }else if(scroling1<92){
                thead.style.transform ="translateY("+ (-newscroling -2) +"px)";
                rowchik.style.transform ="translateY("+ (-newscroling) +"px)";
            }
        });






    }
})
