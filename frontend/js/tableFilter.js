var checkfunction;

window.addEventListener('load', function() {
    var filterBlockArr = document.getElementsByClassName('tableFilter');

    //obj для хранения cтилей
    var styleobj = {};

    var style = document.getElementsByTagName('style')[0];



    for (var i = 0; i < filterBlockArr.length; i++) {
        initfilter(filterBlockArr[i], style[i]);
        showFilter(filterBlockArr[i]);
    }

    function initfilter(obj) {
        //массив для хранения стиля каждой таблиц.
        var styleArr = [];
        //мaсси для хранения input;
        var inpArr = []
        var filterblock = obj.getElementsByClassName('filterblock')[0];



        var filterblockin = document.createElement('div');
        filterblockin.classList.add('filterblockin');
        var form = document.createElement('form');


        /// таблица которую будем форматировать
        var table = obj.getElementsByTagName('table')[0];
        var id = table.id;
        if (id == "") {
            var rand = (Math.random() * 100000).toString(36)
            table.id = rand.substring(6);

            id = table.id;
        }




        var thArr = table.getElementsByTagName('th');
        var tdArr = table.getElementsByTagName('td');
        var reguest='';
        for (var j = 0; j < thArr.length; j++) {


            var label = document.createElement("label");
            label.innerHTML = thArr[j].innerHTML;

            var input = document.createElement("input");
            input.setAttribute('type', "checkbox");

            if(table.id == 'ExchangTable'){
                if (thArr[j].innerHTML.search( /^date$|^updateTime$|USD|UAH|EUR|XAU|RUB|CNS/i ) + 1) {
                        input.setAttribute('checked', "checked");
                }
            }

            else{
                if (thArr[j].innerHTML.indexOf('Coins') + 1 || thArr[j].innerHTML.indexOf('coins') + 1) {

                } else {
                    input.setAttribute('checked', "checked");
                }
            }



            inpArr.push(input);

            if (!input.checked) {
                var somestile = "#" + id + " th:nth-child(" + (j + 1) + ")," + "#" + id + " td:nth-child(" + (j + 1) + "){display:none}";
                styleArr.push(somestile);
            } else if (input.checked) {
                // var somestile= "#"+id+" th:nth-child("+j+"){display:inherit}";
                // styleArr.push(somestile);
            }
            label.appendChild(input);
            form.appendChild(label);


        }
        filterblockin.appendChild(form);
        filterblock.appendChild(filterblockin);
        var div = document.createElement("div");

        var sumbitInput = document.createElement("input");
        sumbitInput.setAttribute('type', "submit");
        sumbitInput.value = "save";
        sumbitInput.classList.add('btn-success', "btn-lg", 'btn');
        var isfilterblockin =filterblock.getElementsByTagName('label')[0];
        if(id == "ExchangTable"){
            console.log("ExchangTable");
            checkfunction = function(){
                if(isfilterblockin ==undefined){
                    filterblock.innerHTML="";
                    var b =initfilter(obj);
                    var a = checktable();
                }

            }

        }

        var defaultInput = document.createElement("input");
        defaultInput.setAttribute('type', "reset");
        defaultInput.value = "default";
        defaultInput.classList.add('btn-primary', "btn-lg", 'btn');


        div.appendChild(sumbitInput);
        div.appendChild(defaultInput);
        form.appendChild(div);

        styleobj[id] = styleArr;

        (function() {

            sumbitInput.addEventListener("click", function(e) {
                e.preventDefault();


                checktable();

            })
        }())

        function checktable() {

            styleArr = [];

            for (var y = 0; y < inpArr.length; y++) {
                if (!inpArr[y].checked) {
                    var somestile = "#" + id + " th:nth-child(" + (y + 1) + ")," + "#" + id + " td:nth-child(" + (y + 1) + "){display:none}";
                    styleArr.push(somestile);
                } else if (inpArr[y].checked) {
                    // var somestile= "#"+id+" th:nth-child("+j+"){display:inherit}";
                    // styleArr.push(somestile);
                }
                styleobj[id] = styleArr;
            }
            // console.log(styleArr);
            objinStyle()
            filterblock.classList.add('hide');
        }
        checktable();
    }


    function showFilter(obj) {
        var newobj =obj;
        var filterblock = obj.getElementsByClassName('filterblock')[0];
        var filterButton = obj.getElementsByClassName('filterButton')[0];

        filterButton.addEventListener('click', function() {
            var inputArr = newobj.getElementsByTagName('Label');
            console.log(inputArr);
            if (filterblock.classList.contains('hide')) {
                filterblock.classList.remove('hide')
            } else {
                filterblock.classList.add('hide');
            }
        })
    }
    //////// функция отрисовки стилей из нашего обьекта
    function objinStyle() {
        ////конвертируем обьект в массив
        var NewArrStyle = [];
        for (key in styleobj) {
            var sring = styleobj[key].join('');
            NewArrStyle.push(sring)
            // console.log(NewArrStyle);
        }
        var FinalStyle = NewArrStyle.join('');
        // console.log(FinalStyle);
        style.innerHTML = FinalStyle;
    }


});
