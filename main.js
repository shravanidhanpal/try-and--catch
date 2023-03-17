let AddToBill = document.getElementById("btn");
AddToBill.addEventListener("click", addOrderToCrudCrud);
var editId = null;
async function addOrderToCrudCrud(event) {
    try {
        // event.preventDefault();
        let price = document.getElementById("price").value;
        let product = document.getElementById("product").value;
        let type = document.getElementById("type").value;
        if (price === '' || product === '' || type === '') {
            confirm('price , product and type required');
            return
        }
        let obj = {
            price,
            product,
            type
        }

        if (editId) {
            try {
                let value = await axios
                    .put(`https://crudcrud.com/api/f55776af55304aebb54d8b78d3fc72a8/ProductData/${editId} `, obj)
                    console.log(value);
                    showOrderOnUI(editId);
            } catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                let res = await axios
                    .post(`https://crudcrud.com/api/f55776af55304aebb54d8b78d3fc72a8/ProductData`, obj)
    
                    console.log(res);
                // console.log(res.data._id);
                let ID = res.data._id;
                // console.log(ID);
                showOrderOnUI(ID);
            } catch (error) {
                console.log(error);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function showOrderOnUI(ID) {
    try {
        document.getElementById("price").value = ''
        document.getElementById("product").value = 'products'
        document.getElementById("type").value = 'type'
        let res = await axios
            .get(`https://crudcrud.com/api/f55776af55304aebb54d8b78d3fc72a8/ProductData/${ID}`)
                let type = res.data.type;
                let price = res.data.price;
                let product = res.data.product;

                let parentElem = document.getElementById(type);
 
                let childElem = `<li id='${ID}'>  ${price} - ${product} - ${type} 
                <button class="btn btn-warning mb-2" onclick=editOrder('${ID}') >Change Order</button>
                <button class="btn btn-danger mb-2" onclick=deleteOrder('${ID}') >Delete Order</button>
                </li>`
 
                parentElem.innerHTML = parentElem.innerHTML + childElem;
    }
    catch (error) {
        console.log(error);
    }
}

async function editOrder(ID) {
    try {
        // console.log(ID)
        editId = ID;
        let res = await axios
            .get(`https://crudcrud.com/api/f55776af55304aebb54d8b78d3fc72a8/ProductData/${ID}`)
             // console.log(res.data.price);
             document.getElementById('price').value = res.data.price;
             document.getElementById('product').value = res.data.product;
             document.getElementById('type').value = res.data.type;
             removeOrderFromUI(ID);
             
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteOrder(ID) {
    try {
        // console.log(ID)
        removeOrderFromUI(ID)
        let res = await axios
            .delete(`https://crudcrud.com/api/f55776af55304aebb54d8b78d3fc72a8/ProductData/${ID}`)
            console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}

async function removeOrderFromUI(ID) {
    try {
        let res = await axios
            .get(`https://crudcrud.com/api/f55776af55304aebb54d8b78d3fc72a8/ProductData/${ID}`)  
             // console.log(res.data.table);
             let parentElem = document.getElementById(res.data.type);
             let childElem = document.getElementById(ID);
 
             parentElem.removeChild(childElem);
    }
    catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
       let res = await axios
            .get(`https://crudcrud.com/api/f55776af55304aebb54d8b78d3fc72a8/ProductData`)       
            // console.log(res);
            res.data.forEach(element => {
                // console.log(element._id);
                showOrderOnUI(element._id)
            })
    } catch (err){
        console.log(err);
    }
})