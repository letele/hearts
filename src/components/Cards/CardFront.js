import { v4 as uuidv4 } from 'uuid';
import './../../fonts/stylesheet.css'
import './styles.css'

function CardFront({value}){

    const rank = value[0]==='A' ? 
    1 : parseInt(value[0]) && parseInt(value[0])

    const val = value[0]==="10" ? 
    String.fromCharCode(61) : value[0]

    const suitNames = [ "C", "D", "S", "H"]
    const suits =  ['♣', '♦', '♠', '♥']
    const suitName = suitNames[suits.indexOf(value[1])]

    return (
        <div className={`card-front`}>
            <div id={`ct${value[0]}`} className="top-left-value">
                <div className='val-rank'>{val}</div>
                <div className='val-suit'>{value[1]}</div>
            </div>
         
            <div 
                className={`${value[0]}${suitName} C${value[0]} card-face`}  
            >
                {Number.isInteger(rank) && [...Array(rank)]
                .map( () => <div key={uuidv4()} >{value[1]}</div> )}
            </div>
            
            <div id={`cb${value[0]}`} className="bottom-right-value">
                <div className='val-rank'>{val}</div>
                <div className='val-suit'>{value[1]}</div>
            </div>
        </div>
    )

}

export default CardFront