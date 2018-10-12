
$(document).ready(function(){

    window.onbeforeunload = function (e) {

    };

    if(typeof localStorage != 'undefined'){

        var revisions = JSON.parse(localStorage.getItem('revisions'));

        if( revisions != null ){
            for( var i = 0; i < revisions.length; i++){
                console.log(revisions[i].date);
                $('#select_revision').append(new Option( revisions[i].date + ' - ' + (i+1), revisions[i].date + ' - ' + (i+1) ));
            }
        }

        $('#save').click(function(){

            //Récupère l'objet révisions du localstorage
            var revisions = JSON.parse(localStorage.getItem('revisions'));

            //Définis la date courante
            var date = new Date();
            var twoDigitMonth = ( date.getMonth() > 8)? (date.getMonth()+1) : '0' + (date.getMonth()+1);
            var min = ( date.getMinutes() > 9)? (date.getMinutes()+1) : '0' + (date.getMinutes()+1);
            var currentDate = date.getHours() + ':' + min + ' - ' + date.getDate() + "/" + twoDigitMonth + "/" + date.getFullYear();

            //Si il n'existe pas d'objet révisions dans le localStorage alors on en initialise un,
            //sinon on rajoute la nouvelle sauvegarde à la suite de l'existant
            if( revisions != null ){
                revisions.push({message: localStorage.getItem('message'), date: currentDate});
            }else{
                revisions = [{message: localStorage.getItem('message'), date: currentDate}];
            }

            //On met à jour le localStorage de revisions
            localStorage.setItem('revisions',JSON.stringify(revisions));

            //On met à jours le <select> afin d'avoir la liste des révisions actualisées
            $('#select_revision').append(new Option( revisions[revisions.length-1].date + ' - ' + (revisions.length), revisions.length-1 ));

        });

        $('#load').click(function(){
            var revisions = JSON.parse(localStorage.getItem('revisions'));
            var id_revision = $('#select_revision option:selected').text();

            //Si on a plus de 22 caractères alors on garde les 2 derniers carac sinon si on est à plus on prend les 3 derniers
            if($('#select_revision option:selected').text().length <= 22 ){
                id_revision = $('#select_revision option:selected').text().substr($('#select_revision option:selected').text().length-2, $('#select_revision option:selected').text().length);
            }else if ($('#select_revision option:selected').text().length > 22){
                id_revision = $('#select_revision option:selected').text().substr($('#select_revision option:selected').text().length-3, $('#select_revision option:selected').text().length);
            }
            $('#message').val(revisions[id_revision-1].message);
        });

    }else{
      alert("localStorage n'est pas supporté");
    }

});
