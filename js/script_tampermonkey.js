// ==UserScript==
// @name         local storage
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://insta4.codegradx.org/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    window.onload = function(){

        var $ = window.jQuery;

        $(document).ready(function(){

            $('.w3-navbar').append("<button class='w3-btn w3-round-xlarge w3-theme-l2' id='save'>Save revision</button>");
            $('.w3-navbar').append("<select id='select_revision'></select>");
            $('.w3-navbar').append("<button class='w3-btn w3-round-xlarge w3-theme-l2' id='load'>Load revision</button>");

            if(typeof localStorage != 'undefined'){

                var revisions = JSON.parse(localStorage.getItem('revisions'));

                $('.fw4ex_exercise_title > a').click(function(e){
                    //On refresh la revision pour chaque changement de page.
                    var revisions = JSON.parse(localStorage.getItem('revisions'));
                    var current_exo = $(e.target).text();

                    setTimeout(function(){
                        $('#select_revision option').remove();

                        localStorage.setItem('current_excercise',current_exo);
                        localStorage.setItem('message',FW4EX.editor.getValue());

                        if( revisions != null ){

                            for( var i = 0; i < revisions.length; i++){
                                if( revisions[i].excercise == current_exo ){
                                    $('#select_revision').append(new Option( revisions[i].date + ' - ' + (i+1), revisions[i].date + ' - ' + (i+1) ));
                                }
                            }
                        }
                    },500);
                });


                $('#save').click(function(){

                    localStorage.setItem('message',FW4EX.editor.getValue());
                    var current_exo = localStorage.getItem('current_excercise');

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
                        revisions.push({message: localStorage.getItem('message'), date: currentDate, excercise: current_exo});
                    }else{
                        revisions = [{message: localStorage.getItem('message'), date: currentDate, excercise: current_exo}];
                    }

                    //On met à jour le localStorage de revisions
                    localStorage.setItem('revisions',JSON.stringify(revisions));

                    if( revisions[revisions.length-1].excercise == current_exo ){
                        //On met à jours le <select> afin d'avoir la liste des révisions actualisées
                        $('#select_revision').append(new Option( revisions[revisions.length-1].date + ' - ' + (revisions.length), revisions.length-1 ));
                    }

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
                    FW4EX.editor.setValue(revisions[id_revision-1].message);
                });

            }else{
                alert("localStorage n'est pas supporté");
            }

        });
    };
})();