import React from 'react'

function Card(props){
    // console.log(props)
    const thisCard = `./cards/${props.card}.png`
    return(
        <div className="col-sm-2 card">
            <img src={thisCard} />
        </div>
    )
}

export default Card;