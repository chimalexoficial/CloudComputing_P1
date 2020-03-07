let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('previous');

$(document).ready(function () {
  $("#version").html("v0.14");

  $("#searchbutton").click(function (e) {
    displayModal();
  });

  $("#searchfield").keydown(function (e) {
    if (e.keyCode == 13) {
      displayModal();
    }
  });

  function displayModal() {
    $("#myModal").modal('show');
    $("#status").html("Searching...");
    $("#dialogtitle").html("Search for: " + $("#searchfield").val());
    $("#previous").hide();
    $("#next").hide();
    $.getJSON('/search/' + $("#searchfield").val(), function (data) {
      renderQueryResults(data);
    });
  }

  function renderQueryResults(data) {
    if (data.error != undefined) {
      $("#status").html("Error: " + data.error);
    } else {
      numOfImages = [];
      numOfImages = data.results;

      $("#status").html("" + data.num_results + " result(s)");

      for (let i = 0; i < 1; i++) {
        console.log('Entro al for ' + numOfImages[i]);
        let img = document.getElementById('img0');
        img.src = numOfImages[i]
        console.log('Encontradas ' + data.num_results);
  
          nextBtn.style.display = 'unset'; //mostrar next al inicio
          if(data.num_results == 0) {
            nextBtn.style.display = 'none'
            alert('Encontradas ' + data.num_results);
          }
          nextBtn.onclick = function () { //cuando se de click en next
            i++
            console.log('Next. El valor de i es ' + i);
            console.log('Data results ' + (data.num_results));
            console.log(numOfImages.length-1);

            if (i < data.num_results) { //si la posicion es menor al numero encontrado de imagenes
              prevBtn.style.display = 'unset' //mostrar previous
              //let img2 = document.createElement('img');
              //img2.setAttribute('src', numOfImages[i+1])
              //img.body.appendChild(img2);
              //img.src = numOfImages[i]
              img.src = numOfImages[i]
            } 
            if(i == numOfImages.length-1) {
              nextBtn.style.display = 'none' //mostrar previous
            }
          }
          prevBtn.onclick = function () {
            i--;
            console.log('El valor de i es '+i);
            img.src = numOfImages[i]
            console.log('Disminuyendo pos ' + pos);
            if (i == 0) {
              prevBtn.style.display = 'none'
              nextBtn.style.display = 'unset'
              img.src = numOfImages[i]
            } else {
              nextBtn.style.display = 'unset'
              img.src = numOfImages[i]
            }
          }
      }
    }
  }
});