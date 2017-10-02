import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardsContainer from './CardsContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame : false,
      gridSize : 0,
      setupData : [],
      card1Value : 0,
      card2Value : 0,
      card1Key : null,
      card2Key : null,
      startTime : null,
      remainingCards: 0
    }
    this.getHeader = this.getHeader.bind(this);
    this.handleCardOnClick = this.handleCardOnClick.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.goOnClick = this.goOnClick.bind(this);
    this.resetState = this.resetState.bind(this);
    this.getWinnerText = this.getWinnerText.bind(this);
    this.updateRemainingCards = this.updateRemainingCards.bind(this);
    this.getLastFiveTimes = this.getLastFiveTimes.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }
  resetState() {
    this.setState({
      card1Value : 0,
      card2Value : 0
    });
  }
  updateRemainingCards() {
    var current_remaining = this.state.remainingCards;
    this.setState({
      remainingCards : current_remaining - 2,
      card1Value : 0,
      card2Value : 0,
      card1Key : null,
      card2Key : null
    });
  }
  handleCardOnClick(val, key) {
    if(this.state.card1Value === 0)
        this.setState({
          card1Value : val,
          card1Key : key
        });
    else if((this.state.card2Value === 0) && (this.state.card1Key !== key))
        this.setState({
          card2Value : val,
          card2Key : key
        });
  }
  inputChangeHandler(evt) {
    this.setState({
      gridSize : evt.target.value,
      showCardsContainer : false,
      card1Value : 0,
      card2Value : 0,
      card1Key : null,
      card2Key : null
    });
  }
  goOnClick() {
    var arr = this.getArray();
    var gridsize = this.state.gridSize;
    this.setState({
      newGame : true,
      showCardsContainer : true,
      setupData : arr,
      card1Value : 0,
      card2Value : 0,
      card1Key : null,
      card2Key : null,
      startTime : new Date().getTime(),
      remainingCards : gridsize*gridsize
    });
  }
  getArray() {
    var countArray = [];
    var valueArray = [];
    var gridSize = this.state.gridSize;
    var gridSizeSquare = gridSize * gridSize;
    for(var i=0;i<=gridSizeSquare/2;i++)
        countArray.push(0);

    for(var j=0; j<gridSizeSquare;) {
        var value = Math.floor(Math.random()*(gridSizeSquare/2)) + 1;
        if(countArray[value] === 2)
            continue
        else {
            countArray[value]++;
            valueArray.push(value);
            j++;
        }
    }
    return valueArray;
  }
  getLastFiveTimes() {
    var obj = JSON.parse(sessionStorage.getItem("times"));
    obj = obj.reverse()
    if(obj.length > 5)
      obj = obj.slice(0, 5);
    var times = [];
    obj.map(function(each, index){
      times.push(
        <h4>{index+1}. {each} seconds</h4>
      );
    });
    return times;
  }
  getWinnerText() {
    var startTime = this.state.startTime;
    var endTime = new Date().getTime();
    var timeTaken = (endTime - startTime)/1000;
    var lastFive = null;
    if((this.state.card1Value !== 0) && (this.state.card2Value !== 0) && (this.state.card1Value === this.state.card2Value) && (this.state.card1Key !== this.state.card2Key)) {
      if(this.state.remainingCards === 2) {
        var obj = JSON.parse(sessionStorage.getItem("times"));
        obj.push(timeTaken);
        sessionStorage.setItem("times", JSON.stringify(obj));
        lastFive = this.getLastFiveTimes();        
        return (
          <div>
            <h1>You Win !!!</h1>
            <h2>Time Taken : {timeTaken} seconds</h2>
            <h3>Last 5 Performances</h3>
            <div>{lastFive}</div>
            <button type="button" className="btn btn-primary" onClick={this.startNewGame}>Start Over</button> 
          </div>
        );
      } else {
        this.updateRemainingCards();
      }
    }
  }
  getHeader() {
    return (
      <div className="App-header">
        <h1>Enter Size</h1>
        <div className="input-group text-width input-grp-padding">        
        <input type="text" className="form-control" placeholder="Grid Size" onChange={this.inputChangeHandler}></input>
        <span className="input-group-btn">
          <button type="button" className="btn btn-primary" onClick={this.goOnClick} disabled={(this.state.gridSize >= 2) && (this.state.gridSize%2 === 0) ? false : true}>GO</button>
        </span>
      </div>
    </div>
    );
  }
  getCardsContainer() {
    return (
      <CardsContainer
        gridSize = {this.state.gridSize}
        showCardsContainer = {this.state.showCardsContainer}
        setupData = {this.state.setupData}
        cardOnClickHandler = {this.handleCardOnClick}
        card1Value = {this.state.card1Value}
        card2Value = {this.state.card2Value}
        card1Key = {this.state.card1Key}
        card2Key = {this.state.card2Key}
        resetState = {this.resetState} />
    );
  }
  startNewGame() {
    this.setState({
      newGame : false,
      gridSize : 0,
      setupData : [],
      card1Value : 0,
      card2Value : 0,
      card1Key : null,
      card2Key : null,
      startTime : null,
      remainingCards: 0
    });
  }
  render() {
    var winnerText = this.getWinnerText();
    var header = (!this.state.newGame) ? this.getHeader() : null;
    var cardsContainer = (this.state.newGame) ? this.getCardsContainer() : null;
    return (
      <div className="App">
        {header}
        {cardsContainer}
        {winnerText}
      </div>
    );
  }
  componentWillMount() {
    sessionStorage.setItem("times", JSON.stringify([]));
  }
}

export default App;;