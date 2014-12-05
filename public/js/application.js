var sequence = [];
var sequence3 = [];
var sequence4=[];
var sequence5=[];
$(document).ready(function(){
  var newPlayerButton = $('#new_player');
  var newPlayerForm = $('#new_player_form')

  newPlayerButton.on('click', function(e){
    e.preventDefault();
    newPlayerForm.css('visibility', 'visible');
  });

  var click_tic_squares = function (e){
    e.preventDefault();
    if (sequence.length === sequence3.length){
      var id = $(this).attr('id');
      $(this).toggleClass("active");
      sequence.push(id);
    }else{
      var id = $(this).attr('id');
      $(this).toggleClass("active2");
      sequence3.push(id);
    }
  }
  $('ul#color_me li').on("click", click_tic_squares)

$('#done_turn').click(function(e){
  e.preventDefault();
  $('li').removeClass("active")
  $('li').removeClass("active2")
  $('#guest_turn').css("display", "none")
  $('#player_turn').css("display", "block")
  sequence4.push(sequence.toString());
  sequence4.push(sequence3.toString());
  sequence = [];
  sequence3 = [];
});

$('#end_game').click(function(e){
  e.preventDefault();
  sequence5=[]
  sequence5.push(sequence.toString());
  sequence5.push(sequence3.toString());
  sequence = [];
  sequence3 = [];

  if (sequence4.toString() === sequence5.toString()) {
    $('li').removeClass("active");
    $('li').removeClass("active2");
    $('li').addClass("winner")
    $.ajax({
      type: "POST",
      url: "/store_winner",
      success: function(e){
        $("#player_record").load(document.URL + ' #player_record');
        $('li').removeClass("winner");
        $('#guest_turn').css("display", "block");
        $('#player_turn').css("display", "none");
        sequence4=[];
      }
    });
    } else {
      $('li').removeClass("active");
      $('li').removeClass("active2");
      $('li').addClass("loser")
      $.ajax({
        type: "POST",
        url: "/store_loser",
        success: function(e){
          $("#player_record").load(document.URL + ' #player_record');
          $('li').removeClass("loser");
          $('#guest_turn').css("display", "block");
          $('#player_turn').css("display", "none");
          sequence4=[];
        }
      });
      sequence4=[];
    }
  });
  $('#tic_game_over').click(function(e){
  e.preventDefault();

  s = sequence3.toString();

  // if (s.search(1)+(s.search(5)+s.search(9)==15){
  //   // || s.search(7)+(s.search(5)+s.search(3)===15
  //   // || s.search(1)+(s.search(2)+s.search(3)===6
  //   // || s.search(4)+(s.search(5)+s.search(6)===15
  //   // || s.search(7)+(s.search(8)+s.search(9)===24
  //   // || s.search(1)+(s.search(4)+s.search(7)===12
  //   // || s.search(2)+(s.search(5)+s.search(8)===15
  //   // || s.search(2)+(s.search(5)+s.search(8)===18
  //   $('li').removeClass("active");
  //   $('li').removeClass("active2");
  //   $('li').addClass("winner")
  //   $.ajax({
  //     type: "POST",
  //     url: "/store_tic_winner",
  //     success: function(e){
  //       $("#player_record").load(document.URL + ' #player_record');
  //       $('li').removeClass("winner");
  //       $('#guest_turn').css("display", "block");
  //       $('#player_turn').css("display", "none");
  //     }
  //   });
  //   } else {
  //     $('li').removeClass("active");
  //     $('li').removeClass("active2");
  //     $('li').addClass("loser")
  //     $.ajax({
  //       type: "POST",
  //       url: "/store_tic_loser",
  //       success: function(e){
  //         $("#player_record").load(document.URL + ' #player_record');
  //         $('li').removeClass("loser");
  //         $('#guest_turn').css("display", "block");
  //         $('#player_turn').css("display", "none");
  //       }
  //     });
  //   }
  });
});



