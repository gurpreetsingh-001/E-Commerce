let prodArr =[];
let searchArr=[];
let cartArr=[];
let cartno;
cartno = document.querySelector(".cartno");
const container = document.querySelector('.product-container');
async function fetcheg(){
        
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    console.log(data.products)

    prodArr=data.products;
    populate(prodArr);
    
    const searchbtn = document.getElementById("searchbtn");
    searchbtn.addEventListener('click', function(event){
        const search = document.getElementById("searchtext").value ;
        let found= false;
        container.innerHTML="";
        if(search.length==0)
        {
            populate(prodArr); 
        }
        else if(search.length>0)
        {
        searchArr = prodArr.filter(product => {
        if((search.toLowerCase() ===product.brand.toLowerCase())||(search.toLowerCase()===product.title.toLowerCase())||(search.toLowerCase()===product.category.toLowerCase()))
        {
        found=true;
         return search;
        }
        if(!found){
            
            container.innerHTML=' <h1 style="text-align: center">NO PRODUCT FOUND</h1>';
        }
       })
       populate(searchArr); 
    }
    })

}
function clickme(id){
   const ids=id;
// Redirect to the second page with data as a query parameter
window.location.href = "productDetails.html?data=" + encodeURIComponent(ids);
}

function addtocart(id)
{
    const itemid = id;
    //{1,2,3,4,5,6,7,8,9,10} - 5
    prodArr.map((ele)=>{

        if(itemid==ele.id)
        {
            cartArr.push(ele)
        }

    })
    
    cartno.innerHTML = `${cartArr.length}`
    console.log(cartArr)

 //id 1 = 1 prodarr- > ele push cart array
  
 //  console.log(prodArr)

}

function populate(arr)
{
    const prodArr1= arr;
    prodArr1.map((ele)=>{
        const disprice = ele.price-(ele.price*ele.discountPercentage/100)
        
        function ratingToStars(rating, maxRating) {
            // Calculate the percentage
            const percentage = (rating / maxRating) * 100;
          
            // Calculate the number of full stars and a possible half star
            const fullStars = Math.floor(percentage / 20);
            const hasHalfStar = Math.floor((percentage % 20) / 10);
          
            // Create the star rating representation
            let starRating = '';
          
            for (let i = 0; i < fullStars; i++) {
              starRating += '★'; // Full star character
            }
          
            if (hasHalfStar === 1) {
              starRating += '½'; // Half star character
            }
            return starRating;
          }
          const rating = ele.rating;
          const maxRating = 5;
          const starRepresentation = ratingToStars(rating, maxRating);
        // //console.log(ele)
             container.innerHTML+= `
             <div class="product-card">
                   <div class="product-image">
                       <img src="${ele.images[0]}" height="200"
                           alt="Product Image">
                           <!-- <div class="add-to-cart">
                               <i class="fas fa-heart"></i>
                           </div> -->
                       <div class="hover-actions">
                           <span class="quick-view">Quick View</span>
                           
                       </div>
                   </div>
                   <div class="product-details">
                       <div class="brand-with-icon">
                           <p class="brand">${ele.brand}</p>
                           <div class="wishlist-icon">
                               <i class="fas fa-heart"></i>
                           </div>
                       </div>
                       <p class="title">${ele.title}</p>
                       <div class="ratings">
                           <!-- You can use icons or other rating representations here -->
                          ${starRepresentation}
                       </div>
                       <p class="disprice">$ ${disprice.toFixed(2)} <span class="price"> $ ${ele.price}</span></p>
                       <button class="btnb" onclick ="clickme(${ele.id})")>Show Product</button>
                       <button class="btnbcart" onclick ="addtocart(${ele.id})")>Add to Cart</button>
                   </div>
               </div>
             `
   })
}
fetcheg();