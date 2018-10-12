
$(document).ready(function(){

    window.onbeforeunload = function (e) {

    };

    if(typeof localStorage != 'undefined'){

        var revisions = JSON.parse(localStorage.getItem('revisions'));

        if( revisions != null ){
            for( var i = 0; i < revisions.length; i++){
                $('#select_revision').append(new Option( i+1, revisions[i] ));
            }
        }

        $('#save').click(function(){

            var revisions = JSON.parse(localStorage.getItem('revisions'));

            if( revisions != null ){
                revisions.push({message: localStorage.getItem('message')});
                console.log(revisions);

            }else{
                revisions = [{message: localStorage.getItem('message') }];
            }

            localStorage.setItem('revisions',JSON.stringify(revisions));

            $('#select_revision').append(new Option( revisions.length, revisions.length ));

        });

        $('#load').click(function(){
            var revisions = JSON.parse(localStorage.getItem('revisions'));
            var id_revision = $('#select_revision option:selected').text();
            console.log(revisions);
            console.log(revisions[id_revision-1].message);
            $('#message').val(revisions[id_revision-1].message);
        });

    }else{
      alert("localStorage n'est pas supporté");
    }

});
