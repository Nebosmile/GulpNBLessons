window.addEventListener('load', function(){

    var hideblockArr = document.getElementsByClassName('hidewrap');

    for (var i = 0; i < hideblockArr.length; i++) {

        (function() {
            var j = i;
            var hideButton = hideblockArr[j].getElementsByClassName('hideButton')[0];
            hideButton.addEventListener("click", function() {

                var hideitem = hideblockArr[j].getElementsByClassName('hideitem')[0];
                var height = hideitem.offsetHeight;
                if (!hideButton.classList.contains('see')) {
                    hideitem.style.marginTop = -height + "px";
                    hideButton.classList.add("see");
                    setTimeout(function() {
                        hideitem.classList.add('hideclass');
                    }, 500)
                } else if (hideButton.classList.contains('see')) {
                    hideitem.classList.remove('hideclass');
                    setTimeout(function() {
                        hideitem.style.marginTop = 0 + "px";
                    }, 20)
                    hideButton.classList.remove("see");



                }

            })
        }())
    }
});
