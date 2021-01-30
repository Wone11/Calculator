
import './App.css';
import React from 'react'
import Button from './Components/Button';
import "./Css/style.css"

class  App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      current:'0',
      previous:[],
      nextIsReset:false
    }
  }
//reset button function
  Reset =()=>{
    this.setState({current:'0',previous:[],nextIsReset:false})
  }

  AddCurrent =(symbol)=>{
    if(["/","+","-","*"].indexOf(symbol)>-1){
      let {previous} = this.state;
      previous.push(this.state.current + symbol);
      this.setState({previous,nextIsReset:true});
    }
   else{
    if((this.state.current==="0" && symbol !==".")||this.state.nextIsReset) {
      this.setState({current: symbol,nextIsReset:false});
    }
    else{
      this.setState({current:this.state.current + symbol});
    }
   }
  }
//when we click  equal sign ...calculations Done!!!
  Calculate =(symbol)=>{
    let {current,previous,nextIsReset} = this.state;
    if(previous.length>0){
      current=eval(String(previous[previous.length-1] + current));
      this.setState({current,previous:[],nextIsReset:false});
    }
  }
  render(){
    const buttons =[
      {symbol:'c', cols:3,action:this.Reset},
      {symbol:'/', cols:1,action:this.AddCurrent},
      {symbol:'7', cols:1,action:this.AddCurrent},
      {symbol:'8', cols:1,action:this.AddCurrent},
      {symbol:'9', cols:1,action:this.AddCurrent},
      {symbol:'*', cols:1,action:this.AddCurrent},
      {symbol:'4', cols:1,action:this.AddCurrent},
      {symbol:'5', cols:1,action:this.AddCurrent},
      {symbol:'6', cols:1,action:this.AddCurrent},
      {symbol:'-', cols:1,action:this.AddCurrent},
      {symbol:'1', cols:1,action:this.AddCurrent},
      {symbol:'2', cols:1,action:this.AddCurrent},
      {symbol:'3', cols:1,action:this.AddCurrent},
      {symbol:'+', cols:1,action:this.AddCurrent},
      {symbol:'0', cols:2,action:this.AddCurrent},
      {symbol:'.', cols:1,action:this.AddCurrent},
      {symbol:'=', cols:1,action:this.Calculate}
    ];

    return (
      <div className="App">
        {this.state.previous.length>0 ?
        <div className="floaty-last" >{this.state.previous[this.state.previous.length-1]}</div>
        :null}
        <input className="result" type="text" value={this.state.current} />

        {buttons.map((btn,index)=>{
          return<Button key={index} symbol ={btn.symbol} cols ={btn.cols} action={(symbol)=>btn.action(symbol)} />
        })}
      </div>
    );
  }
}
export default App;
