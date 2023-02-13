/** App component 전체를 가지고 있는 홈 라우트 */
import {useEffect, useState, useRef} from "react";
import styles from "./Hooks10.module.css";

// 2-1
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");
    htmlTitle.innerHTML = title;
  }
  useEffect(updateTitle, [title]);
  return setTitle;
};

// 2-2
// <h3 ref={title}>누르면 인사를 해요~! </h3>  의 클릭이벤트가 안먹는이유가 뭐야?
const useClick = (onClick) => {  
  console.log("typeof onClick >> " + typeof onClick);
  const ref = useRef();
  
  useEffect(() => {
    const element = ref.current;

    // componentDidMount 일때 동작(mount될때)
    if(element) {
      element.addEventListener("click", onClick);
    } 

    // componentWillUnMount가 될때 addEventListener를 지워주기(mount되지 않을때)
    return () => {
      if(element) {
        element.removeEventListener("click", onClick);
      }  
    };
  }, [onClick]);
  return ref.current;
};

function Hooks10_2() {  
  // 2-0
  const sayHello = () => console.log("Hello");

  const [number, setNumber] = useState(0);
  const [anumber, setAnumber] = useState(0);  

  // 2-1 
  const titleUpdater = useTitle("로딩중... ");
  setTimeout(() => titleUpdater("TestPage2"), 3000); // 3초뒤 타이틀 바뀜

  // 2-2
  // reference 는 기본적으로 component의 어떤 부분을 선택할 수 있는 방법
  const tmpRef = useRef();
  //setTimeout(() => console.log(tmpRef.current), 4000);
  setTimeout(() => tmpRef.current.focus(), 4000);

  const title = useClick(sayHello);

  return (    
    <div>
      <h1 className={styles.title}>Hooks 테스트 페이지 2</h1>      
        
      <div>
        <h2>2-0. useEffect</h2>               
        <button onClick={() => setNumber(number + 1)}>{number}</button>
        <button onClick={() => setAnumber(anumber + 1)}>{anumber}</button>
      </div>

      <div>
        <h2>2-1. useTitle</h2>                               
      </div>
      <div>
        <h2>2-2. useClick - What is Reference ? </h2>         
        <input ref={tmpRef} placeholder="lalala" />
      </div>
      
      <div>
        <h2>2-2. useClick</h2>                     
        {/* 왜 클릭이벤트가 안먹힐까.... */}
        <h3 ref={title}>누르면 인사를 해요~! </h3>          
      </div>

    </div>
  );
}

export default Hooks10_2;