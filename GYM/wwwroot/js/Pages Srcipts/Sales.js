/// <reference path="../../lib/jquery/jquery-1.9.1.js" />

$(document).ready(function () {
    loadData();
});
//get for stock data
function loadData() {
    $.ajax({
        type: "GET",
        url: '/inventory/getsolditems',
        contenttype: "application/json",
       
        success: function (data) {
            let option = '';
            var i = 1;
            data.forEach(item => {
                option = option
                    + "<tr >" +
                    "<td>" + i + " </td>" +
                    "<td>" + item.itemName + " </td>" +
                    "<td> " + item.unitPrice + "</td >" +
                    "<td>" + item.quantity + " </td>" +
                    "<td>" + item.total+ " </td>" +

                    "<td><a onclick='deleteItem(" + item.id + ")' style='color: rgb(200 0 0 / 0.76); text - decoration: none; cursor: pointer; ' > <i class='fa fa-trash '></i></a ><a onclick='EditSoldItem(" + item.id + ")' style='color: rgb(200 0 0 / 0.76); cursor:pointer; text - decoration: none;' class='btn-edit ml-3 ' > <i class='fa fa-edit '></i></a > </td > "
                    +
                    +"<td><a>more info</a> </td>" +
                   
                    + "</tr > ";
                i++;
            });
            $("#tableBody").html(option);
        },
     
    });
}


function GetItem(barcode) {
    debugger;
    if (barcode == '') {
        Clear();
    }
    else {
    
        $.ajax({
            type: "Get",
            data: { 'Barcode': barcode },
            url: "/Inventory/GetItemByBarcode",
            success: function (resp) {
                check(resp);
             
            
            },
            error: function (e) {
                console.log(e);
                alert("Failed!!! plz try again...");
            }

        });
      
       
    }
}

//Check if the item exists or not
function check(result) {
    debugger;
    if (result == null) {

       
        $(".success").html("<div class='alert alert-danger' style=' padding-top:2px; width:200px; height:50px;'><i class='fa fa-check-circle'></i> Oops... Item is not registerd yet! </div>");
        $(".success").fadeIn(500);
        setInterval(close, 5000);
    }
    else {
        $("#ID").val(result.id);
        $("#Name").val(result.name);
        $("#UnitPrice").val(result.unitPrice);
        $("#Category").val(result.category);
        $("#Currency").val(result.currency);

    }
}

//Post for Stock Save 
$("#btnAdd").click(function (a) {
    debugger;
    a.preventDefault();
   
    var ID = $("#ID").val();
    var Barcode = $("#Barcode").val();
    var SoldPrice = $("#SoldPrice").val();
    var Quantity = $("#Quantity").val();

    var flag = false;
    if (ID && SoldPrice && Quantity) {
        flag = true;

    }

    else {

        if (Barcode == '') {
            $('#barcodeNotValid').html("*");
            $('#Barcode').css('border', '2px solid red');
           
        }
        if (SoldPrice == '') {
            $('#soldPriceNotValid').html("*");
            $('#SoldPrice').css('border', '2px solid red');
           
        }
        if (Quantity == '') {
            $('#quantityNotValid').html("*");
            $('#Quantity').css('border', '2px solid red');
        }
     
    }

    if (flag) {
        var jsonData = {
            ItemName: ID,
            SoldPrice: SoldPrice,
            Quantity: Quantity
        };
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            type: "POST",
            url: "/Inventory/AddToSales",
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            success: function (result) {
                QuantityCheck(result);

            },
            error: function () {
                alert("not successfull");
            },
            complete: function () {
                $("#Barcode").val("");
                $("#Name").val("");
                $("#UnitPrice").val("");
                $("#SoldPrice").val("");
                $("#Quantity").val("");
                $("#Currency").val(0);
                $("#Category").val(0);


            }
        });
    }
       

    
    setInterval(close, 5000);

});

function QuantityCheck(resp) {
    debugger;
    if (resp == null) {

        $(".success").html("<div class='alert alert-danger' style='padding-top:2px; width:200px; height:50px;'><i class='fa fa-exclamation-circle'></i> Not enough Item in the stock </div>");
        $(".success").fadeIn(500);

    }
    else {
        $(".success").html("<div class='alert alert-success' style='padding-top:2px; width:200px; height:50px;'><i class='fa fa-check-circle'></i> Successfull </div>");
        $(".success").fadeIn(500);
        Clear(null);
        loadData();
    }
}

