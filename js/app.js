$(document).foundation();

// shows and hides filtered items
$(".filter-simple-button").click(function () {
    var value = $(this).attr('data-filter');
    if (value === "all") {
        $('.filter-simple-item').show('1000');
    } else {
        $(".filter-simple-item").not('.' + value).hide('3000');
        $('.filter-simple-item').filter('.' + value).show('3000');
    }
});

// changes active class on filter buttons
$('.filter-simple-button').click(function () {
    $(this).siblings().removeClass('is-active');
    $(this).addClass('is-active');
});

// Add to Cart Interaction
$('[data-addCart]').click(function () {
    $(this).addClass('is-adding')
    setTimeout(function () {
        $('[data-addCart]').removeClass('is-adding')
    }, 2500);
});

// Plus Minus Button
// This button will increment the value
function Increment(index, productdetail) {
    if (productdetail) var preco = $("#total" + index).html().split("$").pop().replace(",", ".") / $("#qty" + index).val();
    var currentVal = parseInt($("#qty" + index).val());
    if (!isNaN(currentVal)) {
        $("#qty" + index).val(currentVal + 1);
    } else {
        $("#qty" + index).val(1);
    }
    
    if ($("#product-quantity").length) {
        currentVal = parseInt($("#quantity" + index).val());
        if (!isNaN(currentVal)) {
            $("#quantity" + index).val(currentVal + 1);
        } else {
            $("#quantity" + index).val(1);
        }
    }
    
    if (productdetail) {
        var total = $("#qty" + index).val() * preco;
        $("#total" + index).html("$" + total.toFixed(2).replace(".", ","));
        return;
    }
    Calculate(index);
}

function Decrement(index, productdetail) {
    if (productdetail) var preco = $("#total" + index).html().split("$").pop().replace(",", ".") / $("#qty" + index).val();
    var currentVal = parseInt($("#qty" + index).val());
    if (!isNaN(currentVal) && currentVal > 0) {
        $("#qty" + index).val(currentVal - 1);
    } else {
        $("#qty" + index).val(0);
    }
    
    if ($("#product-quantity").length) {
        var currentVal = parseInt($("#quantity" + index).val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $("#quantity" + index).val(currentVal - 1);
        } else {
            $("#quantity" + index).val(0);
        }
    }
    
    if (productdetail) {
        var total = $("#qty" + index).val() * preco;
        $("#total" + index).html("$" + total.toFixed(2).replace(".", ","));
        return;
    }
    Calculate(index);
}

function Calculate(index) {
    localStorage.setItem("qtd" + index, $("#qty" + index).val());
    var totalcart = parseInt($("#qty" + index).val()) * parseFloat(localStorage.getItem("preco" + index).split("$").pop().replace(",", "."));
    $("#cart-price" + index).html("$" + totalcart.toFixed(2).replace(".", ","));
    if ($("#product-quantity").length) {
        var old = parseFloat($("#total" + index).html().split("$").pop().replace(",", "."));
        var total = parseInt($("#quantity" + index).val()) * parseFloat($("#preco" + index).html().split("$").pop().replace(",", "."));
        $("#total" + index).html("$" + total.toFixed(2).replace(".", ","));
        var productprice = parseFloat($("#product-price").html().split("$").pop().replace(",", "."));
        var pricevariation = total - old;
        productprice += pricevariation;
        $("#product-price").html("$" + productprice.toFixed(2).replace(".", ","));
        $("#total-price").html("$" + productprice.toFixed(2).replace(".", ","));
        var itens = 0;
        var totalinputs = document.getElementsByClassName("input-group-field");
        for(var i = 0; i < totalinputs.length; i++) itens += parseFloat(totalinputs[i].value);
        if (itens == 1) {
            $("#product-quantity").html("Produtos (1 item)");
        } else {
            $("#product-quantity").html("Produtos (" + itens/2 + " itens)");
        }
    }
}
/*$('[data-quantity="plus"]').click(function(e){
    console.log("passou");
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    var currentVal = parseInt($('input[name='+fieldName+']').val());
    if (!isNaN(currentVal)) {
        $('input[name='+fieldName+']').val(currentVal + 1);
    } else {
        $('input[name='+fieldName+']').val(0);
    }
});
$('[data-quantity="minus"]').click(function(e) {
    e.preventDefault();
    fieldName = $(this).attr('data-field');
    var currentVal = parseInt($('input[name='+fieldName+']').val());
    if (!isNaN(currentVal) && currentVal > 0) {
        $('input[name='+fieldName+']').val(currentVal - 1);
    } else {
        $('input[name='+fieldName+']').val(0);
    }
});*/

