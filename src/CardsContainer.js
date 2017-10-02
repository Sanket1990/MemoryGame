import React, { Component } from 'react';
import Card from './Card.js';

class CardsContainer extends Component {
    constructor(props) {
        super(props);
        this.showCards = this.showCards.bind(this);
    }
    showCards() {
        var gridSize = this.props.gridSize;
        var grid = [];
        var valueArray = this.props.setupData;
        for(let i=0;i<gridSize*gridSize;i=i+ parseInt(gridSize)) {
            for(let j=0;j<gridSize;j++) {
                grid.push(
                    <Card
                        key={i+"-"+j}
                        keyVal={i+j}
                        cardValue={valueArray[i+j]}
                        cardOnClickHandler={this.props.cardOnClickHandler}
                        card1Value = {this.props.card1Value}
                        card2Value = {this.props.card2Value}
                        card1Key = {this.props.card1Key}
                        card2Key = {this.props.card2Key}
                        resetState = {this.props.resetState} />
                );
            }
            grid.push(<br key={i}/>);
        }            
        return grid;
    }    
    render() {
        var cards = this.props.showCardsContainer ? this.showCards() : [];
        return (
            <div>
                <h1>Size: {this.props.gridSize}</h1>
                {cards}
            </div>
        );
    }
}

export default CardsContainer;