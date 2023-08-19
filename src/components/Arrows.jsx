import { useContext } from 'react'
import {ArrowUp,ArrowLeft,ArrowRight} from '@letele/svg-icons'
import { HeartsContext } from '../context'

export function Arrows(){

	const {
		hand, passCards,southIIICards,compIIICards
	} = useContext(HeartsContext)

	// Define arrow direction based on which hand is played
	const cond = i =>  hand%4===i
	const Arrow = cond(0) ? 
	ArrowLeft : (cond(1) ? ArrowRight : cond(2) && ArrowUp)
	
	// Pass cards if south has selected three cards
	const handleClick = () => southIIICards.length===3 && passCards()
	
	// Styles for the arrow icons
	const length = 5.4
	const styles = {
		fontSize:`${length}vmax`,
		left: `calc(50% - calc(${0.5*length}vmax))`,
	}

    return (compIIICards &&
		<Arrow 
			className='poa b-30pc z-2 hovsvg' 
			style={styles} 
			onClick={handleClick}
		/>
    )
}