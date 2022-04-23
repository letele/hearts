import { useContext } from "react";
import { ImArrowLeft , ImArrowRight, ImArrowUp} from "react-icons/im";
import { HeartsContext } from "../../Context";


function Arrows() {
    const {
        playerIIICards,
        compIIICards, 
        hand,
        passCards,
    } = useContext(HeartsContext)

    const handleClick = () => 
    playerIIICards.length===3 && passCards(playerIIICards)

    return ( compIIICards &&
        <>
            {hand%4===0 &&  
            <ImArrowLeft 
                id="arrow"
                onClick={handleClick}
            />}

            {hand%4===1 && <ImArrowRight 
                id="arrow"
                onClick={handleClick}
            />}

            {hand%4===2 &&  <ImArrowUp 
                id="arrow"
                onClick={handleClick}
            />}
        </>
    )
}

export default Arrows