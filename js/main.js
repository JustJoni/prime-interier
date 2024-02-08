
(function ($) {
    "use strict";
    var input = $('.validate-input .input100');
    var countries = new Map([
        [7, 'Россия'],
        [375, 'Белоруссия'],
        [86, 'Китай']
      ]);

    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
            if(validate(this) == false){
                showValidate(this);
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });
    
    function getCountryName(telNumber) {
        telNumber = telNumber.replaceAll('+', '')
        var countryName = 'Страна не определена';
        countries.forEach((country, telNumberPrefix) => {
            var countSNumber = telNumber.length;
            var length = 1;
            switch(countSNumber) {
                case 12:
                    length = 2;
                    break;

                case 13:
                    length = 3;
                    break;

                case 14:
                    length = 4;
                    break;
            }
            if (telNumber.substr(0,length) == telNumberPrefix) {
                countryName = country;
            }
        });

        return countryName;
    }

    function validate (input) {
        var result = true;
        var inputName = $(input).attr('name');
        var parentBlock = $('.' + inputName);
        var elemCoutry = $(".country");
        var inputText = $(input).val();
        if(inputText == '') {
            parentBlock.attr('data-validate', 'Поле должно быть заполнено');
            if ($(input).attr('type') == 'tel' || inputName == 'tel' || inputName == 'phone') {
                elemCoutry.css("display", "none");
                result = false;
            }
            result = false;
        } else if($(input).attr('type') == 'tel' || inputName == 'tel' || inputName == 'phone') {
            let regTel = /^[\+!]\d{11,14}$/;
            let telWithoutInvalidSeparators = inputText.trim().replaceAll(' ', '').replaceAll('-', '').replaceAll('(', '').replaceAll(')', '');
            if(telWithoutInvalidSeparators.match(regTel) == null) {
                parentBlock.attr('data-validate', 'Номер телефона должен быть в формате +1234567890, от 11 до 14 цифр');
                elemCoutry.css("display", "none");
                result = false;
            } else {
                let countryName = getCountryName(telWithoutInvalidSeparators);
                if (true) {

                } else {

                }
                elemCoutry.html(countryName);
                elemCoutry.css("display", "block");
            }
        } else if($(input).attr('type') == 'password') {
            let pass = $('.validate-input .password').val();
            let passRepeat = $('.validate-input .password-repeat').val();
            var eq = pass === passRepeat ? true : false;
            if (!eq) {
                parentBlock.attr('data-validate', 'Пароли не совпадают');
                result = false;
            } else if (inputText.trim().match(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) == null) {
                parentBlock.attr('data-validate', 'Минимум 8 символов, пароль должен содержать числа, строчные и заглавные буквы');
                result = false;
            }
        }

        return result;
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }


})(jQuery);