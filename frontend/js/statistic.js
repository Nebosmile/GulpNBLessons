"use strict";
//test for master branch
$(document).ready(function() {

    var sessionstabs = document.getElementById("sessionhref"); ////// вкладка sessions
    var roundstabs = document.getElementById("roundshref"); ////// вкладка раундов
    var roundsturns = document.getElementById('roundturnhref') ///////вкладка собтий по раунду


    var Sessionstart = 1;


    var PERSENT = "";
    var firstitem = 1; // текущее положение постраничной навигации, счетчик позицииж
    var firstitemrounds = 1;
    var firstconsal = 1; //консалидированая
    var firstturn = 1; //события по раунду
    var firstuser =1;
    var firstdetail =1;
    var url = null; //"http://gameservice.bossgs.org/STAT/StatisticWatcher.svc/";
    var casinoUrl = null; //http://autorisation.bossgs.org/test/api.php?getCasinos=1;
    var autorisationUrl = null;

    var imgUrl = "http://gameservice.bossgs.org/img/";

    var slotsFilterForm = document.forms.sessionFilterForm; // указатель на форму сессий
    var ConsalidStatistic = document.forms.ConsalidStatistic; // указатель на форму консалидированую
    var Roundsstat = document.forms.Roundsstat; // указатель на форму раундов по сессии
    var RoundTurnstat = document.forms.RoundTurnstat; // указатель на форму событий по раунду
    var CurrencyExchange = document.forms.CurrencyExchange; // указатель на форму валют
    var Userstat = document.forms.Userstat; // указатель на форму юзера

    var selectSlotId = slotsFilterForm.elements.slotsIdFilter; // указатель на селект  слото сессии
    var selectCasino = slotsFilterForm.elements.casinoFilter; // указатель на селект казино сессии
    var selectSlotIdconsal = ConsalidStatistic.elements.slotsIdFilter; // указатель на селект  слото сессии
    var selectCasinoconsal = ConsalidStatistic.elements.casinoFilter; // указатель на селект  казино консалидированной статистики


    var selectCasinoRound = Roundsstat.elements.casinoFilter;
    var selectroundsSlot = Roundsstat.elements.slotsIdFilter /// селект по слотам для формы раундов

    var selectCasinoUser = Userstat.elements.casinoFilter; /// селект казино  юезерс


    var choseStat = $(".indexDiv");
    var pagewrapper = $("#page-wrapper");
    var sessionColection = [];
    ///////////////////////////////////////////////////указатели на тело таблиц. сюда выводим статистику
    var sessionIn = document.getElementById("sessionIn");
    var consalIn = document.getElementById("consalIn");
    var RoundsIn = document.getElementById("RoundsIn");
    var RoundsturnIn = document.getElementById("RoundsturnIn");
    var UserIn = document.getElementById("UserIn");

    var navigationTableSession = document.getElementById("navigationTableSession"); ///указатель блок навигации
    var navigationTableRounds = document.getElementById("navigationTableRounds"); ///указатель блок навигации rounds
    var navigationTableRoundsTurn = document.getElementById("navigationTableRoundsTurn"); ///указатель блок навигации roundsTurn
    var navigationConsalTable = document.getElementById("navigationConsalTable"); ///указатель блок навигации
    var navigationUsers =document.getElementById("navigationUsers"); ///указатель блок навигации usersvar

    var navigationDetails =document.getElementById("navigationDetails");
    var navobj = {}; /// обьект для храненния данных всех навигаций
    /////////////////указатели на размер отображения
    var tableSize = slotsFilterForm.elements.show;
    var tableSizerounds = Roundsstat.elements.show;
    var tableSizeconsal = ConsalidStatistic.elements.show;

    var rounds = document.getElementById("rounds");
    var sesTable = document.getElementById('sessionTableId'); //таблица сессий
    var consalTable = document.getElementById('consalTableId'); //консалидированая таблица Global
    var roundsTable = document.getElementById('RoundsTableId'); //таблица раундов по сессии
    var roundTurnTable = document.getElementById('roundTurnTable'); //таблица круток по раунду


    ////////////////////  выбор статистики
    var goIndex = document.getElementById('goIndex');
    var indexselect = document.getElementById('indexselect');
    var choose = document.getElementsByClassName('choose')[0];


    //// инпуты адресов
    var activstatistic;
    var StatisticIndex = "StatisticWatcher.svc/"


    var Settingsform = document.forms.Settingsform;

    var SetUrl = Settingsform.elements.SetUrl;
    var Geturlstat = Settingsform.elements.Geturlstat.value;
    var Geturlcasino = Settingsform.elements.Geturlcasino.value;
    console.log(Geturlstat);
    var nowstatistic;
    ////панелька в хедер.
    var head_logIn = document.getElementsByClassName('head_logIn')[0];

    ///вспомогательный массив для навигации turn detail
    var detailArr =[];

    ///настройка вывода дат
    var optionsdate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    var game_stat = document.getElementsByClassName('game_stat')[0];

    goIndex.addEventListener('click', function() {
        reset();
        nowstatistic = indexselect.value;
        // choose.classList.add("open");
        if (nowstatistic == "test") {
            activstatistic = '/TESTSTAT/';
            url = Geturlstat + activstatistic + StatisticIndex;
            casinoUrl = Geturlcasino + "/test/api.php?getCasinos=1";
            // autorisationUrl = "http://autorisation.bossgs.org/test/api.php";
            choseStat.removeClass('open');
            pagewrapper.addClass("open");
            getSlotsList();
            getCasino();
        } else if (nowstatistic == "prod") {
            activstatistic = '/STAT/';
            url = Geturlstat + activstatistic + StatisticIndex;
            casinoUrl = Geturlcasino + "/prod/api.php?getCasinos=1";
            // autorisationUrl = "http://autorisation.bossgs.org/prod/api.php";
            choseStat.removeClass('open');
            pagewrapper.addClass("open");
            getSlotsList();
            getCasino();
        } else if (nowstatistic == 'interstat') {
            url = "http://autorisation.bossgs.org/interstat/api.php?";
            casinoUrl = url + "getCasino";
            choseStat.removeClass('open');
            pagewrapper.addClass("open");
            game_stat.classList.remove('hide');
            getCasino();
            initgameSelect(slotsFilterForm);
            initgameSelect(ConsalidStatistic);
            initgameSelect(Roundsstat);
            initgameSelect(Userstat);
            getCurrency("0", CurrencyExchange);
            getSlotsList();
        }

    });

    choose.addEventListener('click', function() {
        choose.classList.remove("open");
        choseStat.addClass("open");
        pagewrapper.removeClass('open');
    })

    SetUrl.addEventListener('click', function(e) {
        Geturlstat = Settingsform.elements.Geturlstat.value;
        e.preventDefault();
        url = Geturlstat + activstatistic + StatisticIndex;
    })



    //////функция для получения списка слотов. Пока берем список слотов из перебора общей статистики
    // function getSlotsList() {
    //     $.ajax({
    //         url: url + 'GetSlotsFiltered/!/!/!/!-!/!-!/!-!/!-!/USD/HRN-4%7CEUR-112', //Костыль с валютой
    //         dataType: 'JSONP',
    //         type: 'GET',
    //         success: function(data) {
    //             // console.log(JSON.stringify(data));
    //             makeSlotList(data);
    //         }
    //     })
    //
    // };
    function getSlotsList() {

        $.ajax({
            url: url + 'getSlots',
            dataType: 'JSON',
            type: 'GET',
            success: function(data) {
                console.log(data);
                makeSlotList(data);
            }
        })

    };
    ///// функция получения списка казино
    function getCasino() {
        $.ajax({
            url: casinoUrl,
            dataType: 'JSON',
            type: 'GET',
            success: function(data) {
                // console.log(JSON.stringify(data));
                makeCasinoList(data);
                // nbselect("casinoFilter",'casinoId');
            }
        })

    };

    // функция записи списка слотов
    function makeSlotList(answer) {
        var slots = answer.info;
        slots.forEach(function(item, i) {
            makeOption(item, selectSlotId, 1);
            makeOption(item, selectSlotIdconsal, 1);
            makeOption(item, selectroundsSlot, 1);
        });
    };
    // функция записи списка казино
    function makeCasinoList(answer) {
        var casinos = answer.info;
        casinos.forEach(function(item, i) {
            makeOption(item, selectCasino);
            makeOption(item, selectCasinoconsal);
            makeOption(item, selectCasinoUser);
            makeOption(item, selectCasinoRound);
        });
    };


    ////функция обнуления
    function reset() {
        var sessionid = slotsFilterForm.elements.sessionid;
        sessionid.value = "";

        function addreset(target) {
            target.innerHTML = '';
            var resetoptions = document.createElement('option');
            resetoptions.value = '0';
            resetoptions.innerHTML = "All"
            target.appendChild(resetoptions);
        }
        addreset(selectSlotId);
        addreset(selectSlotIdconsal);
        addreset(selectCasino);
        addreset(selectCasinoUser);
        addreset(selectCasinoconsal);
        addreset(selectroundsSlot);

    }
    ///функция добавления узлов option
    function makeOption(elem, target) {

        var options = document.createElement('option');
        if (elem.cid) {
            options.value = elem.cid;
            options.innerHTML = elem.casinoName; //casinoName
        } else if (elem.sCode) {
            options.value = elem.sCode;
            options.innerHTML = elem.sName;

        }
        target.appendChild(options);
    };


    ///назначекние кнопок
    ////сессия

    function initgameSelect(obj) {

        ///селект игр
        if (obj.elements.slotsIdFilter != undefined) {
            var gameselect = obj.elements.slotsIdFilter;
            var gameId = obj.elements.gameId;
            gameselect.addEventListener('change', function() {
                gameId.value = gameselect.value;

            });
        }


        //селект казино
        if (obj.elements.casinoFilter != undefined) {
            var casinoselect = obj.elements.casinoFilter;
            var casiniId = obj.elements.casinoId;

            if (obj.elements.currency != undefined) {
                var currency = obj.elements.currency;
                getCurrency(casinoselect.value, obj);
            }


            casinoselect.addEventListener('change', function() {
                casiniId.value = casinoselect.value;
                if (obj.elements.currency != undefined) {
                    getCurrency(casinoselect.value, obj);
                }


            });
        }

    }



    function getCurrency(cid, target) {

        if (cid != "0") {
            $.ajax({
                url: url + 'getCasinoCurrency&cid=' + cid,
                dataType: 'JSON',
                type: 'GET',
                success: function(data) {
                    console.log(data)
                    var CasinoArr = data.info;
                    var CurrObg = {};
                    var CurrArr = [];

                    CasinoArr.forEach(function(item) {
                        CurrArr.push(item.name)
                    })
                    console.log(CurrArr)
                    setCurrency(CurrArr, target);

                }
            });
        } else if (cid == "0") {
            $.ajax({
                url: url + 'getCasinoCurrency&all',
                dataType: 'JSON',
                type: 'GET',
                success: function(data) {
                    var CasinoArr = data.info;
                    var CurrObg = {};
                    var CurrArr = [];

                    CasinoArr.forEach(function(item) {
                        item.currency.forEach(function(currname, index) {
                            CurrObg[(currname.name)] = currname.name;

                        })

                    })
                    for (var key in CurrObg) {
                        CurrArr.push(key)
                    }


                    setCurrency(CurrArr, target);
                }
            });
        }

    }

    function setCurrency(item, target) {
        var select = target.elements.currency;
        select.innerHTML = "";
        select.innerHTML = '<option value="0">All</option>'

        item.forEach(function(key, index) {
            var options = document.createElement('option');
            options.value = key;
            options.innerHTML = key;
            select.appendChild(options);
        })
    }


    function inputInit(target) {
        var now = new Date();
        var getFromTime = new Date();

        var selectTime = target.elements.timeFilter;

        var dateof = target.elements.dateof;
        var timeof = target.elements.timeof;
        var dateTo = target.elements.dateTO;
        var timeTo = target.elements.timeTO;

        dateof.addEventListener('click', function() {
            selectTime.value = "selectme";
        });
        timeof.addEventListener('click', function() {
            selectTime.value = "selectme";
        });
        dateTo.addEventListener('click', function() {
            selectTime.value = "selectme";
        });
        timeTo.addEventListener('click', function() {
            selectTime.value = "selectme";
        });
        selectTime.addEventListener('change', function() {
            dateTo.value = "" //(timeformat(new Date())).datavalue;
            timeTo.value = "" //(timeformat(new Date())).timevalue;
            if (selectTime.value == "!") {
                dateof.value = "";
                timeof.value = "";
                dateTo.value = "";
                timeTo.value = "";
            } else if (selectTime.value == "lastmonth") {
                var newtime = new Date();
                newtime.setMonth(newtime.getMonth() - 1);
                dateof.value = (timeformat(newtime)).datavalue;
                timeof.value = (timeformat(newtime)).timevalue;



            } else if (selectTime.value == "lastweek") {
                var newtime = new Date();
                newtime.setDate(newtime.getDate() - 7);
                dateof.value = (timeformat(newtime)).datavalue;
                timeof.value = (timeformat(newtime)).timevalue;
            } else if (selectTime.value == "thismonth") {
                var newtime = new Date();
                newtime.setDate(1);
                newtime.setHours(0);
                newtime.setMinutes(0);
                newtime.setSeconds(0);
                dateof.value = (timeformat(newtime)).datavalue;
                timeof.value = (timeformat(newtime)).timevalue;
            } else if (selectTime.value == "thisweek") {
                var newtime = new Date();
                var day = newtime.getDay();
                if (day == 0) {
                    day = 7
                } else {
                    day = day - 1;
                }
                newtime.setDate(newtime.getDate() - day);
                newtime.setHours(0);
                newtime.setMinutes(0);
                newtime.setSeconds(0);
                dateof.value = (timeformat(newtime)).datavalue;
                timeof.value = (timeformat(newtime)).timevalue;
            } else if (selectTime.value == "lastday") {
                var newtime = new Date();
                newtime.setDate(newtime.getDate() - 1);
                dateof.value = (timeformat(newtime)).datavalue;
                timeof.value = (timeformat(newtime)).timevalue;
            } else if (selectTime.value == "thisday") {
                var newtime = new Date();
                newtime.setHours(0);
                newtime.setMinutes(0);
                newtime.setSeconds(0);
                dateof.value = (timeformat(newtime)).datavalue;
                timeof.value = (timeformat(newtime)).timevalue;
            } else if (selectTime.value == "lasthour") {
                var newtime = new Date();
                newtime.setMinutes(newtime.getMinutes() - 60);
                dateof.value = (timeformat(newtime)).datavalue;
                timeof.value = (timeformat(newtime)).timevalue;
            } else if (selectTime.value == "last10m") {
                var newtime = new Date();
                newtime.setMinutes(newtime.getMinutes() - 10);
                dateof.value = (timeformat(newtime)).datavalue;
                timeof.value = (timeformat(newtime)).timevalue;
            }

        });

        var now = timeformat(now);
        //totime.value = now.firstvalue;
        //console.log(now.firstvalue)
    }

    inputInit(slotsFilterForm);
    inputInit(ConsalidStatistic);
    inputInit(Roundsstat);
    inputInit(RoundTurnstat);
    inputInit(RoundTurnstat);
    inputInit(CurrencyExchange);


    // форматирование даты
    function timeformat(time1) {
        var year = time1.getFullYear();
        var month = time1.getMonth();
        month += 1;
        if (month < 10) {
            month = "0" + month;
        }
        var day = time1.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var hours = time1.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        var minets = time1.getMinutes();
        if (minets < 10) {
            minets = "0" + minets;
        }
        var seconds = time1.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        var timeArr = {
            'datavalue': year + "-" + (month) + "-" + day,
            'timevalue': hours + ":" + minets + ":" + seconds,

        }


        return timeArr;
    }




    // NavSizeSession();

    function getSession() {

        var sessionid = slotsFilterForm.elements.sessionid;
        var sessionidvalue = sessionid.value;
        var sesurl;
        var pagenumber = navigationTableSession.getElementsByClassName('pagenumber')[0];
        var pagenumbervalue = Number(pagenumber.value);
        var show = slotsFilterForm.elements.show.value;
        var currency = slotsFilterForm.elements.currency.value;
        var cId = slotsFilterForm.elements.casinoId.value; //инпут казино id

        var gameId = slotsFilterForm.elements.gameId.value;
        if (gameId == "") {
            gameId = 0;
        }

        var spinsFrom = slotsFilterForm.elements.spinsFrom.value;
        if (spinsFrom == "") {
            spinsFrom = 0;
        }
        var spinsTo = slotsFilterForm.elements.spinsTo.value;
        if (spinsTo == "") {
            spinsTo = 9999999;
        }
        var userId = slotsFilterForm.elements.userId.value;

        // вычесляем локальную тайм зону для стартового и финального указателя времени
        var dateOfzone = new Date(taketimeOf(slotsFilterForm));
        var timezoneof = dateOfzone.getTimezoneOffset() * 60 * 1000;;



        var dateTozone = new Date(taketimeTo(slotsFilterForm));
        var timezoneTo = dateTozone.getTimezoneOffset() * 60 * 1000;;


        var NewValueOfTime = taketimeOf(slotsFilterForm) + timezoneof //
        if (isNaN(NewValueOfTime)) NewValueOfTime = 0;
        var NewValueToTime = taketimeTo(slotsFilterForm) + timezoneTo //
        if (isNaN(NewValueToTime)) NewValueToTime = 0;

        var status = getStatus(slotsFilterForm);

        var step = slotsFilterForm.elements.show.value;
        if (sessionidvalue.length > 0) {

            sesurl = "getGameSessionInfo=" + sessionidvalue;
        } else {
            var startlist = ((pagenumbervalue - 1) * show) + 1;
            sesurl = "getGameSession&start=" + startlist + '&step=' + step + "&startDate=" + NewValueOfTime + '&stopDate=' + NewValueToTime + "&isActive=" + status + "&currency=" + currency + '&cId=' + cId + '&sCode=' + gameId + '&roundMin=' + spinsFrom + '&roundMax=' + spinsTo + '&uId=' + userId;
        }


        (nowstatistic == 'interstat')
        if (nowstatistic == 'interstat') {

            $.ajax({
                url: url + sesurl,
                dataType: 'JSON',
                type: 'GET',
                success: function(data) {
                    if (data.error) {
                        alert(data.error)
                        return;
                    }
                    sessionIn.innerHTML = "";
                    var newobj = data;
                    // var newobj = data.Sessions;
                    sessionColection["session"] = newobj;
                    firstitem = pagenumbervalue;
                    makeSessionObjForNew(data, firstitem, navigationTableSession);

                        var tbody = document.getElementById('sessioncurrencyBody');
                        tbody.innerHTML = "";
                        if (data.currency != undefined) {
                        var currencyobj = data.currency.info;
                        for (var i = 0; i < data.currency.count; i++) {

                            makeSessionCurrency(currencyobj[i]);
                        }
                    }

                        var tbody1 = document.getElementById('sessionsummaryBody');
                        tbody1.innerHTML = "";
                        if (data.summary != undefined) {
                        var summaryobj = data.summary;
                        for (var i = 0; i < summaryobj.length; i++) {

                            makeSessionSummary(summaryobj[i]);
                        }
                    }

                }
            })
        } else {
            var yetTimeZone = new Date().getTimezoneOffset();
            yetTimeZone = yetTimeZone * 60 * 1000;
            console.log(yetTimeZone);
            var sessionsFilterForm = document.forms.sessionFilterForm;
            var gameId = sessionsFilterForm.elements.gameId.value;
            var casinoId = sessionsFilterForm.elements.casinoId.value;
            var userId = sessionsFilterForm.elements.userId.value;
            var spinsFrom = sessionsFilterForm.elements.spinsFrom.value;
            var spinsTo = sessionsFilterForm.elements.spinsTo.value;
            var incomeFrom = sessionsFilterForm.elements.incomeFrom.value;
            var incomeTo = sessionsFilterForm.elements.incomeTo.value;
            var winFrom = sessionsFilterForm.elements.winFrom.value;
            var winTo = sessionsFilterForm.elements.winTo.value;


            // вычесляем локальную тайм зону для стартового и финального указателя времени
            // var dateOfzone = new Date(taketimeOf(sessionsFilterForm));
            // var timezoneof = dateOfzone.getTimezoneOffset() * 60 * 1000;;
            // console.log(dateOfzone.toString());
            //
            //
            // var dateTozone = new Date(taketimeTo(sessionsFilterForm));
            // var timezoneTo = dateTozone.getTimezoneOffset() * 60 * 1000;;
            // console.log(dateTozone.toString());
            //
            // var NewValueOfTime = taketimeOf(sessionsFilterForm) + timezoneof //
            // var NewValueToTime = taketimeTo(sessionsFilterForm) + timezoneTo //

            if (gameId == "") gameId = "!"; //если форма пустая - ставит восклицательный знак - это значит без фильтра
            if (casinoId == "") casinoId = "!";
            if (userId == "") userId = "!";
            if (isNaN(NewValueOfTime) == true) NewValueOfTime = "!";
            if (isNaN(NewValueToTime) == true) NewValueToTime = "!";
            if (spinsFrom == "") spinsFrom = "!";
            if (spinsTo == "") spinsTo = "!";
            if (incomeFrom == "") incomeFrom = "!";
            if (incomeTo == "") incomeTo = "!";
            if (winFrom == "") winFrom = "!";
            if (winTo == "") winTo = "!";

            // console.log(url + 'GetSlotSessionsFiltered/' + gameId + '/' + casinoId + '/' + userId + '/' + dateFrom + '-' + dateTo + '/' + spinsFrom + '-' + spinsTo + '/' + incomeFrom + '-' + incomeTo + '/' + winFrom + '-' + winTo + '/')

            $.ajax({
                url: url + 'GetSlotSessionsFiltered/' + gameId + '/' + casinoId + '/' + userId + '/' + NewValueOfTime + '-' + NewValueToTime + '/' + spinsFrom + '-' + spinsTo + '/' + incomeFrom + '-' + incomeTo + '/' + winFrom + '-' + winTo + '/',
                dataType: 'JSONP',
                type: 'GET',

                success: function(data) {
                    if (data.error) {
                        alert(data.error)
                        return;
                    }
                    console.log(url + 'GetSlotSessionsFiltered/' + gameId + '/' + casinoId + '/' + userId + '/' + NewValueOfTime + '-' + NewValueToTime + '/' + spinsFrom + '-' + spinsTo + '/' + incomeFrom + '-' + incomeTo + '/' + winFrom + '-' + winTo + '/')
                    // console.log(JSON.stringify(data));
                    sessionIn.innerHTML = "";
                    var newobj = data.Sessions;
                    sessionColection["session"] = newobj;
                    firstitem = 1;
                    makeSessionObjFor(newobj, firstitem, navigationTableSession);
                    // sortTable(sessionColection["session"], sesTable);

                    NavSize();

                }
            });
        }

    }
    ////инициируем навигацию.(объект навигации, первый елемент, название)
    navButton(navigationTableSession, firstitem, "session");
    navButton(navigationTableRounds, firstitemrounds, "rounds");
    navButton(navigationConsalTable, firstconsal, "consal");
    navButton(navigationTableRoundsTurn, firstturn, "turn");
    navButton(navigationUsers, firstuser, "user");
    navButton(navigationDetails, firstdetail, "details");


    function makeSessionCurrency(obj) {

        var tbody = document.getElementById('sessioncurrencyBody');

        var tr = document.createElement('tr');

        var Nametd = document.createElement('td');
        var Backcashtd = document.createElement('td');
        var Backcoinstd = document.createElement('td');
        var casinostd = document.createElement('td');
        var userstd = document.createElement('td');
        var incomeCashtd = document.createElement('td');
        var incomeCoinstd = document.createElement('td');
        var roundstd = document.createElement('td');
        var slotstd = document.createElement('td');
        var totalBetCashtd = document.createElement('td');
        var totalBetCoins = document.createElement('td');
        var totalWinCash = document.createElement('td');
        var totalWinCoins = document.createElement('td');

        Nametd.innerHTML = obj.name;
        Backcashtd.innerHTML = obj.backCash;
        Backcoinstd.innerHTML = obj.backCoins;
        casinostd.innerHTML = obj.casinos;
        userstd.innerHTML = obj.users;
        incomeCashtd.innerHTML = obj.incomeCash.toFixed(2);
        incomeCoinstd.innerHTML = obj.incomeCoins;
        roundstd.innerHTML = obj.rounds;
        slotstd.innerHTML = obj.slots;
        totalBetCashtd.innerHTML = obj.totalBetCash.toFixed(2);
        totalBetCoins.innerHTML = obj.totalBetCoins;
        totalWinCash.innerHTML = obj.totalWinCash.toFixed(2);
        totalWinCoins.innerHTML = obj.totalWinCoins;

        tr.appendChild(Nametd);
        tr.appendChild(casinostd);
        tr.appendChild(userstd);
        tr.appendChild(roundstd);
        tr.appendChild(slotstd);
        tr.appendChild(totalBetCoins);
        tr.appendChild(totalWinCoins);
        tr.appendChild(incomeCoinstd);
        tr.appendChild(Backcoinstd);
        tr.appendChild(totalBetCashtd);
        tr.appendChild(totalWinCash);
        tr.appendChild(incomeCashtd);
        tr.appendChild(Backcashtd);

        tbody.appendChild(tr);




    }

    function makeSessionSummary(obj) {
        var tbody = document.getElementById('sessionsummaryBody');

        var tr = document.createElement('tr');


        var Backcashtd = document.createElement('td');
        var Backcoinstd = document.createElement('td');
        var casinostd = document.createElement('td');
        var userstd = document.createElement('td');
        var incomeCashtd = document.createElement('td');
        var incomeCoinstd = document.createElement('td');
        var roundstd = document.createElement('td');
        var slotstd = document.createElement('td');
        var totalBetCashtd = document.createElement('td');
        var totalBetCoins = document.createElement('td');
        var totalWinCash = document.createElement('td');
        var totalWinCoins = document.createElement('td');


        Backcashtd.innerHTML = obj.backCash;
        Backcoinstd.innerHTML = obj.backCoins;
        casinostd.innerHTML = obj.casinos;
        userstd.innerHTML = obj.users;
        incomeCashtd.innerHTML = obj.incomeCash.toFixed(2);
        incomeCoinstd.innerHTML = obj.incomeCoins;
        roundstd.innerHTML = obj.rounds;
        slotstd.innerHTML = obj.slots;
        totalBetCashtd.innerHTML = obj.totalBetCash.toFixed(2);
        totalBetCoins.innerHTML = obj.totalBetCoins;
        totalWinCash.innerHTML = obj.totalWinCash.toFixed(2);
        totalWinCoins.innerHTML = obj.totalWinCoins;


        tr.appendChild(casinostd);
        tr.appendChild(userstd);
        tr.appendChild(roundstd);
        tr.appendChild(slotstd);
        tr.appendChild(totalBetCoins);
        tr.appendChild(totalWinCoins);
        tr.appendChild(incomeCoinstd);
        tr.appendChild(Backcoinstd);
        tr.appendChild(totalBetCashtd);
        tr.appendChild(totalWinCash);
        tr.appendChild(incomeCashtd);
        tr.appendChild(Backcashtd);


        tbody.appendChild(tr);

    }

    var inputSumbit = slotsFilterForm.elements.submitSessionsFilter; ////отправка запроса
    inputSumbit.onclick = function(e) {
        e.preventDefault();
        var pagenumber = navigationTableSession.getElementsByClassName('pagenumber')[0];
         //номер страницы
         pagenumber.value = "1";
        getSession();
    }

    function taketimeOf(target) {
        var time = target.elements.dateof.value + "T" + target.elements.timeof.value;
        return Date.parse(time);
    }

    function taketimeTo(target) {
        var time = target.elements.dateTO.value + "T" + target.elements.timeTO.value;
        return Date.parse(time);
    }



    function constractsessionTable(obj, index) {

        var tr = document.createElement("tr");

        var idTd = document.createElement("td");
        var startDateTd = document.createElement("td");
        var endDateTd = document.createElement("td");
        var casinoIdTd = document.createElement("td");
        var userIdTd = document.createElement("td");
        var SessionIdTd = document.createElement("td");
        var GameTd = document.createElement("td");
        var RoundsTd = document.createElement("td");
        var betCoinsTd = document.createElement("td");
        var winCoinsTd = document.createElement("td");
        var incomCoinsTd = document.createElement("td");
        var backCoinsTd = document.createElement("td");
        var betCashTd = document.createElement("td");
        var winCashTd = document.createElement("td");
        var incomeCashTd = document.createElement("td");
        var backCashTd = document.createElement("td");
        var currencyTd = document.createElement("td");

        idTd.innerHTML = index + 1;

        var datestart = new Date(obj.DateStart)
        var TimeZonedatestart = datestart.getTimezoneOffset();
        startDateTd.innerHTML = datestart.toLocaleString("ru", optionsdate) //.toUTCString();



        if (!obj.DateEnd == 0) {
            var dateend = new Date(obj.DateEnd)
            endDateTd.innerHTML = dateend.toLocaleString("ru", optionsdate); //.toUTCString();

        } else if (obj.DateEnd == 0) {
            dateend = "not closed";
            endDateTd.innerHTML = dateend;
        }

        var nd = new Date();

        casinoIdTd.innerHTML = obj.Casino;
        userIdTd.innerHTML = obj.Username;

        SessionIdTd.innerHTML = obj.SessionId;
        if (obj.SpinCount > 0) {
            SessionIdTd.classList.add("clicker");
            SessionIdTd.onclick = function(e) { ///// назначаем кнопки на переход к сессии
                e.preventDefault();
                getRounds(obj.SessionId);
                roundstabs.click();
            }
        }




        GameTd.innerHTML = obj.SlotID;
        RoundsTd.innerHTML = obj.SpinCount;
        betCoinsTd.innerHTML = obj.TotalBet;
        winCoinsTd.innerHTML = obj.TotalWin;
        incomCoinsTd.innerHTML = obj.Income;
        backCoinsTd.innerHTML = ((obj.TotalWin / obj.TotalBet) * 100).toFixed(5);
        betCashTd.innerHTML = obj.TotalBetCents;
        winCashTd.innerHTML = obj.TotalWinCents;
        incomeCashTd.innerHTML = obj.IncomeCents;
        backCashTd.innerHTML = ((obj.TotalWinCents / obj.TotalBetCents) * 100).toFixed(5);
        currencyTd.innerHTML = obj.Currency;

        tr.appendChild(idTd);
        tr.appendChild(startDateTd);
        tr.appendChild(endDateTd);
        tr.appendChild(casinoIdTd);
        tr.appendChild(userIdTd);
        tr.appendChild(SessionIdTd);
        tr.appendChild(GameTd);
        tr.appendChild(RoundsTd);
        tr.appendChild(betCoinsTd);
        tr.appendChild(winCoinsTd);
        tr.appendChild(incomCoinsTd);
        tr.appendChild(backCoinsTd);
        tr.appendChild(betCashTd);
        tr.appendChild(winCashTd);
        tr.appendChild(currencyTd);
        tr.appendChild(incomeCashTd);
        tr.appendChild(backCashTd);


        sessionIn.appendChild(tr);
    }

    ///////////////////////вывод через for
    function makeSessionObjFor(obj, first, target) {
        sessionIn.innerHTML = "";
        firstitem = first;
        var show = slotsFilterForm.elements.show.value; //указатель на размер отображения по .... 50, 100....
        if (show > obj.length) {
            show = obj.length;
            console.log(show);
        }
        var pagenumber = target.getElementsByClassName('pagenumber')[0]; //номер страницы
        var showNow = target.getElementsByClassName('showNow')[0]; // текущие строки
        var showAll = target.getElementsByClassName('showpage')[0]; // всего строк
        var allpages = target.getElementsByClassName('allpages')[0]; // всего страниц
        var last = (first * show);
        var size = obj.length;
        navobj[target] = {};
        navobj[target].size = Math.ceil(size / show); // получаем число страниц и сохраняем в обьект навигации

        console.log(navobj);
        if (last > size) {
            last = size;
        }
        var start = (first - 1) * show;

        allpages.innerHTML = navobj[target].size;
        pagenumber.value = first;
        showNow.innerHTML = Number(start + 1) + "-" + last;
        showAll.innerHTML = size;
        for (var index = start; index < last; index++) {
            var index1 = index;
            constractsessionTable(obj[index1], index1);
        }
        //var elem =document.getElementById('sessionTableId');
        //var itis =elem.outerHTML;
        //
        //window.open('data:application/vnd.ms-excel; UNICODE,' + encodeURIComponent(itis));

    }

    function makeSessionObjForNew(obj, first, target) {
        console.log(obj);
        var objSize = obj.count;
        sessionIn.innerHTML = "";
        var show = slotsFilterForm.elements.show.value; //указатель на размер отображения по .... 50, 100....
        var start = EditNavpanell(obj, first, target,show)
        var newObj = obj.info;

        for (var index = 0; index < newObj.length; index++) {
            var index1 = index;
            var index2 = start + index;
            makeSessionTableNew(newObj[index1], index2);
        }

    }
    // таблица сессии новый вариант
    function makeSessionTableNew(obj, index) {


        var tr = document.createElement("tr");

        var idTd = document.createElement("td");
        var startDateTd = document.createElement("td");
        var endDateTd = document.createElement("td");
        var casinoIdTd = document.createElement("td");
        var userIdTd = document.createElement("td");
        var SessionIdTd = document.createElement("td");
        var GameTd = document.createElement("td");
        var RoundsTd = document.createElement("td");
        var betCoinsTd = document.createElement("td");
        var winCoinsTd = document.createElement("td");
        var incomCoinsTd = document.createElement("td");
        var backCoinsTd = document.createElement("td");
        var betCashTd = document.createElement("td");
        var winCashTd = document.createElement("td");
        var incomeCashTd = document.createElement("td");
        var backCashTd = document.createElement("td");
        var currencyTd = document.createElement("td");

        idTd.innerHTML = index + 1;

        var datestart = new Date(Number(obj.startDate))
        var TimeZonedatestart = datestart.getTimezoneOffset();
        startDateTd.innerHTML = datestart.toLocaleString("ru", optionsdate);


        if (!obj.endDate == 0) {
            var dateend = new Date(Number(obj.endDate))
            endDateTd.innerHTML = dateend.toLocaleString("ru", optionsdate);

        } else if (obj.DateEnd == 0) {
            dateend = "not closed";
            endDateTd.innerHTML = dateend;
        }

        var nd = new Date();

        casinoIdTd.innerHTML = obj.casinoId;
        userIdTd.innerHTML = obj.userId;

        SessionIdTd.innerHTML = obj.sessionID;
        if (obj.rounds > 0) {
            SessionIdTd.classList.add("clicker");
            SessionIdTd.onclick = function(e) { ///// назначаем кнопки на переход к сессии
                var pagenumber = navigationTableRounds.getElementsByClassName('pagenumber')[0];
                var roundsreset = document.getElementById('roundsreset');
                roundsreset.click();
                pagenumber.value = 1;
                e.preventDefault();
                sessioninputR.value = obj.sessionID;

                getRoundsNew(obj.sessionID);
                roundstabs.click();
            }
        }




        GameTd.innerHTML = obj.game;
        RoundsTd.innerHTML = obj.rounds;
        betCoinsTd.innerHTML = obj.totalBetCoins;
        winCoinsTd.innerHTML = obj.totalWinCoins;
        incomCoinsTd.innerHTML = obj.incomeCoins;
        backCoinsTd.innerHTML = obj.backCoins;
        betCashTd.innerHTML = obj.totalBetCash.toFixed(2);
        winCashTd.innerHTML = obj.totalWinCash.toFixed(2);
        incomeCashTd.innerHTML = obj.incomeCash.toFixed(2);
        backCashTd.innerHTML = obj.backCash;
        currencyTd.innerHTML = obj.currency;

        tr.appendChild(idTd);
        tr.appendChild(startDateTd);
        tr.appendChild(endDateTd);
        tr.appendChild(casinoIdTd);
        tr.appendChild(userIdTd);
        tr.appendChild(SessionIdTd);
        tr.appendChild(GameTd);
        tr.appendChild(RoundsTd);
        tr.appendChild(betCoinsTd);
        tr.appendChild(winCoinsTd);
        tr.appendChild(incomCoinsTd);
        tr.appendChild(backCoinsTd);
        tr.appendChild(betCashTd);
        tr.appendChild(winCashTd);
        tr.appendChild(currencyTd);
        tr.appendChild(incomeCashTd);
        tr.appendChild(backCashTd);


        sessionIn.appendChild(tr);



    }
    ///////////функция проверки checkbox
    function getStatus(target) {
        var active = target.elements.opensession;
        var closed = target.elements.clossession;
        active = active.checked;
        closed = closed.checked;
        if (active == true && closed == true) {
            return 2;
        } else if (active == true) {
            return 1;
        } else if (closed == true) {
            return 0;
        } else {
            return 2;
        }


    }
    // назначаем кнопки навигации
    function navButton(target, itemcounter, objname) {
        var step;

        var firstlist = target.getElementsByClassName('firstlist')[0];
        var previoslist = target.getElementsByClassName('previoslist')[0];
        var lastlist = target.getElementsByClassName('lastlist')[0];
        var nextlist = target.getElementsByClassName('nextlist')[0];
        var pagenumber = target.getElementsByClassName('pagenumber')[0];
        var allpages = target.getElementsByClassName('allpages')[0];

        function getitem() {
            if (objname == "session") {
                getSession()
            } else if (objname == "rounds") {
                getRoundsNew();
            } else if (objname == "consal") {
                getGlobal();
            } else if (objname == "turn") {
                getRoundTurn();
            }else if (objname == "user") {
                getUsers();
            }else if(objname=='details'){
                var sessionid =RoundTurnstat.elements.sessionid.value;
                var pagenumb = target.getElementsByClassName('pagenumber')[0].value;

                var turnId = detailArr[pagenumb-1];
                getSpin(sessionid,turnId);
            }

        }



        pagenumber.addEventListener('change', function() {
            if (!Number(pagenumber.value)) {
                pagenumber.value = 1;
            }
            if (Number(pagenumber.value) > Number(allpages.innerHTML)) {
                pagenumber.value = allpages.innerHTML;
                getitem()
            }
            if (pagenumber.value < 1) {
                pagenumber.value = 1;
                getitem()
            } else {
                getitem()
            }

        });

        firstlist.addEventListener('click', function() {
            pagenumber.value = 1;
            getitem()
        });
        lastlist.addEventListener('click', function() {
            pagenumber.value = Number(allpages.innerHTML)
            getitem()
        });

        nextlist.addEventListener('click', function() {
            pagenumber.value++;
            console.log(pagenumber.value)
            if (Number(pagenumber.value) > Number(allpages.innerHTML)) {
                pagenumber.value = allpages.innerHTML;
                console.log(pagenumber.value)
            }
            getitem()
        });
        previoslist.addEventListener('click', function() {
            pagenumber.value--;
            if (pagenumber.value < 1) {
                pagenumber.value = 1;
            }
            getitem()
        });


    }

    //// перестроение таблицы  при смене параметра вывода  ( выводить по )


    // function NavSizeSession() {
    //     tableSize.addEventListener("change", function() {
    //         var pagenumber = navigationTableSession.getElementsByClassName('pagenumber')[0];
    //         pagenumber.value = 1;
    //         getSession();
    //     });
    // }
    //
    // function NavSizeRounds() {
    //     tableSizerounds.addEventListener("change", function() {
    //         var pagenumber = navigationTableRounds.getElementsByClassName('pagenumber')[0];
    //         pagenumber.value = 1;
    //         getRoundsNew();
    //     });
    // }
    //
    // function NavSizeConsal() {
    //     tableSizeconsal.addEventListener("change", function() {
    //         var pagenumber = navigationTableConsal.getElementsByClassName('pagenumber')[0];
    //         pagenumber.value = 1;
    //         getGlobal();
    //     });
    // }
    // NavSizeRounds();
    // NavSizeConsal();

    /////////////////////////////////rounds



    var sessioninputR = Roundsstat.elements.sessionid;
    var inputSumbitRounds = document.getElementById('inputSumbitRounds');

    var inputSumbitRounds = Roundsstat.elements.inputSumbitRounds; ////отправка запроса
    inputSumbitRounds.onclick = function(e) {
        e.preventDefault();
        if (nowstatistic == 'interstat') {
            getRoundsNew();
        } else {
            getRounds();
        }
    }
    //Roundsstat форма раунда
    function getRoundsNew(sessionid, startindex) {
        var roundsurl;
        var indexstart;
        var show = Roundsstat.elements.show.value;
        var cId = Roundsstat.elements.casinoId.value; //инпут казино id
        var userId = Roundsstat.elements.userId.value;



        var dateOfzone = new Date(taketimeOf(Roundsstat));
        var timezoneof = dateOfzone.getTimezoneOffset() * 60 * 1000;

        var dateTozone = new Date(taketimeTo(Roundsstat));
        var timezoneTo = dateTozone.getTimezoneOffset() * 60 * 1000;

        var NewValueOfTime = taketimeOf(Roundsstat) + timezoneof //
        if (isNaN(NewValueOfTime)) NewValueOfTime = 0;
        var NewValueToTime = taketimeTo(Roundsstat) + timezoneTo //
        if (isNaN(NewValueToTime)) NewValueToTime = 0;

        var gameId = Roundsstat.elements.gameId.value;
        if (gameId == "") {
            gameId = 0;
        }

        var mode = Roundsstat.elements.Roundtype.value;



        var pagenumbervalue = navigationTableRounds.getElementsByClassName('pagenumber')[0].value;
        var startlist = ((pagenumbervalue - 1) * show) + 1;
        if (startindex) {
            indexstart = startindex;
        } else {
            indexstart = startlist;
        }
        if (sessionid) {
            roundsurl = sessionid;
        } else {
            roundsurl = sessioninputR.value;
        }

        $.ajax({
            url: url + "getRound" + "&sId=" + roundsurl + "&cId=" + cId + "&startDate=" + NewValueOfTime + "&stopDate=" + NewValueToTime + "&turn&start=" + indexstart + "&step=" + show + '&sCode=' + gameId + '&uId=' + userId +"&mode="+mode,
            dataType: 'JSON',
            success: function(data) {
                console.log(data);
                if (data.error) {
                    alert(data.error)
                    return;
                }
                if (data.info == undefined) {
                    alert("Not found")
                    return;
                }
                var newobj = data.info;
                firstitem = pagenumbervalue;
                var total = data.totalinfo;
                makeRoundsObjForNew(data, firstitem, navigationTableRounds);
                // makeTotalRoundStatistic(total);


            }
        })
    }



    function makeTotalRoundStatistic(obj) {
        var table = document.getElementById('finalRoundstable');
        table.innerHTML = "";
        var tr = document.createElement('tr');

        var betcoinsTd = document.createElement('td');
        var wincoinsTd = document.createElement('td');
        var incomecoinsTd = document.createElement('td');
        var backcoinsTd = document.createElement('td');
        var betcashTd = document.createElement('td');
        var wincashTd = document.createElement('td');
        var currensyTd = document.createElement('td');
        var icomecashTd = document.createElement('td');
        var backcashTd = document.createElement('td');

        betcoinsTd.innerHTML = obj.totalBetCoins;
        wincoinsTd.innerHTML = obj.totalWinCoins;
        incomecoinsTd.innerHTML = obj.incomeCoins;
        backcoinsTd.innerHTML = obj.backCoins;
        betcashTd.innerHTML = obj.totalBetCash;
        wincashTd.innerHTML = obj.totalWinCash;
        currensyTd.innerHTML = obj.currency;
        icomecashTd.innerHTML = obj.incomeCash;
        backcashTd.innerHTML = obj.backCash;

        tr.appendChild(betcoinsTd);
        tr.appendChild(wincoinsTd);
        tr.appendChild(incomecoinsTd);
        tr.appendChild(backcoinsTd);
        tr.appendChild(betcashTd);
        tr.appendChild(wincashTd);
        tr.appendChild(currensyTd);
        tr.appendChild(icomecashTd);
        tr.appendChild(backcashTd);

        table.appendChild(tr);

    };

//process
    function makeRoundsObjForNew(obj, first, target) {
        var objSize = obj.count;
        RoundsIn.innerHTML = "";
        firstitem = first;
        var newObj = obj.info;
        console.log(newObj)
        var show = Roundsstat.elements.show.value; //указатель на размер отображения по .... 50, 100....
        var start = EditNavpanell(obj, first, target,show)

        for (var index = 0; index < newObj.length; index++) {
            var index1 = index;
            var index2 = start + index;
            constractRoundsTableNew(newObj[index1], index2);
        }

    }



    ///////функция отрисовки таблицы раундов

    ///// новый вариант
    function constractRoundsTableNew(obj, index) {
        var tr = document.createElement("tr");

        var idTd = document.createElement("td");
        var startDateTd = document.createElement("td");
        var useerTd = document.createElement("td");
        var SessionIdTd = document.createElement("td");
        var RoundidTd = document.createElement("td");
        var BetLevelTd = document.createElement("td");
        var DenominationTd = document.createElement("td");
        var BetCoinsTd = document.createElement("td");
        var WinCoinsTd = document.createElement("td");
        var BetCashTd = document.createElement("td");
        var WinCashTd = document.createElement("td");
        var CorrensyTd = document.createElement("td");
        var BonusTd = document.createElement("td");
        var EndBalanceTd = document.createElement("td");

        var datestart = new Date(Number(obj.date));

        idTd.innerHTML = index + 1;
        startDateTd.innerHTML = datestart.toLocaleString("ru", optionsdate);
        SessionIdTd.innerHTML = obj.sessionID;

        RoundidTd.innerHTML = obj.RoundID;
        RoundidTd.classList.add("clicker");
        RoundidTd.addEventListener("click", function() {

            getRoundTurn(obj.sessionID, obj.RoundID);
            roundsturns.click();
            sessioninputRT.value = obj.sessionID;
            roundIdInputRT.value = obj.RoundID;

        })
        useerTd.innerHTML = obj.userId;
        BetLevelTd.innerHTML = obj.betLevel;
        DenominationTd.innerHTML = obj.denomination;
        BetCoinsTd.innerHTML = obj.betCoins;
        WinCoinsTd.innerHTML = obj.winCoins;
        BetCashTd.innerHTML = (obj.betCash).toFixed(2);
        WinCashTd.innerHTML = (obj.winCash).toFixed(2);
        CorrensyTd.innerHTML = obj.currency;
        BonusTd.innerHTML = obj.mode;
        EndBalanceTd.innerHTML = (obj.endBalance/100).toFixed(2);


        tr.appendChild(idTd);
        tr.appendChild(startDateTd);
        tr.appendChild(useerTd);
        tr.appendChild(SessionIdTd);
        tr.appendChild(RoundidTd);
        tr.appendChild(BetLevelTd);
        tr.appendChild(DenominationTd);
        tr.appendChild(BetCoinsTd);
        tr.appendChild(WinCoinsTd);
        tr.appendChild(BetCashTd);
        tr.appendChild(WinCashTd);
        tr.appendChild(CorrensyTd);
        tr.appendChild(BonusTd);
        tr.appendChild(EndBalanceTd);

        RoundsIn.appendChild(tr);
    }



    ///функция отрисовки таблицы раундов


    ////import exel
    function initExel() {
        var sesionExel = document.getElementById("sesionExel");
        var consalExel = document.getElementById("consalExel");
        var roundExel = document.getElementById("roundExel");
        var roundTurnExel = document.getElementById("roundTurnExel");
        var currencyExel = document.getElementById("currencylExel");

        function importexel(button1, target) {
            button1.addEventListener("click", function() {
                var table = target.outerHTML;
                window.open('data:application/vnd.ms-excel,' + '\uFEFF' + encodeURIComponent(table));
            });
        }

        var ExchangTable = document.getElementById('ExchangTable');

        importexel(sesionExel, sesTable);
        importexel(consalExel, consalTable);
        importexel(roundExel, roundsTable);
        importexel(roundTurnExel, roundTurnTable)
        importexel(currencyExel, ExchangTable)
    }
    initExel();
    ////// делаем лоадер
    function loader() {
        var loader = document.getElementById("preloader1");
        loader.classList.add('open')
    }
    $(document).ajaxSend(function() {
        loader()
    });
    $(document).ajaxComplete(function() {
        var loader = document.getElementById("preloader1");
        loader.classList.remove('open')
    });


    //////////////// события раунда RoundTurnstat

    var sessioninputRT = RoundTurnstat.elements.sessionid;
    var roundIdInputRT = RoundTurnstat.elements.SessionRoundId;
    var inputSumbitRoundsTurn = document.getElementById('inputSumbitRoundsTurn');

    inputSumbitRoundsTurn.addEventListener('click', function() {
        getRoundTurn();
    })

    function getRoundTurn(sessinIDin, roundIdin) {
        var sesid;
        var rouid;
        var pagenumbervalue = navigationTableRoundsTurn.getElementsByClassName('pagenumber')[0].value;
        if (sessinIDin || roundIdin) {
            sesid = sessinIDin;
            rouid = roundIdin;
        } else {
            sesid = RoundTurnstat.elements.sessionid.value;
            rouid = RoundTurnstat.elements.SessionRoundId.value;
            if (rouid == "") {
                rouid = 1;
            }
        }
        console.log(url + "getGameSessionInfo=" + sesid + '&RoundID=' + rouid)
        $.ajax({
            url: url + "getGameSessionInfo=" + sesid + '&RoundID=' + rouid,
            dataType: 'JSON',
            success: function(data) {
                if (data.error) {
                    alert(data.error)
                    return;
                }

                var firstturn = pagenumbervalue;
                console.log(data);
                roundsTurnFor(data, firstturn, navigationTableRoundsTurn)
            }
        })


    }

    function roundsTurnFor(obj, first, target) {
        var objSize = obj.count;
        RoundsturnIn.innerHTML = "";

        var show = RoundTurnstat.elements.show.value; //указатель на размер отображения по .... 50, 100....
        var start = EditNavpanell(obj, first, target,show);
        var newObj = obj.info;
        detailArr =[];
        for (var index = start; index < newObj.length; index++) {
            var index1 = index;
            constractRoundsTurn(newObj[index1], index1);
        }
    }

    function constractRoundsTurn(obj, index) {
        var tr = document.createElement("tr");

        var idTd = document.createElement("td");
        var startDateTd = document.createElement("td");
        var turnidTd = document.createElement("td");
        var turnInfoTd = document.createElement("td");
        var BetLevelTd = document.createElement("td");
        var DenominationTd = document.createElement("td");
        var BetCoinsTd = document.createElement("td");
        var WinCoinsTd = document.createElement("td");
        var BetCashTd = document.createElement("td");
        var WinCashTd = document.createElement("td");
        var EndBalanceTd = document.createElement("td");

        var datestart = new Date(Number(obj.date));

        idTd.innerHTML = index + 1;
        turnInfoTd.innerHTML = obj.mode;

        turnidTd.innerHTML = obj.RoundTurnId;
        turnidTd.classList.add("clicker");
        detailArr.push(obj.RoundTurnId);//добавляем id для навигации turnDetails
        turnidTd.addEventListener("click", function() {
            var details_page = document.getElementById('details_page')
            details_page.value =index + 1;
            getSpin(obj.sessionID, obj.RoundTurnId);

        })
        startDateTd.innerHTML = datestart.toLocaleString("ru", optionsdate);
        BetLevelTd.innerHTML = obj.betLevel;
        DenominationTd.innerHTML = obj.denomination;
        BetCoinsTd.innerHTML = obj.betCoins;
        WinCoinsTd.innerHTML = obj.winCoins;
        BetCashTd.innerHTML = (obj.betCash).toFixed(2);
        WinCashTd.innerHTML = (obj.winCash).toFixed(2);
        EndBalanceTd.innerHTML = obj.endBalance;


        tr.appendChild(idTd);
        tr.appendChild(startDateTd);
        tr.appendChild(turnidTd);
        tr.appendChild(turnInfoTd);
        tr.appendChild(BetLevelTd);
        tr.appendChild(DenominationTd);
        tr.appendChild(BetCoinsTd);
        tr.appendChild(WinCoinsTd);
        tr.appendChild(BetCashTd);
        tr.appendChild(WinCashTd);
        // tr.appendChild(EndBalanceTd);

        RoundsturnIn.appendChild(tr);
    }

    ///////consalstatistic /// global
    var consalform = document.forms.ConsalidStatistic;
    var getbutton = document.getElementById('globalGet');
    getbutton.addEventListener('click', function(e) {
        e.preventDefault();
        getGlobal();
    })


    var activeGame = document.getElementById('gameconsal');
    var activeCasino = document.getElementById('casinoconsal');
    var gamecasinoTH = document.getElementById('gamecasinoth');
    var consalIn = document.getElementById('consalIn');
    var baseCurrensyWrapper =document.getElementById('baseCurrensyWrapper');

    var casinoGlobal;
    var gameGlobal;

    var globalURL = 'casino';

    function ActiveGame() {
        if (!activeGame.classList.contains('active')) {
            activeGame.classList.add('active');
            activeCasino.classList.remove('active');
            gamecasinoTH.innerHTML = "Game";
            globalURL = 'game';
            baseCurrensyWrapper.classList.add('hide');
        }
    }

    function ActiveCasino() {
        if (!activeCasino.classList.contains('active')) {
            activeCasino.classList.add('active');
            activeGame.classList.remove('active');
            gamecasinoTH.innerHTML = "Casino";
            globalURL = 'casino';
            baseCurrensyWrapper.classList.remove('hide');
        }
    }

    activeGame.addEventListener('click', function() {
        ActiveGame();

        if (gameGlobal) {
            var pagenumber = navigationTableSession.getElementsByClassName('pagenumber')[0];
            var pagenumbervalue = Number(pagenumber.value);
            firstconsal = pagenumbervalue;
            var currencyObj = gameGlobal.currency.info;
            makeGlobalcurrency(currencyObj);
            var newObj = gameGlobal.info;
            makeGlobal(newObj, firstconsal, navigationConsalTable)
        }

    })
    activeCasino.addEventListener('click', function() {
        ActiveCasino();

        if (casinoGlobal) {
            var pagenumber = navigationTableSession.getElementsByClassName('pagenumber')[0];
            var pagenumbervalue = Number(pagenumber.value);
            firstconsal = pagenumbervalue;
            var currencyObj = casinoGlobal.currency.info;
            makeGlobalcurrency(currencyObj);
            var newObj = casinoGlobal.info;
            makeGlobal(newObj, firstconsal, navigationConsalTable)
        }

    })




    function getGlobal() {
        var sesurl;
        var pagenumber = navigationTableSession.getElementsByClassName('pagenumber')[0];
        var pagenumbervalue = Number(pagenumber.value);
        var show = ConsalidStatistic.elements.show.value;
        var currency = ConsalidStatistic.elements.currency.value;
        var cId = ConsalidStatistic.elements.casinoId.value; //инпут казино id
        var gameId = ConsalidStatistic.elements.gameId.value;

        var gameId = ConsalidStatistic.elements.gameId.value;
        if (gameId == "") {
            gameId = 0;
        }

        var spinsFrom = ConsalidStatistic.elements.spinsFrom.value;
        if (spinsFrom == "") {
            spinsFrom = 0;
        }
        var spinsTo = ConsalidStatistic.elements.spinsTo.value;
        if (spinsTo == "") {
            spinsTo = 9999999;
        }
        var userId = ConsalidStatistic.elements.userId.value;

        var status = getStatus(ConsalidStatistic);

        // вычесляем локальную тайм зону для стартового и финального указателя времени
        var dateOfzone = new Date(taketimeOf(ConsalidStatistic));
        var timezoneof = dateOfzone.getTimezoneOffset() * 60 * 1000;;

        var dateTozone = new Date(taketimeTo(ConsalidStatistic));
        var timezoneTo = dateTozone.getTimezoneOffset() * 60 * 1000;;

        var NewValueOfTime = taketimeOf(ConsalidStatistic) + timezoneof //
        if (isNaN(NewValueOfTime)) NewValueOfTime = 0;
        var NewValueToTime = taketimeTo(ConsalidStatistic) + timezoneTo //
        if (isNaN(NewValueToTime)) NewValueToTime = 0;


        $.ajax({
            url: url + "getGlobal=" + globalURL + '&roundMin=' + spinsFrom + "&roundMax=" + spinsTo + '&cId=' + cId + '&sCode=' + gameId + "&isActive=" + status + '&currency=' + currency + '&startDate=' + NewValueOfTime + "&stopDate=" + NewValueToTime + '&uId=' + userId+"&baseCurr=",
            dataType: 'JSON',
            success: function(data) {
                if (data.error) {
                    alert(data.error)
                    return;
                }
                if (globalURL == 'game') { //сохраняем ответ в обьект
                    gameGlobal = data;
                } else if (globalURL == 'casino') {
                    casinoGlobal = data;
                }

                firstconsal = pagenumbervalue;
                console.log(data);
                var currencyObj = data.currency.info;
                makeGlobalcurrency(currencyObj);
                var newObj = data.info;
                makeGlobal(newObj, firstconsal, navigationConsalTable)
                if(data.currency.baseCurrency != undefined){
                    if(data.currency.baseCurrency.info != undefined){
                        var baseCurrency = data.currency.baseCurrency.info;
                        makeGlobalBasseCurrency(baseCurrency);
                    }
                }

            }
        })
    }
    var consalCurrencyIn = document.getElementById('consalCurrencyIn');
    var baseCurrencyIn = document.getElementById('baseCurrencyIn');

    function makeGlobalBasseCurrency(obj) {
        baseCurrencyIn.innerHTML = "";
        obj.forEach(function(item, index) {
            constractBasecurrency(item, index);
        })
    }
    function constractBasecurrency(obj, index) {
        var tr = document.createElement('tr');



        var numberTd = document.createElement('td');
        var casinoTd = document.createElement('td');
        var usersTd = document.createElement('td');
        var gamesTd = document.createElement('td');
        var roundsTd = document.createElement('td');
        var sessionsTd = document.createElement('td');
        var incomCoinsTd = document.createElement('td');
        var betCoinsTd = document.createElement('td');
        var winCoinsTd = document.createElement('td');
        var backCoinsTd = document.createElement('td');
        var incomeCashTd = document.createElement('td');
        var betCashTd = document.createElement('td');
        var winCashTd = document.createElement('td');
        var baseCurrensyTd = document.createElement('td');
        var backCashTd = document.createElement('td');



        numberTd.innerHTML = index + 1;
        casinoTd.innerHTML = obj.casino;
        if(obj.users || obj.users==0) usersTd.innerHTML = obj.users;
        if(obj.games || obj.games==0) gamesTd.innerHTML = obj.games;
        if(obj.rounds || obj.rounds==0) roundsTd.innerHTML = obj.rounds;
        if(obj.sessions || obj.sessions==0) sessionsTd.innerHTML = obj.sessions;
        if(obj.incomeCoins || obj.incomeCoins==0)incomCoinsTd.innerHTML = obj.incomeCoins;
        if(obj.totalBetCoins || obj.totalBetCoins==0)betCoinsTd.innerHTML = obj.totalBetCoins;
        if(obj.totalWinCoins || obj.totalWinCoins==0)winCoinsTd.innerHTML = obj.totalWinCoins;
        if(obj.backCoins || obj.backCoins==0)backCoinsTd.innerHTML = obj.backCoins;
        if(obj.incomeCash || obj.incomeCash==0)incomeCashTd.innerHTML = obj.incomeCash;
        if(obj.totalBetCash || obj.totalBetCash==0)betCashTd.innerHTML = obj.totalBetCash;
        if(obj.totalWinCash || obj.totalWinCash==0)winCashTd.innerHTML = obj.totalWinCash;
        if(obj.currency || obj.currency==0)baseCurrensyTd.innerHTML = obj.currency;
        if(obj.backCash || obj.backCash==0)backCashTd.innerHTML = obj.backCash;




        tr.appendChild(numberTd);
        tr.appendChild(casinoTd);
        tr.appendChild(usersTd);
        tr.appendChild(gamesTd);
        tr.appendChild(sessionsTd);
        tr.appendChild(roundsTd);
        tr.appendChild(betCoinsTd);
        tr.appendChild(winCoinsTd);
        tr.appendChild(incomCoinsTd);
        tr.appendChild(backCoinsTd);
        tr.appendChild(betCashTd);
        tr.appendChild(winCashTd);
        tr.appendChild(incomeCashTd);
        tr.appendChild(backCashTd);
        tr.appendChild(baseCurrensyTd);

        baseCurrencyIn.appendChild(tr)
    }


    function makeGlobalcurrency(obj) {
        consalCurrencyIn.innerHTML = "";
        obj.forEach(function(item, index) {
            constractGlobalcurrency(item, index);
        })
    }

    function constractGlobalcurrency(obj, index) {
        var tr = document.createElement('tr');



        var numberTd = document.createElement('td');
        var sessionsTd = document.createElement('td');
        var roundsTd = document.createElement('td');
        var usersTd = document.createElement('td');
        var totalbetTd = document.createElement('td');
        var totalwinTd = document.createElement('td');
        var incomeTd = document.createElement('td');
        var currensyTd = document.createElement('td');
        var payoutTd = document.createElement('td');


        numberTd.innerHTML = index + 1;
        sessionsTd.innerHTML = obj.sessions;
        roundsTd.innerHTML = obj.rounds;
        usersTd.innerHTML = obj.users;
        totalbetTd.innerHTML = obj.totalBetCash.toFixed(2);
        totalwinTd.innerHTML = obj.totalWinCash.toFixed(2);
        incomeTd.innerHTML = obj.incomeCash.toFixed(2);
        currensyTd.innerHTML = obj.currency;
        payoutTd.innerHTML = obj.backCash;

        tr.appendChild(numberTd);
        tr.appendChild(sessionsTd);
        tr.appendChild(roundsTd);
        tr.appendChild(usersTd);
        tr.appendChild(totalbetTd);
        tr.appendChild(totalwinTd);
        tr.appendChild(incomeTd);
        tr.appendChild(currensyTd);
        tr.appendChild(payoutTd);

        consalCurrencyIn.appendChild(tr)

    }

    function makeGlobal(obj, first, target) {
        consalIn.innerHTML = "";
        // firstconsal = first + 1;
        console.log(target);
        var show = ConsalidStatistic.elements.show.value;
        var pagenumber = target.getElementsByClassName('pagenumber')[0]; //номер страницы
        var showNow = target.getElementsByClassName('showNow')[0]; // текущие строки
        var showAll = target.getElementsByClassName('showpage')[0]; // всего строк
        var allpages = target.getElementsByClassName('allpages')[0]; // всего страниц
        var last = (first * show);
        var size = obj.length;
        navobj[target] = {};
        navobj[target].size = Math.ceil(size / show); // получаем число страниц и сохраняем в обьект навигации
        // console.log(navobj);
        if (last > size) {
            last = size;
        }
        var start = (first - 1) * show;

        allpages.innerHTML = navobj[target].size;
        showNow.innerHTML = Number(start + 1) + "-" + last;
        showAll.innerHTML = size;
        for (var index = start; index < obj.length; index++) {
            var index1 = index;
            constractConsalTable(obj[index1], index1);
        }
        //var elem =document.getElementById('sessionTableId');
        //var itis =elem.outerHTML;
        //
        //window.open('data:application/vnd.ms-excel; UNICODE,' + encodeURIComponent(itis));

    }

    function constractConsalTable(obj, index) {


        var tr = document.createElement('tr');



        var numberTd = document.createElement('td');
        var gameTd = document.createElement('td');
        var sessionsTd = document.createElement('td');
        var roundsTd = document.createElement('td');
        var usersTd = document.createElement('td');
        var totalbetTd = document.createElement('td');
        var totalwinTd = document.createElement('td');
        var incomeTd = document.createElement('td');
        var currensyTd = document.createElement('td');
        var payoutTd = document.createElement('td');


        numberTd.innerHTML = index + 1;

        if (globalURL == "game") {
            gameTd.innerHTML = obj.game;
        } else if (globalURL == 'casino') {
            gameTd.innerHTML = obj.casino;
        }

        sessionsTd.innerHTML = obj.sessions;
        roundsTd.innerHTML = obj.rounds;
        usersTd.innerHTML = obj.users;
        totalbetTd.innerHTML = obj.totalBetCash.toFixed(2);
        totalwinTd.innerHTML = obj.totalWinCash.toFixed(2);
        incomeTd.innerHTML = obj.incomeCash.toFixed(2);
        currensyTd.innerHTML = obj.currency;
        payoutTd.innerHTML = obj.backCash;

        tr.appendChild(numberTd);
        tr.appendChild(gameTd);
        tr.appendChild(sessionsTd);
        tr.appendChild(roundsTd);
        tr.appendChild(usersTd);
        tr.appendChild(totalbetTd);
        tr.appendChild(totalwinTd);
        tr.appendChild(incomeTd);
        tr.appendChild(currensyTd);
        tr.appendChild(payoutTd);

        consalIn.appendChild(tr)
    }


    /////////Exchang currency  валюты
    var SetExchang = document.getElementById('SetExchang'); ////кнопка отправки запроса на курс валют
    var currencyThead = document.getElementById('currencyThead'); //// заголовок для списка валют.
    var currencyin = document.getElementById('currencyin'); /// сюда выгружаем результаты


    SetExchang.addEventListener('click', function(e) {
        var currency = CurrencyExchange.elements.currency.value;
        e.preventDefault();
        currencyin.innerHTML = "";
        getExchang(currency);
    })




    function getExchang(value) {
        console.log(value)
        $.ajax({
            url: url + "getCurrency" + "&baseCurr=" + value,//+'&currency={"currency":["UAH","USD","RUB","EUR"]}',
            dataType: 'JSON',
            type: 'GET',
            success: function(data) {
                console.log(data)
                buildExchangTH(data);
                buildExchangTBody(data)
            }
        })
    }
    //// отрисовываем th
    function buildExchangTH(obj) {
        var newObj = obj.info;
        var currencyTr = document.getElementById('currencyTr');
            currencyThead.innerHTML="";
            var tr1 = document.createElement('tr');
            tr1.id = 'currencyTr';
            for (var key in newObj[0]) {
                var th = document.createElement('th');
                th.innerHTML = key;
                tr1.appendChild(th);
            }
            currencyThead.appendChild(tr1);

    }
    // отрисовываем таблицу валют

    function buildExchangTBody(obj) {

        var newObj = obj.info;
        for(var i = 0;i<newObj.length; i++){
            var date = newObj[i]["date"]
            var newdate = new Date(date*1000);
            var dateAdd = newObj[i]["dateAdd"]
            var newdateAdd = new Date(dateAdd*1000);
            var tr1 = document.createElement('tr');
            newObj[i]["date"] =  newdate.toLocaleString("ru", optionsdate);
            newObj[i]["dateAdd"] =  newdateAdd.toLocaleString("ru", optionsdate);
            for (var key in newObj[i]) {
                var td = document.createElement('td');
                td.innerHTML = newObj[i][key];
                tr1.appendChild(td);
            }

            currencyin.appendChild(tr1);

        }
        var a = checkfunction();

    }

    /////////////////user Statistic



    var inputSumbitUsers = document.getElementById('inputSumbitUsers');
    inputSumbitUsers.addEventListener('click', function(e) {
        e.preventDefault();
        getUsers();
    })

    function getUsers(startindex) {
        var indexstart;
        var show = Userstat.elements.show.value;
        var pagenumbervalue = navigationUsers.getElementsByClassName('pagenumber')[0].value;
        var startlist = ((pagenumbervalue - 1) * show) + 1;
        if (startindex) {
            indexstart = startindex;
        } else {
            indexstart = startlist;
        }

        var casinoId = document.getElementById('casinoUserId').value;
        var usersUrl;
        if (casinoId == 0) usersUrl = "getCasinoUser&all";
        else {
            usersUrl = 'getCasinoUser&cid=' + casinoId;
        }


        $.ajax({
            url: url + usersUrl+"&start=" + indexstart + "&step=" + show,
            dataType: 'JSON',
            type: 'GET',
            success: function(data) {
                if (data.error) {
                    alert(data.error)
                    return;
                }
                firstuser = pagenumbervalue;
                console.log(data);
                userMake(data, pagenumbervalue,  navigationUsers)

            }
        })
    }
    //work
    function userMake(obj, first, target) {

        var show = Userstat.elements.show.value; //указатель на размер отображения по .... 50, 100....

        var start = EditNavpanell(obj, first, target,show)
        UserIn.innerHTML = "";
        var Newobj = obj.info;
        for (var i = 0; i < Newobj.length; i++) {
            var index1 = i;
            var index2 = start + index1;
            makeUserTable(Newobj[index1], index2)
        }

    }
    function EditNavpanell(obj, first, target, show) {
        var newObj = obj.info;
        var objSize = obj.count;
        var pagenumber = target.getElementsByClassName('pagenumber')[0]; //номер страницы
        var showNow = target.getElementsByClassName('showNow')[0]; // текущие строки
        var showAll = target.getElementsByClassName('showpage')[0]; // всего строк
        var allpages = target.getElementsByClassName('allpages')[0]; // всего страниц
        var last = (first * show);
        var size = objSize;
        navobj[target] = {};
        navobj[target].size = Math.ceil(size / show); // получаем число страниц и сохраняем в обьект навигации
        // console.log(navobj);
        if (last > size) {
            last = size;
        }
        var start = (first - 1) * show;

        allpages.innerHTML = navobj[target].size;
        showNow.innerHTML = Number(start + 1) + "-" + last;
        showAll.innerHTML = size;
        return start;
    }

    function makeUserTable(obj, index) {

        var table = UserIn;

        var tr = document.createElement("tr");

        var idTd = document.createElement('td');
        var useridTd = document.createElement('td');
        var casinoTd = document.createElement('td');
        var startdateTd = document.createElement('td');
        var currencyTd = document.createElement('td');

        idTd.innerHTML = index + 1;
        useridTd.innerHTML = obj.uid;
        useridTd.classList.add("clicker");
        useridTd.onclick = function(e) { ///// назначаем кнопки на переход к сессии по юзуру
                e.preventDefault();
                var pagenumber = navigationTableSession.getElementsByClassName('pagenumber')[0];
                var sessionsreset = document.getElementById('resetSessionsFilter');
                sessionsreset.click();
                pagenumber.value = 1;

                slotsFilterForm.elements.userId.value = obj.uid;

                getSession();
                sessionstabs.click();
            }

        casinoTd.innerHTML =obj.cName;
        var datestart = new Date(Number(obj.startDate));
        startdateTd.innerHTML = datestart.toLocaleString("ru", optionsdate);

        currencyTd.innerHTML = obj.currency;

        tr.appendChild(idTd);
        tr.appendChild(useridTd);
        tr.appendChild(casinoTd);
        tr.appendChild(startdateTd);
        tr.appendChild(currencyTd);

        table.appendChild(tr);


    }
    ///////////////////////////spinStatistic


    function getSpin(sessionid, spinid) {
        console.log(detailArr);
        var spinurl;
        spinurl = url + "getGameSessionInfo=" + sessionid + '&RoundTurnId=' + spinid;

        $.ajax({
            url: spinurl,
            dataType: 'JSON',
            type: 'GET',
            success: function(data) {
                if (data.error) {
                    alert(data.error)
                    return;
                }
                line_table.innerHTML = '';
                spintable.innerHTML = '';
                console.log(data)
                var fieldArray = data.info[0];
                greateGamewindow(fieldArray);

                var shortname = fieldArray.mode.substr(0, 4);
                if (shortname == 'fsBo' || shortname == 'root') {
                    spintablefunc(fieldArray);
                }


            }


        })
    }

    ////////// отображение статистики крутки
    var closeGameSlot = document.getElementById('closeGameSlot');
    var grey_world = document.getElementById('grey_world');
    var spintable = document.getElementById('spintable');
    var line_table = document.getElementById('line_table');

    var valuebet = document.getElementById('valuebet');
    var level_bet_detail = document.getElementById('level_bet_detail');
    // var coin_value_detail = document.getElementById('coin_value_detail');
    var total_win_detail = document.getElementById('total_win_detail');
    var total_win_coins = document.getElementById('total_win_coins');
    var date_detail = document.getElementById('date_detail');
    var casino_detail = document.getElementById('casino_detail');
    var user_detail = document.getElementById('user_detail');
    var game_detail = document.getElementById('game_detail');
    var session_detail = document.getElementById('session_detail');
    var round_detail = document.getElementById('round_detail');
    var turn_detail = document.getElementById('turn_detail');
    var denomination_detail = document.getElementById('denomination_detail');
    var endBalance_detail = document.getElementById('endBalance_detail');
    var freeSpinsWin = document.getElementById('free_spins_win');

    ////переменные области fs bonusa

    var count_fs = document.getElementById('count_fs');
    var level_fs = document.getElementById("level_fs");
    var multi_fs = document.getElementById("multi_fs");
    var total_cash_fs = document.getElementById("total_cash_fs");
    var total_coins_fs = document.getElementById("total_coins_fs");


    closeGameSlot.addEventListener('click', function() {
        grey_world.classList.remove('open');
    })

    function greateGamewindow(field) {
        var gameSlotWrapper = document.getElementById('gameSlotWrapper')
        var sizeRoundtetails = gameSlotWrapper.getElementsByClassName('allpages')[0];
        sizeRoundtetails.innerHTML= detailArr.length;
        grey_world.classList.add('open');

        valuebet.innerHTML = field.betCash.toFixed(2);
        level_bet_detail.innerHTML = field.betLevel;
        // coin_value_detail.innerHTML = field.details.Balance.CoinValue;
        total_win_detail.innerHTML = field.winCash.toFixed(2);
        if(field.details) total_win_coins.innerHTML = field.details.Balance.TotalWinCoins;

        var date_detailValue = new Date(Number(field.date))
        var gameshort = field.game.substr(0, 3);

        date_detail.innerHTML = date_detailValue.toLocaleString("ru", optionsdate);
        casino_detail.innerHTML = field.casinoId;
        user_detail.innerHTML = field.userId;
        game_detail.innerHTML = field.game;
        session_detail.innerHTML = field.sessionID;
        round_detail.innerHTML = field.roundID;
        turn_detail.innerHTML = field.RoundTurnId;
        denomination_detail.innerHTML = field.denomination/100;
        if(field.details){
             endBalance_detail.innerHTML = (field.details.Balance.ScoreCents / 100).toFixed(2);
             if (field.details.FsBonus && field.details.FsBonus != null) {
                 $(".fsbonus").css("display", 'block')
                 count_fs.innerHTML = field.details.FsBonus.CountFS;
                 level_fs.innerHTML = field.details.FsBonus.Level;
                 multi_fs.innerHTML = " X " + field.details.FsBonus.Multi;
                 freeSpinsWin.innerHTML = field.details.FreeSpinsWin;
                 total_cash_fs.innerHTML = (field.details.FsBonus.TotalFSWinCents / 100).toFixed(2);
                 total_coins_fs.innerHTML = field.details.FsBonus.TotalFSWinCoins;
             } else {
                 $(".fsbonus").css("display", 'none')
             }
             if (field.details.Screen) {

                 for (var i = 1; i < field.details.Screen.length - 1; i++) {

                     var newvar = field.details.Screen[i];
                     createTr(newvar);
                 }
             } else if (field.details.CurrentValue) {
                 console.log(field.details.CurrentValue);
                 var tr = document.createElement("tr");
                 var imgtd = document.createElement("td");
                 var valueTd = document.createElement("td");
                 var winTd = document.createElement("td");
                 var img = document.createElement('img');

                 img.src = 'http://gameservice.bossgs.org/img/' + gameshort + '/' + getname() + ".png";
                 valueTd.innerHTML = "Current Value" + field.details.CurrentValue;
                 winTd.innerHTML = field.winCash.toFixed(2) + " " + field.currency;
                 imgtd.appendChild(img);


                 tr.appendChild(imgtd);
                 tr.appendChild(valueTd);
                 tr.appendChild(winTd);
                 spintable.appendChild(tr);


                 function getname() {
                     var modeName = field.details.Mode;
                     console.log(modeName)
                     var name = modeName.replace(/[0-9]/, "");
                     return name;
                 }
                 getname()
             }

        }
        $(".currensy_detail").text(field.currency);






        //отрисовка линий барабана.
        function createTr(elem) {

            var tr = document.createElement("tr");

            for (var j = 0; j < elem.length; j++) {
                var td = document.createElement("td");
                var img = document.createElement('img');
                img.src = 'http://gameservice.bossgs.org/img/' + gameshort + '/' + elem[j] + ".png";
                td.appendChild(img);
                tr.appendChild(td);
            }
            spintable.appendChild(tr);
        }

    }

    ///////таблица выиграшных линий или бонусов.

    function spintablefunc(elem) {
        var item = elem.details;
        console.log(item)
        var arr = item.WinLines;
        var denomination = Number(elem.denomination);
        line_table.innerHTML = "";
        var multi;
        if (item.FsBonus && item.FsBonus != null) {
            multi = item.FsBonus.Multi;
        } else {
            multi = "";
        }
        arr.forEach(function(item, i) {
            spinLineTable(item);
        })


        function spinLineTable(obj) {
            var tr = document.createElement('tr');

            var LineNumberTd = document.createElement('td');
            var LineTd = document.createElement('td');
            var WinSymbolsTd = document.createElement('td');
            var WinCashTd = document.createElement('td');

            var img = document.createElement('img');

            img.src = "http://gameservice.bossgs.org/img/lines/" + obj.Line + ".png";
            LineTd.appendChild(img);

            LineNumberTd.innerHTML = obj.Line;
            WinSymbolsTd.innerHTML = obj.Count + " of " + obj.Name;
            var winvalue =(obj.Win / 100).toFixed(2) * denomination;
            if(multi >0){
                WinCashTd.innerHTML = winvalue +" x "+ multi +" = " + winvalue*Number(multi);
            }
            else{
                WinCashTd.innerHTML = winvalue;
            }


            tr.appendChild(LineNumberTd);
            tr.appendChild(LineTd);
            tr.appendChild(WinSymbolsTd);
            tr.appendChild(WinCashTd);

            line_table.appendChild(tr);

        }

    }



    ///////функция очистки таблиц.   чистить все таблицы своего таба
    function cleartablefunc() {
        var clearbuttonArr = document.getElementsByClassName('cleartable');

        for (var i = 0; i < clearbuttonArr.length; i++) {
            (function() {
                var a = i;
                clearbuttonArr[a].addEventListener('click', function() {
                    var targetAtribut = clearbuttonArr[a].getAttribute('cleartab');
                    console.log(targetAtribut);
                    var tagettab = document.getElementById('tabs-' + targetAtribut);
                    var table = tagettab.getElementsByTagName('tbody');
                    var pagenumber = tagettab.getElementsByClassName('pagenumber')[0]; //номер страницы
                    var showNow = tagettab.getElementsByClassName('showNow')[0]; // текущие строки
                    var showAll = tagettab.getElementsByClassName('showpage')[0]; // всего строк
                    var allpages = tagettab.getElementsByClassName('allpages')[0]; // всего страниц

                    pagenumber.value = 1;
                    showNow.innerHTML = 1;
                    showNow.innerHTML = '1-1';
                    showAll.innerHTML = 1;
                    allpages.innerHTML = 1;
                    console.log(table)
                    for (var j = 0; j < table.length; j++) {
                        table[j].innerHTML = "";
                    }
                })
            }())

        }

    }
    cleartablefunc();
});
