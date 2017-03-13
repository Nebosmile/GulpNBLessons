window.addEventListener('load', function() {

    ///////admin panel
    var admin = document.getElementsByClassName('adm_panel ')[0];
    var adm_ul = document.getElementsByClassName('adm_ul ')[0];

    admin.addEventListener('click',function () {
        if(adm_ul.classList.contains('hide')){
            adm_ul.classList.remove('hide');
        }else{
            adm_ul.classList.add('hide');
        }

    })

    ////////settings
    var settingsButton = document.getElementsByClassName('settings_panel ')[0];
    var settings = document.getElementById('settings');

    var setingsOut = document.getElementById('setingsOut');

    settingsButton.addEventListener('click',function () {

        chekSettings();

    })
    setingsOut.addEventListener('click', function () {
        chekSettings();
    })
    function chekSettings() {
        if(settings.classList.contains('hide')){
            settings.classList.remove('hide');
        }else{
            settings.classList.add('hide');
        }
    }




})
