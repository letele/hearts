import './styles.css'

import * as Board from './components'


function HeartsBoard() {
    
    return (
        <section id="hearts-board">
            <Board.Hands  />

            <Board.Arrows />
            
            <Board.DiscardPile />
        </section>
    )
}

export default HeartsBoard