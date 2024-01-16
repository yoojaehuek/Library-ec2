import React from "react";
import "./loantest.scss";

const LoanTest = () => {
  // const box1Content = <div><h2>Box 1</h2></div>;
  // const box2Content = <div><h2>Box 2</h2></div>;
  // const box3Content = <div><h2>Box 3</h2></div>;
  // const box4Content = <div><h2>Box 4</h2></div>;
  // const box5Content = <div><h2>Box 5</h2></div>;
  // const box6Content = <div><h2>Box 6</h2></div>;
  // const box7Content = <div><h2>Box 7</h2></div>;
  
  // const gridbox = [
  //   box1Content, box2Content, box3Content, box4Content,
  //   box5Content, box6Content, box7Content
  // ];
  {/* {gridbox.map((item, index) => (
    <div key={index} className={`grid-item box-${index+1}`}>{item}</div>
  ))} */}



  return (
    <form id="cart-container-yjh">
      <div className="grid-container">
        <div className="grid-item box-1"><div><h2>Box 1</h2></div></div>
        <div className="grid-item box-2"><div><h2>Box 2</h2></div></div>
        <div className="grid-item box-3"><div><h2>Box 3</h2></div></div>
        <div className="grid-item box-4"><div><h2>Box 4</h2></div></div>
        <div className="grid-item box-5"><div><h2>Box 5</h2></div></div>
        <div className="grid-item box-6"><div><h2>Box 6</h2></div></div>
        <div className="grid-item box-7"><div><h2>Box 7</h2></div></div>
        <div className="grid-item box-8"><div><h2>Box 8</h2></div></div>
      </div>
    </form>
  );
};

export default LoanTest;
