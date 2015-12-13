//Ключ яндекс переводчик api: trnsl.1.1.20151203T105730Z.b6879c994147a042.e10af0f1c1eb216c9e3382ce2b66e29cdeba135a

$(document).ready(function(){

  $(".word").attr('contenteditable','true');
  $(".word").attr('spellcheck','true');

  $(".del").click(function(e){
    e.preventDefault();
    $(this).closest('tr').remove();
  });

  $("#addWord").click(function(){
    $("tbody")[0].innerHTML+="<tr> <td class='word'>Enter new word</td> <td class='word'>Введите новое слово</td> <td><button class='del'>Удаление</button></td> </tr>";
    $(".word").attr('contenteditable','true');
    $(".word").attr('spellcheck','true');
    $(".del").click(function(e){
      e.preventDefault();
      $(this).closest('tr').remove();
    });
  });

  $("html").click(function(){
          text = document.getSelection();
          if (text!='') {
              $.ajax({
                  type: "POST",
                  url: 'https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20151203T105730Z.b6879c994147a042.e10af0f1c1eb216c9e3382ce2b66e29cdeba135a&text=' + text,
                  success: function (response){
                      lang = response.lang;
                  }
              });
              if (lang == 'en'){
                  lang = 'ru';
              }
              else {
                  lang = 'en';
              }
              var link = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20151203T105730Z.b6879c994147a042.e10af0f1c1eb216c9e3382ce2b66e29cdeba135a&text=' + text + '&lang=' + lang;
              text = '';
              $.ajax({
                  type: 'GET',
                  url: link,
                  success: function (response){

                      $("#translator div div").text(response.text[0]);
                      $("#translator").show();
                      setTimeout('$("#translator").fadeOut("slow")', 1000);
                  }
              });
          }
      });

});
