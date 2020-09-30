# Debouncing Expample 
<img src="demo/demo.gif?raw=true"/>
<br/>

- 검색창에 Input 이벤트 리스너 등록
- timer를 설정해놔서 900ms 내에 Input이 들어올 시, timer 삭제후 다시 900ms setTimeout
- Input 이벤트 후에 최소 900ms 지나서 ajax 요청 보내도록 함


```javascript
const debouncing=(func,limit)=>{
    let debouncing;
    // debouncing 실행컨텍스트는 처음에 호출과 함께 종료되어서 event에 접근할 수 없음
    return function(event){ // 이벤트 리스너의 콜백함수이므로 event 위임
        const value=event.target.value;
        if(debouncing){ // 900ms가 지나지 않았는데 input 이벤트가 들어왔다면
            clearTimeout(debouncing); // 다시 900ms 세기 
        }
        debouncing=setTimeout(func.bind(this,value),limit); // Input 이벤트 발생후 최소 900ms 이후에 ajax 요청 보내기 
    }
}

$input.addEventListener('input', debouncing(sendRequest,900));

```
<br/>

- addEventListener에서 debouncing 함수 호출과 함께 debouncing 함수 자체의 실행 컨텍스트는 종료
    - 따라서 return 되는 함수 외부에서 event 접근 불가 (처음에는 undefined라고 뜨고 그 후에는 아예 접근이 안된다. 실행컨텍스트가 종료되었으므로)
    - return 되는 함수는 이벤트 리스너의 콜백 함수이므로 event 접근 가능 
- debouncing 변수는 클로저에 의해서 계속 참조 가능