/* Custom JS */
function Populate() {
    var products = 0;
    var productprice = 0;
    for (var i = 0; i < 99; i++) {
        if (localStorage.getItem("prod" + i) != null) {
            var preco = parseFloat(localStorage.getItem("preco" + i).split("$").pop());
            if ($("#product-list").length) {
                products += parseInt(localStorage.getItem("qtd" + i));
                if ($(window).width() < 640) {
                    document.getElementById("product-list").innerHTML += "<hr>" +
                        "<div class='grid-x'>" +
                        "<div class='small-5 cell center' style='position: relative;'>" +
                        "<img class='img-sizing' src='" + localStorage.getItem("img" + i) + "' />" +
                        "<button type='button' class='alert button circled-top-left' onclick='Remove(" + i + ");'>&times;</button>" +
                        "</div>" +
                        "<div class='small-7 cell'>" +
                        "<div class='grid-y grid-padding-x' style='height: auto;'>" +
                        "<div class='small-3 cell vertical-center-only'>" +
                        "<div class='hero-slider-slide-content'>" +
                        "<p>" + localStorage.getItem("prod" + i) + "</p>" +
                        "</div>" +
                        "</div>" +
                        "<div class='small-2 cell center hero-slider-slide-content'>" +
                        "<span class='price bold' id='preco" + i + "'>" + localStorage.getItem("preco" + i).replace(".", ",") + "</span><p>($" + (preco * 0.9).toFixed(2).replace(".", ",") + " a vista)</p>" +
                        "</div>" +
                        "<div class='small-2 cell center'>" +
                        "<div class='input-group plus-minus-input'>" +
                        "<div class='input-group-button'>" +
                        "<button type='button' class='hollow button primary circle' onclick='Decrement(" + i + ", false);'>" +
                        "<i class='fi-minus' aria-hidden='true'></i>" +
                        "</button>" +
                        "</div>" +
                        "<input class='input-group-field' type='number' value='" + localStorage.getItem("qtd" + i) + "' id='quantity" + i + "' onchange='Calculate(" + i + ");' min='0'>" +
                        "<div class='input-group-button'>" +
                        "<button type='button' class='hollow button primary circle' onclick='Increment(" + i + ", false);'>" +
                        "<i class='fi-plus' aria-hidden='true'></i>" +
                        "</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='small-3 cell center-relative'>" +
                        "<span class='bold' id='total" + i + "'>$" + (preco * parseInt(localStorage.getItem("qtd" + i))).toFixed(2).replace(".", ",") + "</span>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                } else {
                    document.getElementById("product-list").innerHTML += "<hr>" +
                        "<div class='grid-x'>" +
                        "<div class='medium-2 cell center'>" +
                        "<img class='img-sizing' src='" + localStorage.getItem("img" + i) + "' />" +
                        "</div>" +
                        "<div class='medium-4 cell vertical-center-only'>" +
                        "<div class='hero-slider-slide-content'>" +
                        "<p>" + localStorage.getItem("prod" + i) + "</p>" +
                        "</div>" +
                        "</div>" +
                        "<div class='medium-2 cell center'>" +
                        "<div class='grid-x grid-padding-x center'>" +
                        "<div class='medium-12 cell'>" +
                        "<span class='center bold' id='preco" + i + "'>" + localStorage.getItem("preco" + i).replace(".", ",") + "</span>" +
                        "</div>" +
                        "<div class='medium-12 cell'>" +
                        "<p class='center'>ou $" + (preco * 0.9).toFixed(2).replace(".", ",") + " em 1x no crédito</p></div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='medium-2 cell center'>" +
                        "<div class='input-group plus-minus-input'>" +
                        "<div class='input-group-button'>" +
                        "<button type='button' class='hollow button primary circle' onclick='Decrement(" + i + ", false);'>" +
                        "<i class='fi-minus' aria-hidden='true'></i>" +
                        "</button>" +
                        "</div>" +
                        "<input class='input-group-field' type='number' value='" + localStorage.getItem("qtd" + i) + "' id='quantity" + i + "' onchange='Calculate(" + i + ");' min='0'>" +
                        "<div class='input-group-button'>" +
                        "<button type='button' class='hollow button primary circle' onclick='Increment(" + i + ", false);'>" +
                        "<i class='fi-plus' aria-hidden='true'></i>" +
                        "</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='medium-2 cell center-relative'>" +
                        "<span class='bold' id='total" + i + "'>$" + (preco * parseInt(localStorage.getItem("qtd" + i))).toFixed(2).replace(".", ",") + "</span>" +
                        "<button type='button' class='alert button circled-top-right' onclick='Remove(" + i + ");'>&times;</button>" +
                        "</div>" +
                        "</div>";
                }
                productprice += parseFloat($("#total" + i).html().split("$").pop().replace(",", "."));
            }
            document.getElementById("shopping-cart-content").innerHTML += "<div class='shopping-cart-item'>" +
                "<img src='" + localStorage.getItem("img" + i) + "'>" +
                "<div class='shopping-cart-item-name'>" +
                "<a>" + localStorage.getItem("prod" + i) + "</a>" +
                "<p><span class='shopping-cart-title'>Color: </span>Blue</p>" +
                "<p><span class='shopping-cart-title'>Size: </span>M</p>" +
                "</div>" +
                "<div class='shopping-cart-item-price'>" +
                "<p>Quantidade: </p>" +
                    "<div class='input-group plus-minus-input'>" +
                    "<div class='input-group-button'>" +
                    "<button type='button' class='hollow button primary circle' onclick='Decrement(" + i + ", false);'>" +
                    "<i class='fi-minus' aria-hidden='true'></i>" +
                    "</button>" +
                    "</div>" +
                    "<input class='input-group-field' type='number' value='" + localStorage.getItem("qtd" + i) + "' id='qty" + i + "' onchange='Calculate(" + i + ");' min='0'>" +
                    "<div class='input-group-button'>" +
                    "<button type='button' class='hollow button primary circle' onclick='Increment(" + i + ", false);'>" +
                    "<i class='fi-plus' aria-hidden='true'></i>" +
                    "</button>" +
                    "</div>" +
                    "</div>" +
                "<p class='shopping-cart-title' id='cart-price" + i + "'>$" + (preco * parseInt(localStorage.getItem("qtd" + i))).toFixed(2).replace(".", ",") + "</p>" +
                "<a href='#' onclick='Remove(" + i + ");'>Remove</a>" +
                "</div>" +
                "</div>";
        }
    }
    if ($("#product-list").length) {
        if (products == 1){
            document.getElementById("product-quantity").innerHTML = "Produto (1 item)";
        } else {
            document.getElementById("product-quantity").innerHTML = "Produtos (" + products + " itens)";
        }
        if (document.getElementById("product-list").innerHTML == "") {
            document.getElementById("product-list").innerHTML = "<hr>" +
                "<p>Não há nada no carrinho :(</p>";
        }
        $("#product-price").html("$" + productprice.toFixed(2).replace(".", ","));
        $("#total-price").html("$" + productprice.toFixed(2).replace(".", ","));
    }
    if (document.getElementById("shopping-cart-content").innerHTML == "") {
        document.getElementById("shopping-cart-content").innerHTML = "<p style='color: black; text-align: center; margin-top: 1em;'>Não há nada no carrinho :(</p>";
    }
}

