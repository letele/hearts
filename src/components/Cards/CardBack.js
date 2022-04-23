import { useContext } from "react"
import { UIContext } from "../Context"
import { cardImgs } from "../../imgs"

function CardBack() {

    const {background} = useContext(UIContext)

    const img = cardImgs[background[0]]

    return (
        <div 
            className='card-back'
            style={{backgroundImage:`url(${img})`}}    
        ></div>
    )
}

export default CardBack