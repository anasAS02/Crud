let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let total = document.getElementById('total');
let create = document.getElementById('create');

let tmp;
let mood = 'create';
let searchMood = 'searchTitle';
let searchBox = document.getElementById('search');
let tbody = document.getElementById('tbody');
let deleteAllBtn = document.getElementById('deleteAll');

// Get Total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.style.background = 'red';
        total.innerHTML = '';
    }
}

// Save Data
let dataPro;
if(localStorage.product != null){
    dataPro = (JSON.parse(localStorage.product));
}else{
    dataPro = [];
}

// Create
create.onclick = function(){
    newData = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        count:count.value,
        category:category.value,
        total:total.innerHTML,
    }
// count
    if(mood === 'create'){
        if(count.value > 1){
            for(let i = 0; i < count.value; i++){
                dataPro.push(newData) * count.value;
            }
        }else{
            dataPro.push(newData);
        }   
    }else{
        dataPro[tmp] = newData;
        mood = 'create';
        create.innerHTML = 'Create';
        count.style.display = 'block';
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData()
    showData()
}

// Clear Inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.background = 'red';
}

// Read
function showData(){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
        <td>
            ${i+1}
        </td>
        <td>
            ${dataPro[i].title}
        </td>
        <td>
            ${dataPro[i].price}
        </td>
        <td>
            ${dataPro[i].taxes}
        </td>
        <td>
            ${dataPro[i].ads}
        </td>
        <td>
            ${dataPro[i].discount}
        </td>
        <td>
            ${dataPro[i].total}
        </td>
        <td>
            ${dataPro[i].category}
        </td>
        <td>
            <button id="update" onclick = "updateData(${i})">Update</button>
        </td>
        <td>
            <button id="delete" onclick = "deleteData(${i})">Delete</button>
        </td>
    </tr>
        `
        tbody.innerHTML = table;

        if(dataPro.length > 0){
            deleteAllBtn.innerHTML = `
            <button onclick = "deleteAll()">Delete All (${dataPro.length})</button>
            `
        }else{
            deleteAllBtn.innerHTML = '';
        }
    }
}
// Delete All
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0);
    showData()
}
// Delete
function deleteData(i){
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}
// Update
function updateData(i){
    mood = 'update';
    tmp = i;
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    
    getTotal()
    count.style.display = 'none';
    create.innerHTML = 'Update';
}
// Search
function search(id){
    if(id == 'searchTitle'){
        searchBox.placeholder = 'Search By Title'
    }else{
        searchBox.placeholder = 'Search By Category'
    }
    searchBox.focus()
}

function searchData(value){
    if(searchMood == 'searchTitle'){
        table = '';
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
            table +=
                `
                <tr>
                <td>
                    ${i+1}
                </td>
                <td>
                    ${dataPro[i].title}
                </td>
                <td>
                    ${dataPro[i].price}
                </td>
                <td>
                    ${dataPro[i].taxes}
                </td>
                <td>
                    ${dataPro[i].ads}
                </td>
                <td>
                    ${dataPro[i].discount}
                </td>
                <td>
                    ${dataPro[i].total}
                </td>
                <td>
                    ${dataPro[i].category}
                </td>
                <td>
                    <button id="update" onclick = "updateData(${i})">Update</button>
                </td>
                <td>
                    <button id="delete" onclick = "deleteData(${i})">Delete</button>
                </td>
            </tr>
                `
                tbody.innerHTML = table;
            }
        }
    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
            table +=
                `
                <tr>
                <td>
                    ${i+1}
                </td>
                <td>
                    ${dataPro[i].title}
                </td>
                <td>
                    ${dataPro[i].price}
                </td>
                <td>
                    ${dataPro[i].taxes}
                </td>
                <td>
                    ${dataPro[i].ads}
                </td>
                <td>
                    ${dataPro[i].discount}
                </td>
                <td>
                    ${dataPro[i].total}
                </td>
                <td>
                    ${dataPro[i].category}
                </td>
                <td>
                    <button id="update" onclick = "updateData(${i})">Update</button>
                </td>
                <td>
                    <button id="delete" onclick = "deleteData(${i})">Delete</button>
                </td>
            </tr>
                `
                tbody.innerHTML = table;
            }
        }
    }
}

showData()
