export default function GameCards({card , onCardClick}){
    return (
    <div className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`} 
    onClick={() => onCardClick(card)} >
        <div className="card-inner" >
            <div className="card-back">{card.value}</div>
            <div className="card-front">?</div>
        </div>
     </div>
    )   
}


        /* {card.isFlipped ? <div className="card-front">{card.value}</div> : <div className="card-back">?</div>} */