import {useEffect, useState, useRef} from "react";
import styles from "./Hooks10.module.css";

// 2-6 useScroll
// user가 스크롤해서 무언갈 지나쳤을 때 이벤트 발생
const useScroll = () => {
  const [state, setState] = useState({
    x: 0,
    y: 0
  });

  const onScroll = () => {
    setState({y: window.scrollY, x: window.scrollX});
    //console.log("y ", window.scrollY, "x ", window.scrollX);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return() => window.removeEventListener("scroll", onScroll);
  
  }, []);

  return state;
};

// 2-6 useFullscreen
const useFullscreen = (callback) => {
  const element = useRef();

  const triggerFull = () => {
    if(element.current) {
      // Browser마다 함수명이 다름. 크롬은 requestFullscreen
      element.current.requestFullscreen(); // 대소문자주의^q^!
      
      if(callback && typeof callback === "function") callback(true);
    }
  };

  const exitFull = () => {
    document.exitFullscreen();
    if(callback && typeof callback === "function") callback(false);
  };

  return {element, triggerFull, exitFull};
};

function Hooks10_2() {  
  // 2-6 useScroll
  const {y} = useScroll();

  // 2-6 useFullscreen
  const onFullS = (isFull) => {
    console.log(isFull ? "We are Full" : "We are small")
  };

  const {element, triggerFull, exitFull} = useFullscreen(onFullS);

  return (    
    <div style={{height: "1000vh"}}>
      <h1 className={styles.title}>Hooks 테스트 페이지 3</h1>      
      
      <div>
        <h2>2-6. (1)useScroll</h2>               
        {/* position: "fixed"를 사용하면 스크롤을 내릴 경우 다른건 지나가도 동일한 위치에 고정되어 떠있음. */}
        <p style={{ position: "fixed", color: y > 200 ? "red" : "blue"}}>내려가유 올라가유?</p>
      </div>
      <hr/>

      <div>
        <h2>2-6. (2)useFullscreen</h2>               
        <button onClick={triggerFull}>Make Fullscreen</button>
        
        
        <div ref={element}>
          <img             
            alt="멸망짤"
            src="https://i.pinimg.com/736x/fa/56/33/fa5633a3e97a08f7e084a7adec2d6e77.jpg"
          />
          {/** img랑 같은 div안에 넣어야 전체화면 되었을때도 해당 버튼이 보임. */}
          <button onClick={exitFull} style={{ display: 'block'}}>Exit Fullscreen</button>
        </div>
      </div>
      <hr/>

      <div>
        <h2>2-7. useNotification</h2>               
        <p>기다려봐유</p>
      </div>
      <hr/>

      <div>
        <h2>2-8. useAxios</h2>               
        <p>기다려봐유</p>
      </div>
      <hr/>

      <div>
        <h2>2-9. Conclusions</h2>               
        <button>올려봐유</button>
      </div>
      <hr/>      
    </div>
  );
}

export default Hooks10_2;