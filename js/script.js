
$(document).ready(function(){
    window.onbeforeunload = function (e) {

    };

    if(typeof localStorage != 'undefined'){
        if('message' in localStorage){
            // alert("Message récupéré");
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
        console.log(localStorage.visites);

        $('#save').click(function(){

            var revisions;

            if( null != localStorage.getItem( JSON.stringify('revisions')) ){
                revisions = localStorage.getItem( JSON.stringify('revisions'));
                revisions.revisions++;

            }else{
                revisions = {
                    revisions : 1
                };
            }

            console.log(revisions.revisions);


            localStorage.setItem('revisions',JSON.stringify(revisions));
        });

    }
    else
    {
      alert("localStorage n'est pas supporté");
    }

});
