$(document).ready(()=>{
    $('.cartLength')[0].innerHTML = loadFunction()

    let itemsInCart = "";
    let cartHeader = "<div class='imageContainer' "
                    + "style='height: 500px; display: flex; "
                    + " align-items: flex-start; justify-content: center; "
                    + " flex-wrap: wrap;'"
                    + "</div>"
  
    let cost = 0 ;
    let price = 0;
    let qty = 0 ;
    if(Number($('.cartLength')[0].innerHTML) > 0){
        console.log(JSON.parse(localStorage.getItem('cart')))
        for(let x of JSON.parse(localStorage.getItem('cart'))){
            // console.log(x.image + "\n")
            itemsInCart += 
            " <div class='preview-thumb-imgHolder'  " 
            + " style = ' display: flex;  align-items: center; "
            + " padding: 0%; margin: 2px; flex-direction: column;"
            + " height: 150px; box-shadow: 1px -2px 3px gray; '>" 
            + " <img src=" +x.image+ " alt='' "
            + " style='height: 100px; width: 120px;'>"
            + " <span id='pid' style='display:none;'>" +x.pid+ " </span>"
            + " <span id='qty' style=''> Qty->" +x.quantity+ " </span>"
            + " <span id='price' style=''> Price->" +x.price+ " </span>"
            + " <button style = 'text-decoration:none; ' ><a href = '#' style = 'color:tomato;text-decoration:none;' > X </a></button>"
            + "</div>".trim()        
            price = x.price;
            qty = x.quantity;
            console.log(qty)
            price = price.substr(1,price.length);
            cost +=  (Number(x.quantity) * Number(price))  
            console.log(cost)
        }
    }
    // console.log(itemsInCart)
    $(".cartItems-checkOut")
    .append("<div class='hold-container' style = ' display: flex; align-items: flex-start;justify-content: flex-start; flex-direction: column;' > </div>");
    $(".hold-container").append("<h2> Cart </h2>");
    $(".hold-container").append(cartHeader);
    $(".imageContainer").append(itemsInCart);
    $(".hold-container").append("<div> <span>Cost </span> <span style='display:'> ₵"+cost+" </span>  </div>");
    $(".hold-container").append("<div><button style = 'padding:5px;' > <a href = '#' style = 'color:black;text-decoration:none;' >Cash out </a> </button> </div>");

    // $(".cartItems-checkOut").load("html/cartCheck.html");
    $('.cartItems-checkOut').modal({
        fadeDuration: 1000,
        fadeDelay: 0.50,
        opacity:0.7
    });
})

let loadFunction = () =>{
  return  localStorage.getItem('cart') === null ? 0 :JSON.parse(localStorage.getItem('cart')).length;
}

$('.cartIn').on('click',()=>{
    let pid = $('.product-id')[0].innerHTML.trim();
    let quantity = $('.taggie')[0].innerHTML.trim();
    let size ;
    // if($("input[type ='radio'].size").is(':checked')){
    //     size = $("input[type ='radio'].size:checked").val();
    // }
    size = JSON.stringify($('input[name="size"]:checked'));
    // console.log(size)
    // let size = $(input['size.selecte']).groupval();
    let price = $('.preview-price h3')[0].innerHTML.trim();
    let color = "";
    let image = $('.preview-main-img')[0].src

    let cartObject = {
        'pid':pid,
        'quantity': quantity,
        'price':price,
        'image': image
    };

    let cartSave = [];    
    cartSave = localStorage.getItem('cart') === null ? [] : JSON.parse(localStorage.getItem('cart'));
    cartSave.push(cartObject);
    localStorage.setItem('cart',JSON.stringify(cartSave));
    $('.cartLength')[0].innerHTML = loadFunction();
    let xConfirm = confirm('Item added successfully, Press Ok to view cart items');
    if(xConfirm){
        $(".outside").fadeOut(1000);
        $(".cartItems-checkOut").load("html/cartCheck.html");
        $('.cartItems-checkOut').modal({
            fadeDuration: 1000,
            fadeDelay: 0.50,
            opacity:0.7
        });
    }
   
});