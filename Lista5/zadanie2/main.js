$(function() {
    var dialog, form,

        // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        firstname = $("#firstname"),
        lastname = $("#lastname"),
        city = $("#city"),
        zipcode = $("#zipcode"),
        date = $("#date"),
        allFields = $([]).add(firstname).add(lastname).add(city).add(zipcode).add(date),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function() {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips(n + " musi mieć od " +
                min + " do " + max + " znaków.");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

    function addUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(firstname, "Imię", 3, 12);
        valid = valid && checkLength(lastname, "Nazwisko", 3, 20);
        valid = valid && checkLength(city, "Miasto", 2, 30);
        valid = valid && checkLength(zipcode, "Kod pocztowy", 6, 6);

        valid = valid && checkRegexp(firstname, /^[a-ząćęłńóśźżA-ZĄĘŁŃÓŚŹŻ]{2,}$/, "np. Jan");
        valid = valid && checkRegexp(lastname, /^[a-ząćęłńóśźżA-ZĄĘŁŃÓŚŹŻ]{2,}$/, "np. Kowalski");
        valid = valid && checkRegexp(city, /^[a-ząćęłńóśźżA-ZĄĘŁŃÓŚŹŻ]{2,}$/, "np. Wrocław");
        valid = valid && checkRegexp(zipcode, /[\d]{2}-[\d]{3}/g, "np. 00-000");
        valid = valid && checkRegexp(date, /^[0-9]{2}-[0-9]{2}-[1-2]{1}[0-9]{1}[0-9]{1}[0-9]{1}/i, "np. DD/MM/RRRR");


        if (valid) {
            $("#users tbody").append("<tr>" +
                "<td>" + firstname.val() + "</td>" +
                "<td>" + lastname.val() + "</td>" +
                "<td>" + city.val() + "</td>" +
                "<td>" + zipcode.val() + "</td>" +
                "<td>" + date.val() + "</td>" +
                "<td>" + "<button type='button'  class='removebutton' title='Usuń'>X</button>" + "</td>" +
                "</tr>");
            $(this).dialog("close");

        }
        return valid;
    }

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 550,
        modal: true,
        buttons: {
            "Stwórz konto": addUser,
            "Anuluj": function() {
                dialog.dialog("close");
            }
        },
        close: function() {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialog.find("form").on("submit", function(event) {
        event.preventDefault();
        addUser();
    });

    $("#create-user").button().on("click", function() {
        dialog.dialog("open");
    });
    $("#date").datepicker({
        dateFormat: 'dd-mm-yy'
    });
    $(document).on('click', 'button.removebutton', function() {
        $("#dialog-remove").dialog('open');
        $(this).closest('tr').addClass('toRemove');
        return false;
    });
    $("#dialog-remove").dialog({
        modal: true,
        bgiframe: true,
        width: 210,
        height: 150,
        autoOpen: false,
        buttons: {
            "Tak": function() {
                $(".toRemove").remove();
                $(this).dialog("close");
            },
            "Nie": function() {
                $(".toRemove").removeClass("toRemove");
                $(this).dialog("close");


            }
        }
    });
});