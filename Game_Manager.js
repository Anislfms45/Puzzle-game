function Laod_Gameplay() {
    $('#exampleModalCenter').modal('show');
    $('#exampleModalCenter2').modal('hide');
    $('#exampleModalCenter3').modal('hide');
}
$("#Menu").click(function () {
    $("#exampleModalCenter2").animate({
        opacity: "0"
    }, 1000, function () {
        $("#exampleModalCenter").modal('show');
    });
});
function Open_scoreTab() {
    $("#exampleModalCenter").modal('hide');
    $("#exampleModalCenter2").modal('hide');
    $("#exampleModalCenter3").modal('show');
}
var Timming_arrange = [];
var Timming_arrange2 = [];
var TR_arrangin = [];
var TR_arrangin2 = [];
class Game_luncher {

    constructor(Player_Name, niveau, timer) {

        this.Player_Name = Player_Name;
        this.niveau = niveau;
        this.timer = timer;
        this.table_of_images_id = [];
        this.dificulti_level = this.check_wich_level();
        this.Table_src_images = this.Setup_game();
        this.Setup_game_envirenoment();
        if ($('#check').is(":checked")) {
            this.start_timer(0);
        } else {
            this.start_timer(1);
        }
    }
    //    this function is used when player plays against time
    start_timer(props) {
        var Game_Timer = new Date("January 1, 2008 1:" + this.timer);
        //TO Handl Local And Global Scoop
        if (props == 0) {
            var TIK = this.timer_click2 = setInterval(function () {
                if (Game_Timer.getSeconds() == "0" && Game_Timer.getMinutes() == "0") {
                    $("#timing").css("background-color", "red");
                    $("#exampleModalCenter2").css("opacity", "1");
                    clearInterval(TIK);
                    $('#exampleModalCenter2').modal('show');
                    $('.Game_container img').remove();
                    $('.Game_container2 img').remove();
                } else {
                    Game_Timer.setSeconds(Game_Timer.getSeconds() - 1);

                    $("#timing").html('<i class="fas fa-hourglass-start" style="size: 50px; color: black;"></i>' + Game_Timer.getMinutes() + ":" + Game_Timer.getSeconds());

                }

            }, 1000);
        } else {
            // non need for {scoop}
            this.timer_click2 = setInterval(function () {
                Game_Timer.setSeconds(Game_Timer.getSeconds() + 1);
                $("#timing").html('<i class="fas fa-hourglass-start" style="size: 50px; color: black;"></i>' + Game_Timer.getMinutes() + ":" + Game_Timer.getSeconds());
            }, 1000);

        }
    }
    kill_timer() {
        // kill all intervals
        clearInterval(this.timer_click2);
        clearInterval(this.gameinter);
    }

