const $input = document.querySelector('.search');
const $list = document.querySelector('.list');
let xhr = new XMLHttpRequest();

const sendRequest= async(keyword)=>{
    if(keyword.length===0){
        $list.innerHTML=``;
        $list.classList.remove('show');
        return;
    }
    const open=await xhr.open("GET",`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`,true);
    const respons= await xhr.send();
    console.log('ajax 요청 보냄');
    xhr.onload=()=>{
        $list.innerHTML=``;
        const contents=JSON.parse(xhr.responseText); 
        // 최대 5개까지.
        let child;
        $list.classList.add('show');
        if(contents.meals===null){
            child = document.createElement('p');
            child.innerText=`no result for ${keyword}`;
            $list.appendChild(child);
            return;
        }
        let maxLen= contents.meals.length >5? 5:contents.length-1 ;
        for(let i =0; i<=maxLen;i++){
            child = document.createElement('p');
            child.innerText=contents.meals[i].strMeal;
            $list.appendChild(child);
        }

    }
}

let timer;
$input.addEventListener('input',(e)=>{
    if(timer){
        clearTimeout(timer); 
    }
    timer = setTimeout(()=>{
        sendRequest(e.target.value);
    },900);
});
