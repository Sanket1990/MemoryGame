import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked : false,
            timeout : null,
            matchFound : false,
            cardKey : null
        };
        this.getCardNumber = this.getCardNumber.bind(this);
        this.cardOnClick = this.cardOnClick.bind(this);
        this.flipCard = this.flipCard.bind(this);
    }
    getCardNumber() {
        return (   
            <div className="card-number">         
                <h1>{this.props.cardValue}</h1>
            </div>               
        );
    }
    cardOnClick() {
        let val = this.props.cardValue;
        let key = this.props.keyVal;
        let timeoutVar;
        if(this.props.card1Value === 0 || this.props.card2Value === 0) {
            timeoutVar = setTimeout(()=>{
                this.setState({
                    clicked : false,
                    timeout : null
                });
                this.props.resetState();
            }, 6000);
            this.setState({
                clicked : true,
                timeout : timeoutVar
            });
            this.props.cardOnClickHandler(val, key);
        }
    }
    dontFlipCard() {
        let timeoutVar;
        timeoutVar = this.state.timeout;
        clearTimeout(timeoutVar);
        this.setState({
            matchFound : true
        });
    }
    flipCard() {
        let timeoutVar;
        timeoutVar = this.state.timeout;
        clearTimeout(timeoutVar);
        setTimeout(()=>{
            this.setState({
                clicked : false,
                timeout : null
            });
            this.props.resetState();
        }, 200);
    }
    render() {
        this.state.matchFound ? null : (this.props.card1Value !== 0 && this.props.card2Value !== 0 && (this.props.card1Value === this.props.card2Value) && ((this.state.cardKey === this.props.card1Key)||(this.state.cardKey === this.props.card2Key)) && ((this.props.card1Key !== this.props.card2Key))) ? this.dontFlipCard() : null;
        this.state.matchFound ? null : (this.props.card1Value !== 0 && this.props.card2Value !== 0 && (this.props.card1Value !== this.props.card2Value)) ? this.flipCard() : null;
        var cardNumber = this.state.clicked ? this.getCardNumber() : null;
        var cardClass = this.state.clicked ? "card" : "card card-back"
        return (
            <div className={cardClass} onClick={this.cardOnClick} value={this.props.keyVal}>
                {cardNumber}                
            </div>
        );        
    }
    componentWillMount() {
        this.setState({
            cardKey : this.props.keyVal
        });        
    }
}

export default Card;