//Get for edit
function EditSoldItem(id) {
    debugger;
    $("#btnAdd").css('display', 'none');
    $("#btnUpdate").css('display', 'inline');


    $.ajax({
        type: "Get",
        url: '/Inventory/GetItemById?ID=' + id,
        contentType:"application/json",
        success: function (item) {
            $("#ID").val(item.id);
            $("#SoldPrice").val(item.soldPrice);
            $("#Quantity").val(item.quantity);
            EditItem(item.itemName);
        },
        error: function (e) {
            console.log(e);
            alert("Failed!!! plz try again...");
        }

    });
}
//Get for Sale  
function EditItem(ID) {
    debugger;
    $.ajax({
        type: "GET",
        url: '/Inventory/GetItem?ID=' + ID,
        contentType: "application/json",

        success: function (item) {
            $("#Barcode").val(item.barcode);
            $("#Barcode").attr('disabled', true);
            $("#Barcode").css('color', '#777');
            $("#Name").val(item.name);
            $("#Name").css('color', '#777');
            $("#UnitPrice").val(item.unitPrice);
            $("#UnitPrice").css('color', '#777');
            $("#Category").val(item.category);
            $("#Category").css('color', '#777');
            $("#Currency").val(item.currency);
            $("#Currency").css('color',' #777');
        }
    })

};


$("#btnUpdate").click(function (a) {

    a.preventDefault();
    var Id = $("#ID").val();
    var SoldPrice = $("#SoldPrice").val();
    var Quantity = $("#Quantity").val();

    var flag = false;
    if (ID && SoldPrice && Quantity) {
        flag = true;
    }
    else {
        if (SoldPrice == '') {
            $('#soldPriceNotValid').html("*");
            $('#SoldPrice').css('border', '2px solid red');
        }
        if (Quantity == '') {
            $('#quantityNotValid').html("*");
            $('#Quantity').css('border', '2px solid red');
        }

    }

    if (flag) {
        var jsonData = {
            ID: Id,
            SoldPrice: SoldPrice,
            Quantity: Quantity
        };
        $.ajax({
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN", $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            type: "POST",
            url: "/Inventory/EditSales",
            data: JSON.stringify(jsonData),
            contentType: 'application/json',
            success: function (result) {
                $(".success").html("<div class='alert alert-success' style='padding-top:2px; width:200px; height:50px;'><i class='fa fa-check-circle'></i> Successfully Updated</div>");
                $(".success").fadeIn(500);
                Clear(null);
                loadData();

            },
            error: function () {
                alert("not successfull");
            },
        });
    }



    setInterval(close, 5000);

});

function deleteItem(id) {
    if (confirm("Are you Sure to delete this record?")) {

        $.ajax({
            type: "GET",
            url: '/Inventory/DeleteSalesItem?ID=' + id,
            contentType: "application/json",
            success: function () {
                loadData();
            },
            error: function (e) {
                console.log(e);
                alert("Not Successfull")
            }
        });

    }
}

function PrintBill() {
    if (confirm("Are you Sure to print the Bill?")) {

        debugger;


        $.ajax({
            type: "GET",
            url: '/Inventory/PrintBill',
            contentType: "application/json",
            success: function () {
                loadData();
            },
            error: function (e) {
                console.log(e);
                alert("Not Successfull")
            }
        });

    }
}

//Clears the form all inputs
function Clear(res) {
    debugger;
    if (res == null) {
        $("#Barcode").val("");
        $("#Barcode").attr("disabled", false);
        $("#Barcode").css("color", "#fff");
        

        $("#Name").val("");
        $("#UnitPrice").val("");
        $("#Category").val(0);
        $("#Category").css("color","#fff");
        $("#Currency").val(0);
        $("#Currency").css("color","#fff");
        $('#barcodeNotValid').html("");
        $('#Barcode').css('border', '');
        $('#soldPriceNotValid').html("");
        $('#SoldPrice').css('border', '');
        $('#SoldPrice').val('');
        $('#quantityNotValid').html("");
        $('#Quantity').css('border', '');
        $('#Quantity').val('');

        $('#btnUpdate').css('display','none');
        $('#btnAdd').css('display','inline');

    }
}

function close() {
    $(".success").fadeOut(1000);
}
