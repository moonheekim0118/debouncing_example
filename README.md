# Debouncing Expample 
<img src="demo/demo.gif?raw=true"/>
<br/>
- 검색창에 Input 이벤트 리스너 등록
- timer를 설정해놔서 900ms 내에 Input이 들어올 시, timer 삭제후 다시 900ms setTimeout
- Input 이벤트 후에 최소 900ms 지나서 ajax 요청 보내도록 함
