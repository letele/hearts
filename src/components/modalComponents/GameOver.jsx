import { useContext } from "react"
import { GameContext } from "../../context"

export function GameOver(){

    const { 
        gamesWon, gamesPlayed, 
        total,places, date,bestScores
    } = useContext(GameContext)
    
    const perc = gamesPlayed ? 
    Math.round(gamesWon/gamesPlayed*100) : 0

    const Score = ({name,score}) =>{
        return (
            <li className="m-12px flex">
                <span className="flex-1">{score}</span>
                <span className="flex-1">{name}</span>
            </li>
        )
    }

    const players = [
        {name:'West', score:total.westScore},
        {name:'North', score:total.northScore},
        {name:'East', score:total.eastScore},
        {name:'South', score:total.southScore},
    ]

    const pClasses = 'txt-center mt-10px mb-15px'

    const divClasses = "ml-5px mt--10px w-fcnt bg-ececec p-2px"

    return (  
        <article>
            {places && places.southScore==='First' ?
            <p className={pClasses}>
                Congradulations, you won the game!
            </p> :
            <p className={pClasses}>
                Sorry, you lost this game. Better luck next 
            </p>}
            <ul className="w-300px mb-10px bd-0000001c">
                <div className={divClasses}>Final Scores</div>
                {players.map(player => 
                <Score 
                    key={player.name} 
                    name={player.name} 
                    score={player.score} 
                />)}
            </ul>
            <ul>
                <li className="m-5px flex">
                    <span className="flex-1">
                        Best score: {bestScores.length>0 && bestScores[0][0]}
                    </span>
                    <span className="flex-1">Date: {date}</span>
                </li>
                <li className="m-5px mt-10px">
                    <span>Games played: {gamesPlayed}</span>
                </li>
                
                <li className="m-5px mt-10px flex">
                    <span className="flex-1">Games won: {gamesWon}</span>
                    <span className="flex-1">Percentage: {perc}%</span>
                </li>
            </ul>
        </article>
    )
}

