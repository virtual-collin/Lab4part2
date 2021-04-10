
let list;
let listAdd;
let itemCount;
let totalPrice;

let email = sessionStorage.getItem('email'); //gets the users email from sessionStorage

getCart(email);

function getCart($email) {
    $.ajax({
        url: Url + 'GetCart',
        type: 'get',
        dataType: 'json',
        data: {"email":$email},
        contentType: 'text/plain',
        success: function (data) {

            list = '';
            listAdd = '';
            itemCount = 0;
            totalPrice = 0;

            $.each(data['data']['List'], function (i, item) {
                listAdd = '<div class="row main align-items-center">\n' +
                    '                        <div class="col-2"><img class="img-fluid" src="' + item['image'] + '"></div>\n' +
                    '                        <div class="col">\n' +
                    '                            <div class="row text-muted">' + item['operating_system'] + '</div>\n' +
                    '                            <div class="row">' + item['title'] + '</div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col"> <a class="border">1</a></div>\n' +
                    '                        <div class="col">&dollar; ' + item['money_price'] + ' <a onclick="deleteItem(' + item['id'] + ')" type="button">&#10005;</a></div>\n' +
                    '                    </div>';
                list = list + listAdd;
                itemCount++;
                totalPrice += parseInt(item['money_price']);
            });

            $('#cart-list').html(list);
            $('#item-count').html(itemCount + ' items');
            $('#item-total').html(itemCount + ' items');
            $('#item-price').html('&dollar; ' + totalPrice);

        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}

function deleteItem($id) {

    $.ajax({
        url: Url+'Cart/' +$id,
        type: 'delete',
        dataType: 'json',
       
        contentType: 'text/plain',

        success: function (data) {
            getCart(email)
        },
        error: function (data) {
           console.log(data);
        }
    });
}

function checkOut() {

    let email = $('#email').val();
    $.ajax({
        url: Url+'Cart',
        type: 'put',
        dataType: 'json',
        data: JSON.stringify({"email":email}),
        contentType: 'text/plain',

        success: function (data) {
            alert("data was sucessfully updated")
            let message = "thank you for shopping with us"
            $('#cart-list').html(message);
            $('#checkout').html("Approved");
        },
        error: function (data) {
            console.log(data);
        }
    });
}