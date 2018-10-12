
$(document).ready(function(){
    window.onbeforeunload = function (e) {

    };

    if(typeof localStorage!='undefined')
    {
        if('message' in localStorage)
        {
            // alert("Message récupéré");
            document.getElementById('message').value = localStorage.getItem('message');
        }

        var nbvisites = localStorage.getItem('visites');

        if(nbvisites!=null)
        {
          nbvisites = parseInt(nbvisites);
        }
        else
        {
          nbvisites = 1;
        }

        nbvisites++;

        localStorage.setItem('visites', nbvisites);

        // document.getElementById('visites').innerHTML = nbvisites;
        console.log(localStorage.visites);

    }
    else
    {
      alert("localStorage n'est pas supporté");
    }

});
