let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else { 
        total.innerHTML = '';
        total.style.background = '#040';
    }
}

// create product

let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
} else{
    dataPro = [];
}


submit.onclick = function () {
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    if(mood === 'create'){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count;i++){
        dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[ tmp ] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

        // save localstoarge
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData()
}

 // تحديث عرض البيانات
    showData();

// clear inputs

document.getElementById('submit').addEventListener('click', function() {
        clearData();
    });

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read 

function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length;i++){
        table += `
                    <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>    
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td>
                    <button onclick="updateData(${i})" id="update">update</button>
                    </td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button>
                    </td>
                </tr>
            `
            
        }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0 ){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">delete All  (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
    }
    // Display new data
        showData();

        // Delete 

        function deleteData(i){
            dataPro.splice(i,1);
            localStorage.product = JSON.stringify(dataPro);
            showData()
        }

        
        function deleteAll(){
            localStorage.clear();
            dataPro.splice(0);
            showData()
        }

        // update 

        function updateData(i) {
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        ads.value = dataPro[i].ads;
        discount.value = dataPro[i].discount;
        getTotal();
        count.style.display = 'none';
        submit.innerHTML = 'Update';
        category.value = dataPro[i].category;
        mood = 'update';
        tmp = i;
        scroll({
            top:0,
            behavior:'smooth',
        })
        }

        // search 

        let searchMood = 'title';

        function getSearchMood(id) {
                let search = document.getElementById('search');
            if (id == 'searchTitle'){
                searchMood = 'title';
                search.placeholder = 'Search By Title';   
            }else{
                searchMood = 'category';
                search.placeholder = 'Search By Category';
            }
            search.focus()
        
        }

function searchData(value) {
    let filteredProducts = [];
    if (searchMood == 'title') {
        filteredProducts = dataPro.filter(product => product.title.includes(value));
    } else {
        filteredProducts = dataPro.filter(product => product.category.includes(value));
    }

    let table = '';
    for (let i = 0; i < filteredProducts.length; i++) {
        table += `
            <tr>
                <td>${i}</td>
                <td>${filteredProducts[i].title}</td>
                <td>${filteredProducts[i].price}</td>
                <td>${filteredProducts[i].taxes}</td>
                <td>${filteredProducts[i].ads}</td>
                <td>${filteredProducts[i].discount}</td>
                <td>${filteredProducts[i].total}</td>
                <td>${filteredProducts[i].category}</td>
                <td>
                    <button onclick="updateData(${i})" id="update">update</button>
                </td>
                <td>
                    <button onclick="deleteData(${i})" id="delete">delete</button>
                </td>
            </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;
}

