import React from 'react';
import './style/common.css'
import { invoke } from '@tauri-apps/api/tauri';

function App() {
  function cl() {
    invoke('greet', {name:"world"}).then((resp) => console.log(resp))
  }
  return (
    <div className="wrapper">
      <div className="main">
        <div className="sidebar"></div>
        <div className="content"></div>
      </div>
      <div className="footer">
        <button onClick={cl} >点我</button>
      </div>
    </div>
  );
}

export default App;
