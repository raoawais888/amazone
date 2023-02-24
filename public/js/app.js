




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

    

  const update = ()=>{
    const update_btn = document.querySelector("#update_btn");
      update_btn.foreach(ele =>{
        
      

      })
    const product_id = update_btn.dataset.id;
    console.log(product_id)
      
  }



 





