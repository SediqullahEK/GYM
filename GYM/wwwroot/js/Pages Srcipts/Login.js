
function submit()
{
  
    var username = $("#username").val();
    var Password = $("#password").val();
    var Confirm = $("#confirmPassword").val();
    if (username && Password && Confirm) {
        debugger;
        if (Password != Confirm) {
            $("#confirm").html("<span>Password and Confirm Password mismatch!!!<span>");
            return false;
        }
    }
    else {

        if (!username) {
            $("#username").css('border-color', 'red');
        }
        if (!Password) {
            $("#password").css('border-color', 'red');
        }
        if (!Confirm) {
            $("#confirmPassword").css('border-color', 'red');
        }


    }
  
    $.ajax({
        type: "POST",
        url: "/Login/SignUp",
        data: { 'username': username, 'Password': Password },
        contentType: "application/json",

        success: function (result) {

            if (result != 'Username already exists!!!') {
                alert("Submitted successfully!!!");
            }
        },
        error: function (e) {
            Console.log(e);
            alert("Not Successfull")
        }

    });

   
}