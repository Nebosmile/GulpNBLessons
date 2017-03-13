function nbselect(target, targetInput) {

    var finddublicate = document.getElementById(target + '_nb');
    if (finddublicate == undefined) {
        var select = document.getElementById(target);

        select.style.display = 'none';


        var optionArr = select.getElementsByTagName('option');
        var firstoption = optionArr[0];

        var nb_width = select.offsetWidth;
        var finalarr = [];
        var arrHTML = [];

        var father = select.parentNode;

        if (targetInput) {
            var secondinput = document.getElementById(targetInput);
            secondinput.value = firstoption.value;

            secondinput.addEventListener('blur', function() {
                ul.classList.remove('open');
            })
        }



        var ul = document.createElement('ul');
        ul.classList.add('nb_ul');
        ul.id = target + '_nb';
        ul.setAttribute('tabindex', '0');

        var div = document.createElement('div');
        div.classList.add('nb_select_wrapper');
        div.setAttribute('tabindex', '1')


        var input = document.createElement('input');
        input.name = select.name;
        input.value = firstoption.innerHTML;

        select.name = "";
        input.classList.add('nb_input');
        input.classList.add('form-control');
        input.addEventListener('click', function() {
            inspection();
        })

        function inspection() {
            if (!ul.classList.contains('open')) {
                ul.classList.add('open');
            } else {
                ul.classList.remove('open');
            }
        }


        optionArr = [].slice.call(optionArr);

        optionArr.forEach(function(key, index) {
            var li = document.createElement('li');
            li.innerHTML = optionArr[index].innerHTML;
            li.addEventListener('click', function() {
                if (!li.classList.contains('nb_active')) {
                    optionArr[index].selected = true;
                    if (select.hasAttribute('multiple')) {
                        li.classList.add('nb_active');
                    } else {
                        ul.classList.remove('open');
                    }

                    addvalue();

                } else {
                    li.classList.remove('nb_active');
                    optionArr[index].selected = false;
                    addvalue();
                }

            })

            ul.appendChild(li);
        })


        function addvalue() {
            finalarr = [];
            arrHTML = [];
            input.value = '';
            if (targetInput) {
                secondinput.value = "";
            }

            for (i = 0; i < optionArr.length; i++) {
                if (optionArr[i].selected == true) {
                    finalarr.push(optionArr[i].value);
                    arrHTML.push(optionArr[i].innerHTML);
                    console.log(arrHTML);

                }
            }

            input.value = arrHTML[0];


            if (targetInput) {
                if (finalarr[0] == 0) {
                    secondinput.value = 0;
                } else if (finalarr[0] == undefined) {
                    input.value = firstoption.innerHTML;
                    secondinput.value = firstoption.value;
                } else {
                    secondinput.value = finalarr.join(',');
                }


            }

        }
        div.addEventListener('blur', function() {

        })
        div.appendChild(input);
        div.appendChild(ul);
        father.appendChild(div)
    }

    //////////////////////////////////////////keypress

    window.onkeyup = pressed;
    function pressed(e) {

        if(e.which == 27){
            fullout.style.display='none';
            console.log("Нажата клавиша, ее значение ASCII: " + e.which);
        }
        else if(e.which ==122){
            fullout.style.display='none';
            console.log("Нажата клавиша, ее значение ASCII: " + e.which);
        }
    }

    closemenu.addEventListener("click",function(){
        mainwrap.remove()
        location.href = "../index.html"
    });


}
