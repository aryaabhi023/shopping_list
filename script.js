const itemForm=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn=document.querySelector('#clear');
function addItem(e)
{
    e.preventDefault();
    if(itemInput.value=="")
    {
        alert("write something");
        return;
    }
 
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(itemInput.value));
    const button=create_button("remove-item btn-link text-red");
    const icon=create_icon("fas fa-xmark");
    button.appendChild(icon);
    li.appendChild(button);
    itemList.append(li);
    itemInput.value='';
}

function create_button(classes)
{
    const button=document.createElement('button');
    button.className=classes;
    return button;
}

function create_icon(classes)
{
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}

itemForm.addEventListener('submit',addItem);

function clearAll(){
    const list=document.querySelectorAll('li');
    console.log(list);
    list.forEach(item => {
        item.remove();      
    });
}
clearBtn.addEventListener('click',clearAll);

const logo=document.querySelector('img');
function OnClick()
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
logo.addEventListener('click',OnClick);

function onfocus(e){
      e.target.style.outlineStyle='solid';
      e.target.style.outlineColor='green';
      e.target.style.outlineWidth='2px';
}
function onblur(e){
      e.target.style.outlineStyle='none';
}
itemInput.addEventListener('focus',onfocus);
itemInput.addEventListener('blur',onblur);