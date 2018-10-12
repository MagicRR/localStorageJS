
$(document).ready(function(){
    window.onbeforeunload = function (e) {

    };

    if(typeof localStorage != 'undefined'){
        if('message' in localStorage){

            document.getElementById('message').value = localStorage.getItem('message');
        }

        var nbvisites = localStorage.getItem('visites');

        if( nbvisites != null ){
          nbvisites = parseInt(nbvisites);
        }
        else{
          nbvisites = 1;
        }

        nbvisites++;

        localStorage.setItem('visites', nbvisites);

        // document.getElementById('visites').innerHTML = nbvisites;
        console.log("Nombre de visites : "+localStorage.visites);

        $('#save').click(function(){

            revisions = JSON.parse(localStorage.getItem('revisions'));

            if( revisions != null ){
                revisions.push({message: localStorage.getItem('message')});
                console.log(revisions);

            }else{
                revisions = [{message: localStorage.getItem('message') }];
            }

            localStorage.setItem('revisions',JSON.stringify(revisions));
        });

    }
    else
    {
      alert("localStorage n'est pas supporté");
    }

});
