
$(document).ready(()=>{

    // Fetching Data from API to get items.
    const search = $('.search_icon');
    const searchEnter = $('.item');

    // Trigger seacr icon when we press enter
    searchEnter.keyup((e)=>{
        if(e.keyCode === 13){
            e.preventDefault();
            search.click();
        }
    });

    search.click(() => {
        const Ingredient = $('.item').val();

        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
            .then(response => response.json())
            .then(data => {
                const items = data.meals;
                let HTMLContent = "";
                if(items){
                    $.each(items, (i) => {
                        HTMLContent += 
                            `<div class='card' id=${items[i].idMeal}>
                                <img src=${items[i].strMealThumb} alt=${items[i].strMeal}>
                                <div class="card_info">
                                    <h3>${items[i].strMeal}</h3>
                                    <button class="btn">Try Receipe</button>
                                </div>
                            </div>`
                    });
                    $('.container_bottom').html(HTMLContent);
                }else{
                    console.log('Cannot Find items');
                    let HTMLContent = "";
                    HTMLContent += "<h2>Sorry! There are no items with this Ingredient</h2>";
                    $('.container_bottom').html(HTMLContent);
                }
            }).catch(err => {
                console.log(err);
            })
    });

    // Open Modal
    const foodItem = $('.container_bottom');

    foodItem.click((event)=>{
        event.preventDefault();
        if(event.target.classList.contains('btn')){
            let item = event.target.parentElement.parentElement;
            
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.id}`)
                .then(response => response.json())
                .then(data => {
                    const info = data.meals[0];
                    let HTMLContent = "";

                    HTMLContent += 
                        `<div class="item_modal_content">
                            <span class="close">&times;</span>
                            <h2>${info.strMeal}</h2>
                            <h4>${info.strCategory}</h4>
                            <img class="item_image" src=${info.strMealThumb} alt=${info.strMeal}>
                            <h4>Instructions</h4>
                            <p class="instructions">${info.strInstructions}</p>
                            <a target="_blank" href=${info.strYoutube}>Watch Video</a>
                        </div>`
                    
                        $('.item_modal').html(HTMLContent);
                });
            
            $('.item_modal').show();
        }
    });

    // Closing Modal
    const Modal = $('.item_modal')

    Modal.click((event)=>{
        event.preventDefault();
        if(event.target.classList.contains('close')){
            console.log('close');
            $('.item_modal').hide();
        }
    });

    Modal.click((e)=>{
        e.preventDefault();
        if(e.target.href){
            $("<a>").prop({
                target: "_blank",
                href: e.target.href,
            })[0].click();
        };
    });

});