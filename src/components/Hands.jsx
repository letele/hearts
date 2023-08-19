import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as deck from '@letele/playing-cards' 
import { HeartsContext, UIContext } from '../context';
import { playingCards } from '../cardUtilities';
import { cardImgs } from "../imgs"

export function Hands(){
    const { 
        eastCards, northCards, southCards, westCards,
        eastAcc, westAcc, southAcc,northAcc,
        handOver,removeIIICards,southIIICards,compIIICards,
        selectedCards,southDrawCard,   
    } = useContext(HeartsContext)

    const {background} = useContext(UIContext)

    const {cardHeight,cardWidth} = playingCards()
    
    const img = cardImgs[background[0]]
    
    const CardBack = () => <div 
        className='bdr-5pc bgs-cover w-100pc h-100pc'
        style={{backgroundImage:`url(${img})`}}    
    ></div>
    
    const Cards = ({cards,name}) => cards.map((card,j) => {

        const Card = deck[card]

        const handleClick = (card) => {
            if(name==='South'){
                compIIICards ? removeIIICards(card) : southDrawCard(card,cards)
            }
        }
        
        const liStyles = (j) => {
            const vertical = name==='East'||name==='West'
            const length = vertical?cardHeight:cardWidth
            const topLeft = `calc(${j/12}*calc(${100}% - ${length}vmax))`
            return {
                [vertical?'height':'width']:`${length}vmax`,
                [vertical?'top':'left']:topLeft
            }
        }

        const cardPosStyles = (card) =>{
            const cond = (val,cards) =>name===val && 
            (cards.includes(card) || selectedCards.includes(card))
            
            if(cond('South',southIIICards)){
                return {bottom: "18%"}
            }
            if(compIIICards){
                if(cond('North',compIIICards['north'])){
                    return {top:"18%"}
                }
                if(cond('West',compIIICards['west'])){
                    return {left:"18%"}
                }
                if(cond('East',compIIICards['east'])){
                    return {right:"18%"}
                }
            }
        }

        return (<li 
            key={uuidv4()}
            className="poa w-100pc h-100pc "
            style={{...liStyles(j), ...cardPosStyles(card)}}
            onClick={() => handleClick(card)}
        >
            		
            {name==="South"||handOver ? 
                <Card className={`h-100pc w-100pc bdr-5pc ${name==="South" &&'hov-bxswhite'}`}/> : 
                <CardBack/>}
        </li>)
    })

	const Hand = ({cards,name}) => {
        const styles = {
            North: {
                h3:'l-26pc t-0',ul:'w-48pc l-26pc  t-4pc',
                pos: {height:`${cardHeight}vmax`}
            },
            East: {
                h3:'r-5pc',ul:'r-5pc t-4pc h-7145pc',
                pos: {width:`${cardWidth}vmax`}
            },
            South: {
                h3:'l-21pc b-24pc',ul:'w-81pc b-0 l-095pc',
                pos: {height:`${cardHeight}vmax`}
            },
            West: {
                h3:'l-5pc',ul:'l-5pc t-4pc h-7145pc',
                pos: {width:`${cardWidth}vmax`}
            }
        }

		return ( <>
			<h3 className={`poa c-fff txt-shdw ${styles[name].h3} fs-014vmax`}>
                {name}
            </h3>
			<ul 
				style={styles[name].pos}
				className={`poa z-1 ${styles[name].ul}`}
			>
                <Cards cards={cards} name={name} />
            </ul>
		</>)
	}

    const west = handOver? westAcc:westCards
    const north = handOver? northAcc:northCards
    const east = handOver? eastAcc:eastCards
    const south = handOver? southAcc:southCards

    return(<>
        {west && <Hand name='West' cards={west} />}

        {north && <Hand name="North" cards={north} />}

        {east && <Hand name='East' cards={east} />}

        {south && <Hand name="South" cards={south} />}
    </>)

}