function Margin() {
    if ($("#bullets").css("display") == "none") {
        document.getElementById("hero").style.marginBottom = "1.5rem";
    }
    Resize();
    Populate();
}

function Resize() {
    var pr = 12;
    if (screen.width < 355) pr = 13;
    var size = parseFloat($(".product-card-colors").css("width")) / pr;
    $(".button-hover-addcart.button").css("font-size", size + "px");
}

function Register(imgsrc, nome, preco, qtd) {
    var j = 0;
    for (var i = 0; i < 99 && localStorage.getItem("prod" + i) != null; i++) j++;
    localStorage.setItem("prod" + j, nome);
    localStorage.setItem("img" + j, imgsrc);
    localStorage.setItem("preco" + j, preco);
    localStorage.setItem("qtd" + j, qtd);
    document.getElementById("shopping-cart-content").innerHTML = "";
    Populate();
}

function Remove(index) {
    localStorage.removeItem("img" + index);
    localStorage.removeItem("prod" + index);
    localStorage.removeItem("preco" + index);
    localStorage.removeItem("qtd" + index);
    document.getElementById("shopping-cart-content").innerHTML = "";
    if ($("#product-list").length) $("#product-list").html("");
    Populate();
}

$("#shopping-cart").hover(
    function () {
        $("#shopping-cart").css("background-color", "#f0f0f0");
    },
    function () {
        $("#shopping-cart").css("background-color", "#e6e6e6");
    }
);

$("#shopping-cart-dropdown").hover(
    function () {
        $("#shopping-cart").css("background-color", "#f0f0f0");
    },
    function () {
        $("#shopping-cart").css("background-color", "#e6e6e6");
    }
);
