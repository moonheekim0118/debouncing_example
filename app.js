const $input = document.querySelector('.search');
const $list = document.querySelector('.list');
let xhr = new XMLHttpRequest();

const showKeyWord=(contents)=>{
    $list.innerHTML=``;
    let child;
    $list.classList.add('show');
    if(contents===null){
        child = document.createElement('p');
        child.innerText=`no result for ${keyword}`;
        $list.appendChild(child);
        return;
    }
    let maxLen= contents.length >5? 5:contents.length-1 ;
    for(let i =0; i<=maxLen;i++){
        child = document.createElement('p');
        child.innerText=contents[i].strMeal;
        $list.appendChild(child);
    }

}

const sendRequest= async(keyword)=>{
    if(keyword.length===0){
        $list.innerHTML=``;
        $list.classList.remove('show');
        return;
    }
    await xhr.open("GET",`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`,true);
    await xhr.send();
    console.log('ajax 요청 보냄');
    xhr.onload=()=>{
        const contents=JSON.parse(xhr.responseText).meals; 
        showKeyWord(contents);
    }
}

const debouncing=(func,limit)=>{
    let inDebounce;
    // debouncing 실행컨텍스트는 처음에 호출과 함께 종료되어서 event에 접근할 수 없음
    return function(event){ // 이벤트 리스너의 콜백함수이므로 event 위임
        const value=event.target.value;
        const context=this;
        if(inDebounce){ // 900ms가 지나지 않았는데 input 이벤트가 들어왔다면
            clearTimeout(inDebounce); // 다시 900ms 세기 
        }
        inDebounce=setTimeout(func.bind(context,value),limit); // Input 이벤트 발생후 최소 900ms 이후에 ajax 요청 보내기 
    }
}

$input.addEventListener('input', debouncing(sendRequest,900));
