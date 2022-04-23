import { useContext } from "react"
import { GameContext } from "../../../Context"

function GameOver(){

    const { 
        gamesWon, gamesPlayed, 
        total,places, date,bestScores
    } = useContext(GameContext)

    const perc = gamesPlayed ? 
    Math.round(gamesWon/gamesPlayed*100) : 0

    return (  
        <section id="gameover">
            {places && places.southScore==='First' ?
            <p>Congradulations, you won the game!</p> :
            <p>Sorry, you lost this game. Better luck next </p>}
            <ul>
                <div>Final Scores</div>
                <li>
                    <span>{total.westScore}</span>
                    <span>West</span>
                </li>
                <li>
                    <span>{total.northScore}</span>
                    <span>North</span>
                </li>
                <li>
                    <span>{total.eastScore}</span>
                    <span>East</span>
                </li>
                <li>
                    <span>{total.southScore}</span>
                    <span>South</span>
                </li>
            </ul>
            <article>
                <div id="best">Best score: {bestScores.length>0 && bestScores[0][0]}</div>
                <div id="played">Games played: {gamesPlayed}</div>
                <div id="won">Games won: {gamesWon}</div>
                <div id="date">Date: {date}</div>
                <div id="perc">Percentage: {perc}%</div>
            </article>
        </section>
    )
}

export default GameOver