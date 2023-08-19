import { useContext } from "react"
import { playingCards } from "../cardUtilities"
import * as deck from '@letele/playing-cards'
import { HeartsContext } from "../context"

export function DiscardPile(){
    
    const {
		eastDiscard, westDiscard, northDiscard, southDiscard
	} = useContext(HeartsContext)

	const cards = {eastDiscard, westDiscard, northDiscard, southDiscard}
	
	const {cardHeight,cardWidth} = playingCards()

	const ulStyles = {
		height: `${1.9*cardHeight}vmax`,
		width:`${2.8*cardWidth}vmax`,
		left:`calc(50% - ${0.5*2.8*cardWidth}vmax)`,
		top:`calc(50% - ${0.5*1.9*cardHeight}vmax)`
	}

	const DiscardCard = ({name,liClasses,pos,length}) => {
		const Card = deck[cards[name]]
		
		return Card && (
			<li 
				className={`poa z-1 fs-014vmax ${liClasses}`}
				style={{
					height:`${cardHeight}vmax`,
					width:`${cardWidth}vmax`,
					[pos]:`calc(50% - ${0.5*length}vmax)`,
				}}
			>
				<Card className='h-100pc w-100pc'/>
			</li>
		)
	}

	const cardStyles = [
		{name:'westDiscard',liClasses:'',pos:'top',length:cardHeight},
		{name:'northDiscard',liClasses:'',pos:'left',length:cardWidth},
		{name:'eastDiscard',liClasses:'r-0',pos:'top',length:cardHeight},
		{name:'southDiscard',liClasses:'b-0',pos:'left',length:cardWidth},
	]
	
    return (
        <ul className='poa' style={ulStyles}>{cardStyles.map(styles => (
			<DiscardCard 
				key={styles.name}
				name={styles.name} 
				liClasses={styles.liClasses} 
				pos={styles.pos} 
				length={styles.length}
			/>
		))}</ul>
    )
}