    //    this function will get images from file and set them in array
    Setup_game() {
        $('#Info_Player').css('display', "block");
        var table_containing_all_images_src = [];

        var Randome_imgae_to_pick = Math.floor(Math.random() * 4) + 1;
        var sub_file = "\\" + this.dificulti_level + "x" + this.dificulti_level + "\\";
        var string = "Puzzle_Image_Game_Dataset\\img" + Randome_imgae_to_pick + sub_file;
        for (var cpt = 1; cpt <= (this.dificulti_level * this.dificulti_level); cpt++) {
            var string_copy = string;
            if (cpt > 9) {
                string_copy += "image_part_0" + cpt + ".jpg";
            } else {
                string_copy += "image_part_00" + cpt + ".jpg";

            }
            table_containing_all_images_src.push(string_copy);
        }
        return table_containing_all_images_src;
    }
    // this fonction will shuffle the array containing the images
    shuffle() {
        for (var ok = 1; ok <= (this.dificulti_level * this.dificulti_level); ok++) {
            this.table_of_images_id.push(ok);
        }
        var j, x, i;
        for (i = this.Table_src_images.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.Table_src_images[i];
            this.Table_src_images[i] = this.Table_src_images[j];
            this.Table_src_images[j] = x;
            x = this.table_of_images_id[i];
            this.table_of_images_id[i] = this.table_of_images_id[j];
            this.table_of_images_id[j] = x;
        }

    }
    // this function will set up the game environment
    Setup_game_envirenoment() {
        var width_contai_img = (600 / this.dificulti_level);
        this.shuffle();
        for (var i = 0; i < this.Table_src_images.length; i++) {
            $(".Game_container").append("<img src=" + this.Table_src_images[i] + " id=" + this.table_of_images_id[i] + " class='ImgDraggable ImDroppable'>")
            $(".Game_container2").append("<img  class ='ImDroppable ImgDraggable'>")
        }
        $(".Game_container img").css("width", width_contai_img);
        $(".Game_container img").css("height", width_contai_img);
        $(".Game_container2 img").css("width", width_contai_img);
        $(".Game_container2 img").css("height", width_contai_img);
        $('.Game_container2 img').css('margin', 3);
        $('.Game_container img').css('margin', 3);

        this.Handle_drope_and_dragg();
        this.check_Game_Playe();

    }
    // this function will handl the drop and drag 
    Handle_drope_and_dragg() {
        $(".ImgDraggable").draggable({ revert: "invalid" });
        $(".ImDroppable").droppable({

            drop: function (event, ui) {
                $(this).attr('src', ui.draggable.attr('src'));
                $(this).attr('id', ui.draggable.attr('id'));
                ui.draggable.draggable({ revert: true });
                ui.draggable.removeAttr('src');

            }
        });
    }
    /// THIS PART WILL CHECK IF PLAYER WON OR NON
    check_Game_Playe() {

        var numbre_of_cas = this.dificulti_level * this.dificulti_level;
        var time = 0;
        var Player_Name = this.Player_Name;
        var diffi = this.niveau;
        var tim = this.timer;
        var Gameplay_Interval = this.gameinter = setInterval(function () {
            time += 1;
            var list_of_drops = $(".Game_container2 img");
            var calcul = 1;
            for (var k = 1; k < list_of_drops.length; k++) {
                if (list_of_drops[k].src != "") {
                    calcul++;
                }
            }
            if (calcul == numbre_of_cas) {
                var bool_check = true;
                var compra = parseInt(list_of_drops[0].id);
                for (var zdk = 1; zdk < list_of_drops.length; zdk++) {
                    if (parseInt(list_of_drops[zdk].id) == (compra + 1)) {
                        compra = parseInt(list_of_drops[zdk].id);
                    } else {
                        bool_check = false;
                        break;
                    }
                }
                if (bool_check) {
                    // Animation When the Player wins a Round
                    $(".Game_container2 img").animate(
                        {
                            opacity: '0'
                        }, 1500, function () {
                            $('.Game_container2 img').css('margin', 0);
                        });
                    $(".Game_container2 img").animate(
                        {
                            opacity: '1'
                        }, 3000, function () {
                            $('#exampleModalCenter3').modal('show');
                            $('.Game_container img').remove();
                            $('.Game_container2 img').remove();
                        });
                    var mmin = parseInt(time / 60);
                    var sec = time - (60 * mmin);
                    if ($('#check').is(":checked")) {
                        Timming_arrange.push(time);
                        TR_arrangin.push('<tr> <td>' + 1 + '</td> <td>' + Player_Name + '</td> <td>' + diffi + '</td> <td> ' + tim + '</td> <td>' + mmin + ":" + sec + '</td> </tr>')
                        $('table:last').append('<tr> <td>' + 1 + '</td> <td>' + Player_Name + '</td> <td>' + diffi + '</td> <td> ' + tim + '</td> <td>' + mmin + ":" + sec + '</td> </tr>');
                    } else {
                        Timming_arrange2.push(time);
                        TR_arrangin2.push('<tr> <td>' + 1 + '</td> <td>' + Player_Name + '</td> <td>' + diffi + '</td> <td>' + mmin + ':' + sec + '</td> </tr>')

                        $('table:first').append('<tr> <td>' + 1 + '</td> <td>' + Player_Name + '</td> <td>' + diffi + '</td> <td>' + mmin + ':' + sec + '</td> </tr>');
                    }
                    //Simulate a click to handle the list 
                    $('#ke').click();



                };
            }
        }, 1000);
    }
    // This function will check for us how are we going to set our GRID
    check_wich_level() {
        if (this.niveau == "Facile")
            return 3;
        else {
            if (this.niveau == "Moyen")
                return 4;
            return 5;
        }
    }
}
var Object_x = [];
// this function will creat our Game Play
function game_creator() {

    $('.Game_container img').remove();
    $('.Game_container2 img').remove();
    $('#exampleModalCenter2').modal('hide');
    $('#timing').css('background-color', "blue");
    var Plyer_name = $("#Player_name").val();
    var diffi = $('option:selected').val();
    var timer = $("#minu").val() + ":" + $("#seco").val();
    if ($('#Player_name').val() == "") {
        $('#Name_Player').text("Bot");
        Plyer_name = "BOT";

    } else {
        $('#Name_Player').text(Plyer_name);
    }
    $('#Niveau').text(diffi);
    $('#timing').html('<i class="fas fa-hourglass-start" style="size: 50px; color: black;"></i>' + timer);
    $('#exampleModalCenter').modal('hide');
    Object_x.push(new Game_luncher(Plyer_name, diffi, timer));
    if (Object_x.length > 1) {
        var de = Object_x.shift();
        de.kill_timer();
    }
}
$("#recommencer").click(function () {
    $("#exampleModalCenter2").css("opacity", "1");
    $("#exampleModalCenter2").modal('show');
});
// when Player wins a game this function will get called it will be responsible of arrangging the TD in ASC way
$('#ke').on('click', function () {
    // here we gona kill the timers
    Object_x[0].kill_timer();
    // this part is for against CLOCK
    if (Timming_arrange.length > 1) {
        for (var i = 0; i < Timming_arrange.length; i++) {
            for (var j = i + 1; j < Timming_arrange.length; j++) {
                if (Timming_arrange[i] > Timming_arrange[j]) {
                    var temp = TR_arrangin[i];
                    TR_arrangin[i] = TR_arrangin[j];
                    TR_arrangin[j] = temp;
                    temp = Timming_arrange[i];
                    Timming_arrange[i] = Timming_arrange[j];
                    Timming_arrange[j] = j;
                }
            }
        }
        // remove all elements befor displaying the arranged Onece
        $('table:last tr').remove();
        for (var i = 0; i < Timming_arrange.length; i++) {
            $('table:last').append(TR_arrangin[i]);
            $("table:last tr:last td:first").text(i + 1);
        }
    }
    // this part is Normal Mode
    if (Timming_arrange2.length > 1) {
        for (var i = 0; i < Timming_arrange2.length; i++) {
            for (var j = i + 1; j < Timming_arrange2.length; j++) {
                if (Timming_arrange2[i] > Timming_arrange2[j]) {
                    var temp = TR_arrangin2[i];
                    TR_arrangin2[i] = TR_arrangin2[j];
                    TR_arrangin2[j] = temp;
                    temp = Timming_arrange2[i];
                    Timming_arrange2[i] = Timming_arrange2[j];
                    Timming_arrange2[j] = j;
                }
            }
        }
        // remove all elements befor displaying the arranged Onece
        $('table:first tr').remove();
        for (var i = 0; i < Timming_arrange2.length; i++) {
            $('table:first').append(TR_arrangin2[i]);
            $("table:first tr:last td:first").text(i + 1);

        }
    }
});
$("#check").on('click', function () {
    if ($('#check').is(":checked")) {
        $('.inpunum').attr('disabled', false);
    } else {
        $('.inpunum').val("");
        $('.inpunum').attr('disabled', true);
    }
});