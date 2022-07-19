
// ELEMENTS is html dom in js
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
// console.log(total);
let count = document.getElementById("count");
// console.log(count);
let category = document.getElementById("category");
let submite = document.getElementById("submite");
let search = document.getElementById("search");//search 
let mood = "create";
let tmp;




//funcation getTotal
function getTotal (){
    if(price.value !=""){
        let result = (+price.value + +taxes.value + +ads.value)-(+discount.value);
        total.innerHTML = result ;
        total.style.background = "green";
    }
    else{
        total.innerHTML = "";
        total.style.background = "red";
    }
}


//funcation create product
let dataproduct = [];
if(localStorage.products != null){
    dataproduct = JSON.parse(localStorage.products);
}
else{
    dataproduct = [];
}
submite.onclick = function()
{
let newproduct = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML ,
    count:count.value,
    category:category.value.toLowerCase(),
}

if(title.value != "" && price.value !="" &&category.value != "" && newproduct.count <= 100)
{
    if(mood === "create")
{
    if(newproduct.count > 1)
    {
        for(let i = 0; i< newproduct.count ; i++)
        {
            dataproduct.push(newproduct);
        }
    }
    else{
        dataproduct.push(newproduct);
    }
}
else{
    dataproduct [tmp]= newproduct ; 
    mood="create";
    submite.innerHTML = "create";
    count.style.display = "block";
clearproduct();
}
}


//save dataproduct local storge
localStorage.setItem("products",JSON.stringify(dataproduct));
// console.log(dataproduct);
// clearproduct();

showData();
}

//clear product funcation 
function clearproduct()
{
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";

}

// function read data 
function showData()
{
    let table = "";
    for(let i = 0;  i < dataproduct.length ; i++)
    {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataproduct[i].title}</td>
        <td>${dataproduct[i].price}</td>
        <td>${dataproduct[i].taxes}</td>
        <td>${dataproduct[i].ads}</td>
        <td>${dataproduct[i].discount}</td>
        <td>${dataproduct[i].total}</td>
        <td>${dataproduct[i].category}</td>
        <td><button onclick = "updataData(${i})" id="update">update</button></td>
        <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>

    </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table ;
    let btndeleteAll = document.getElementById("deleteAll");
    if(dataproduct.length > 0)
    {
        btndeleteAll.innerHTML = `
        <button onclick = "deleteAll()" id="delete">deleteALL[ ${dataproduct.length} ]</button>

        `
    }
    else{
        btndeleteAll.innerHTML  ="";
    }
    getTotal ();
    
}
showData();

// function delete product
function deleteData(i)
{
    dataproduct.splice(i,1);
    localStorage.products = JSON.stringify(dataproduct);
    showData();
}

// function delete ALL Data 
function deleteAll()
{
    localStorage.clear();
    dataproduct.splice(0);
    showData();
}


// funcation updata data 
function updataData(i)
{
    title.value = dataproduct[i].title;
    price.value = dataproduct[i].price;
    taxes.value = dataproduct[i].taxes;
    ads.value = dataproduct[i].ads;
    discount.value = dataproduct[i].discount;
    getTotal ();
    category.value = dataproduct[i].category;
    count.style.display = "none";
    submite.innerHTML = "Update";
    mood = "Update";
    tmp = i ;
    scroll({
        top:0, 
        behavior:"smooth",
    })
}


// function search data 
let moodSearch = "title";
function searchData(id)
{
    let search = document.getElementById("search");
    if(id=="searchTitle")
    {
        moodSearch = "title";
        search.placeholder = "search By title";
    }
    else{
        moodSearch = "category";
        search.placeholder = "search By category";

    }
    search.focus();
    search.value = "";
    showData();
    // console.log(moodSearch)
}

// function search 
function searchDataProduct(value)
{
    let table = "";
    if(moodSearch=="title")
    {
        for(let i = 0 ; i < dataproduct.length ; i++)
        {
            if(dataproduct[i].title.includes(value.toLowerCase()))
            {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataproduct[i].title}</td>
                <td>${dataproduct[i].price}</td>
                <td>${dataproduct[i].taxes}</td>
                <td>${dataproduct[i].ads}</td>
                <td>${dataproduct[i].discount}</td>
                <td>${dataproduct[i].total}</td>
                <td>${dataproduct[i].category}</td>
                <td><button onclick = "updataData(${i})" id="update">update</button></td>
                <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
        
            </tr>
                `
            }
            

            
        }
    }
    else{
        for(let i = 0 ; i < dataproduct.length ; i++)
        {
            if(dataproduct[i].category.includes(value.toLowerCase()))
            {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataproduct[i].title}</td>
                <td>${dataproduct[i].price}</td>
                <td>${dataproduct[i].taxes}</td>
                <td>${dataproduct[i].ads}</td>
                <td>${dataproduct[i].discount}</td>
                <td>${dataproduct[i].total}</td>
                <td>${dataproduct[i].category}</td>
                <td><button onclick = "updataData(${i})" id="update">update</button></td>
                <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
        
            </tr>
                `
            }
            

            
        }

    }

    document.getElementById("tbody").innerHTML = table ;
}



//funcation clean data 
//=> create new  product  by condation 
//=> control in count 
//=> بخلي العدد يظهر في الtable من 1 وليس ال0 
//=> 