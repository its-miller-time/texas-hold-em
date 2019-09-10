import React, {Component} from 'react'
import Card from './Card'

function PokerHand(props){
    let hand = props.cards.map((card,i)=>{
        return(
            <Card key={i} card={card} />
        )
    })
    return(
        <div className="poker-hand col-sm-12">
            {hand}
        </div>
    )
}


// class PokerHand extends Component{
//     render(){
//         return
//     }
// }

export default PokerHand;