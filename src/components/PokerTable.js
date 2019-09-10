import React, {Component} from 'react';
import './PokerTable.css';
import PokerHand from './PokerHand';
import Deck from '../untilityClasses/Deck';
import Chips from '../untilityClasses/Chips';


class PokerTable extends Component{
    constructor(){
        super();
        this.deck = new Deck();
        this.deck.create();
        this.deck.shuffle();
        this.chips = new Chips();
    
        this.state = {
            playerHand: ['deck','deck'],
            communityHand: ['deck','deck','deck','deck','deck'],
            dealerHand: ['deck','deck'],
            wager: 0,
            bankroll: 100
        }
    }

    checkHandRank = () => {
        //10 = T, 11= J, 12 = Q, 13 = K, 1 = A
        console.log(...this.state.playerHand)
        let playerPlusComm = [...this.state.playerHand,...this.state.communityHand];
        let dealerPlusComm = [...this.state.dealerHand,...this.state.communityHand];
        let newPlayerPlusComm = playerPlusComm.map((card)=> {
            return card.replace(/10/g,'T').replace(/11/g,'J').replace(/12/g,'Q').replace(/13/g,'K').replace(/1/g,'A')
        })
        let newDealerPlusComm = dealerPlusComm.map((card)=> {
            return card.replace(/10/g,'T').replace(/11/g,'J').replace(/12/g,'Q').replace(/13/g,'K').replace(/1/g,'A')
        })

        const playerHandRank = window.Hand.solve(newPlayerPlusComm);
        const dealerHandRank = window.Hand.solve(newDealerPlusComm);
        const winner = window.Hand.winners([playerHandRank,dealerHandRank])
        if(playerHandRank.name == winner[0].name){
            this.setState({
                msg: 'Player Wins!'
            })
            console.log(this.state.msg)
        } else {
            this.setState({
                msg: 'Dealer Wins!'
            })
            console.log(this.state.msg)
        }
    }
    
    // 
    prepDeck = () => {
        const card1 = this.deck.cards.shift();
        const card2 = this.deck.cards.shift();
        const card3 = this.deck.cards.shift();
        const card4 = this.deck.cards.shift();
        this.setState({
            playerHand: [card1,card3],
            dealerHand: [card2,card4]
        })
    }

    flop = () => {
        const card1 = this.deck.cards.shift();
        const card2 = this.deck.cards.shift();
        const card3 = this.deck.cards.shift();
        this.setState({
            communityHand: [card1,card2, card3, 'deck', 'deck']
        })
    }

    bet = (amount) => {
        const newWager = this.state.wager + amount;
        const newBankroll = this.state.bankroll - amount;
        if(newBankroll >= 0){
            this.setState({
                wager: newWager,
                bankroll: newBankroll
            })
        } else {
            this.setState({
                msg: "You're out of money bitch"
            },this.clearMsg)
        }
    }


    clearMsg = () => (
        setTimeout(()=>{
            this.setState({
                msg: ""
            })
        },2000)
    )

    check = () => {
        let communityNewHand = [...this.state.communityHand]
        if(communityNewHand[0] === 'deck'){
            communityNewHand = [
                this.deck.cards.shift(),
                this.deck.cards.shift(),
                this.deck.cards.shift()
            ]
        }else{
            communityNewHand.push(this.deck.cards.shift())
            }
        
        if(communityNewHand.length === 5){
            this.checkHandRank()
        }
        this.setState({
            communityHand: communityNewHand
        })
    }
    

    fold = () => {
        
    }

    render(){
        return(
            <div className='the-table col-sm-12'>
                <div className="col-sm-12 center the-numbers">
                    <div className="col-sm-3 col-sm-offset-3">
                        Current Pot: ${this.state.wager}   
                    </div>
                    <div className="col-sm-3">
                        Bankroll: ${this.state.bankroll}
                    </div>
                </div>
                <div className="msg">
                    {this.state.msg}
                </div>
                <PokerHand cards={this.state.dealerHand} />
                <PokerHand cards={this.state.communityHand} />
                <PokerHand cards={this.state.playerHand} />
                <div className="col-sm-12">
                    <button onClick={this.prepDeck} className="btn btn-primary">Deal</button>
                    <button onClick={this.flop} className="btn btn-primary">Flop</button>
                    <button onClick={() => {this.bet(5)}} className="btn btn-success">Bet5</button>
                    <button onClick={this.check} className="btn btn-warning">Check</button>
                    <button onClick={this.fold} className="btn btn-danger">Fold</button>
                </div>
            </div>
        )
    }
}

export default PokerTable;