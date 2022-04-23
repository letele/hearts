import { useContext } from "react"
import { UIContext } from "../../../Context"
import {cardImgs, boardImgs} from "./../../../../imgs"

function Appearance(){
    
    const{
        boardBackground, setBoardBackground,
        cardBackground , setCardBackground,
        checked, setChecked,
    } = useContext(UIContext)

    const handleChange = () => {
        setChecked(!checked);
    }

    return ( 
        <section id="appearance">
            <span>Select Card Deck</span>
            <ul>{Object.keys(cardImgs).map(i =>
                <li key={i} onClick={() => setCardBackground(i)}>
                    <img 
                        alt={i}  
                        className={`deck-background
                            ${cardBackground===i && 'bordered'}
                        `}
                        src={`${cardImgs[i]}`}
                    />
                    <div 
                        className={
                            `label 
                            ${cardBackground===i && 'colored'}`
                        }
                    >{i}</div>
                </li>
            )}</ul>

            <span>Select Background</span>
            <ul>{Object.keys(boardImgs).map( i =>
                <li key={i} onClick={() => setBoardBackground(i)}>
                    <div  className={`wrapper
                            ${boardBackground===i && 'bordered'}
                        `}
                    ><div 
                        className="board-background"
                        style={{
                            backgroundImage: `url(${boardImgs[i]})`
                        }}
                    ></div></div>
                     <div 
                        className={
                            `label 
                            ${boardBackground===i && 'colored'}`
                        }
                    >{i}</div>
                </li>
            )}</ul>
             
            <label>
                <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={handleChange}
                />
                Randomly select background and deck
            </label>
            
        </section>
    )
}

export default Appearance