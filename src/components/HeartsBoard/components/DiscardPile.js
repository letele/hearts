import { useContext} from "react"
import {CardFront} from "../../Cards"
import { HeartsContext } from "../../Context"

function DiscardPile(){
    const { 
        eastDiscard, westDiscard, northDiscard, southDiscard,
    } = useContext(HeartsContext)

    const color = i =>
    ({color: (i.includes('♦') || i.includes('♥')) && 'red'})
     
    const Discard = ({id, card}) => card &&
    <div
        id={`${id}-card`}
        className="table-card"
        style={{...color(card.join('')) }}
    >
        <CardFront value={card} />
    </div>  
    
    return (   
        <>
            <Discard id={'west'} card={westDiscard} />
            <Discard id={'north'} card={northDiscard} />
            <Discard id={'east'} card={eastDiscard} />
            <Discard id={'south'} card={southDiscard} />
        </>
    )
}

export default DiscardPile