




  const addTOCart = () =>{

   
    

let notifier = new AWN();

 let cart_btn = document.querySelector("#add_cart_btn");
  let cart_counter = document.querySelector("#cart_counter");

    const updateCart = (cart) =>{
      var headers = new Headers();
      headers.append('Accept', 'application/json'); // This one is enough for GET requests
      headers.append('Content-Type', 'application/json'); // This one sends body
      fetch('/add-cart', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(cart),
      }).then(resp => {
        return resp.json()
      }).then((json) => {
        
           cart_counter.innerText = json.data;
           new AWN().success('Item Added in to cart', {durations: {Added: 0}})

            
     }).catch(err => {
         
      })

    }
 

    let cart_data =  cart_btn.dataset.product;
    updateCart(JSON.parse(cart_data));
 


  
}

  // update cart qty code 

    
  const update_cart_btn = document.querySelectorAll("#update_btn");

  update_cart_btn.forEach((btn)=>{

     btn.addEventListener("click", (e)=>{
       e.preventDefault();
        const id = btn.dataset.id;
         const qty = btn.closest('tr').querySelector(".form-control").value;
        
         const s_id = JSON.parse(id);
           
          
        var headers_2 = new Headers();
        headers_2.append('Accept', 'application/json'); // This one is enough for GET requests
        headers_2.append('Content-Type', 'application/json'); // This one sends body
        fetch('/update-cart', {
            method: 'POST',
            headers: headers_2,
            body: JSON.stringify({id:s_id,qty}),
        }).then(resp => {
          return resp.json();
        }).then((json) => {

           console.log(json);
            //  cart_counter.innerText = json.data;
            //  new AWN().success('Item Added in to cart', {durations: {Added: 0}})
  
              
       }).catch(err => {
           
        })

     })
   

  })





 





