const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn=document.querySelector('#clear');
const logo=document.querySelector('img');
const filter=document.getElementById('filter');

//function to accsess the item back from local storage on refresh and reload.
function displayItem()
{
    let listArray=getItemFromLocalStorage();
    listArray.forEach(item=>{
        additemTODOM(item);
    });
    check_ui();
}

//ON submitting the form this function will be call.
function addItemonsubmit(e)
{
    e.preventDefault();
    if(itemInput.value=="")
    {
        alert("write something");
        return;
    }
    const newItem = itemInput.value;
    additemTODOM(newItem);
    additemTOLocalStorage(newItem);
    check_ui();
    itemInput.value='';
}

//function to add item in dom
function additemTODOM(item)
{
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button=create_button("remove-item btn-link text-red");
    const icon=create_icon("fas fa-xmark");
    button.appendChild(icon);
    li.appendChild(button);
    itemList.append(li);
}

//function to add item in Local Storage
function additemTOLocalStorage(items)
{
    let listArray=getItemFromLocalStorage();
    if(localStorage.getItem('item')===null)
    {
        listArray=[];
    }
    else
    {
        listArray=JSON.parse(localStorage.getItem('item'));
    }
    listArray.push(items);
    localStorage.setItem('item',JSON.stringify(listArray));
}

//function to get items from local Storage.
function getItemFromLocalStorage(){
    let listArray;
    if(localStorage.getItem('item')===null)
    {
        listArray=[];
    }
    else
    {
        listArray=JSON.parse(localStorage.getItem('item'));
    }
    return listArray;
}

//function to create button
function create_button(classes)
{
    const button=document.createElement('button');
    button.className=classes;
    return button;
}

//function to create icon
function create_icon(classes)
{
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}

//function to clear all item in item list
function clearAll(){
    const list=document.querySelectorAll('li');
    alert("Are you sure?");
    list.forEach(item => {
        item.remove();      
    });
    localStorage.clear();
    check_ui();
}


//function to change color when icon is clicked
function img_effect()
{
    if(document.body.style.backgroundColor!=='purple')
    {
        document.body.style.backgroundColor='purple';
        document.body.style.color='white';
    }
    else
    {
        document.body.style.backgroundColor='#f5f5f5';
        document.body.style.color='';
        
    }
}

//adding effects function
function onfocus(e){
    e.target.style.outlineStyle='solid';
    e.target.style.outlineColor='green';
    e.target.style.outlineWidth='2px';
}
function onblur(e){
    e.target.style.outlineStyle='none';
}
//passing the item to be delected
function onclick(e){
    if(e.target.parentElement.classList.contains('remove-item'))
    {
        removeItem(e.target.parentElement.parentElement);
    }
}

//function to remove item
function removeItem(item){
    item.remove();
    removeFromStorage(item.textContent);
    check_ui();
}

//function to remove item from local storage
function removeFromStorage(text)
{
    let list=getItemFromLocalStorage();
    list=list.filter((items)=>items!==text);
    localStorage.setItem('item',JSON.stringify(list));
}

//function to check there is any item or not and hide the filter and clear all btn
function check_ui(){
    const items=itemList.querySelectorAll('li');
    if(items.length===0)
    {
        filter.style.display='none';
        clearBtn.style.display='none';
    }
    else
    {
        filter.style.display='block';
        clearBtn.style.display='block';
    }
}

//function to filter the items
function OnInput(){
    const text=filter.value.toLowerCase();
    const items=itemList.querySelectorAll('li');
    items.forEach(item=>{
        const itemName=item.firstChild.textContent.toLowerCase();
        if(itemName.search(text)!=-1){
            item.style.display='flex';
        }
        else{
            item.style.display='none';
        }
    });
}


//ALL function calls 
check_ui();
itemForm.addEventListener('submit',addItemonsubmit);
clearBtn.addEventListener('click',clearAll);
logo.addEventListener('click',img_effect);
itemList.addEventListener('click',onclick);
itemInput.addEventListener('focus',onfocus);
itemInput.addEventListener('blur',onblur);
filter.addEventListener('input',OnInput);
document.addEventListener("DOMContentLoaded",displayItem);

