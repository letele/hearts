import { useContext } from "react"
import { v4 as uuidv4 } from 'uuid';

import { HeartsContext } from "../../Context"
import  { CardBack, CardFront } from "../../Cards"

function Hand({list,hand}) {


    const {
        compIIICards,
        playerIIICards,
        checkCard, discardThree,  
        handOver,
    } = useContext(HeartsContext)

    
    const cond = (i) => 
    ((compIIICards && compIIICards[hand].includes(i)) 
    || i.includes('passed')) && "18%"

    const condII = i => (playerIIICards.includes(i) || i[2]) && "18%" 

    const color = i =>
    ({color: (i.includes('♦') || i.includes('♥')) && 'red'})

    const nStyles = (i,j) => ({left:`${j*6.85}%`, top: cond(i)})

    const wStyles = (i,j) => ({left:cond(i), top:`${j*5.88}%`})

    const eStyles = (i,j) => ({right:cond(i), top:`${j*5.88}%`})
    
    const sStyles = (i,j) => ({bottom:condII(i), left:`${j*7.48}%`})

    const styles = (id,i,j) => 
    id==="north" ? nStyles(i,j) : (
        id==="west" ? wStyles(i,j) : (
            id==="east" ? eStyles(i,j) : sStyles(i,j)
        )
    )

    const handleClick = i => {
        compIIICards ? discardThree(i) : checkCard(i,list)
    }

    const Cards = ({list}) => {

        
        return  (list.map((i,j) =>
            <li
                key={uuidv4()}
                style={ {...color(i),...styles(hand,i,j)}}
                className='card'
                onClick={() => hand==='south'&&handleClick(i)}
            >
                {hand==="south"||handOver ? 
                <CardFront value={i}/> : <CardBack/>}
            </li>
        ))
    }

    return <Cards list={list} /> 
}

export default Hand