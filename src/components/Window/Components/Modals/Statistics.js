import { useContext } from "react"
import { UIContext , GameContext} from "../../../Context"

function Statistics(){
    
    const { tab, setTab,} =  useContext(UIContext)

    const {
        currentScore,total,
        gamesWon, gamesPlayed,
        bestScores,
    } = useContext(GameContext)

    const perc = gamesPlayed ? 
    Math.round(gamesWon/gamesPlayed*100) : 0

    return (
        <section id='statistics'>
            <ul id="tab-names">
                <li 
                    onClick={() => setTab(true)}
                    style={{background:tab&&'#0078d7',color:tab&&'#f7f7f7'}}
                >Current game score</li>
                <li 
                    onClick={() => setTab(false)}
                    style={{background:!tab&&'#0078d7',color:!tab&&'#f7f7f7'}}
                >Overall staistics</li>
            </ul>

            {tab && 
            <table>
                <thead>
                    <tr>
                        <td>South</td>
                        <td>West</td>
                        <td>North</td>
                        <td>East</td>
                    </tr>
                </thead>
                <tbody>
                    {currentScore.length>0 ? currentScore.map((obj,j) => (
                        <tr key={j+1}>
                            <td>{obj.southScore}</td>
                            <td>{obj.westScore}</td>
                            <td>{obj.northScore}</td>
                            <td>{obj.eastScore}</td>
                        </tr>
                    )) :
                    <tr>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                    </tr>}

                    {total ?
                    <tr>
                      <td className="lastrow">{total.southScore}</td>
                      <td className="lastrow">{total.westScore}</td>
                      <td className="lastrow">{total.northScore}</td>
                      <td className="lastrow">{total.eastScore}</td>
                    </tr>
                    :<tr>
                        <td className="lastrow">0</td>
                        <td className="lastrow">0</td>
                        <td className="lastrow">0</td>
                        <td className="lastrow">0</td>
                    </tr>}

                </tbody>
            </table>}
            
            
            {!tab && 
            <div id="overall">
                <ul id="best-scores">
                    <div>Best Scores</div>
                    {bestScores.length>0 && bestScores.map( (score,i) =>
                    <li key={i}>
                        <span>{score[0]}</span>
                        <span>{score[1]}</span>
                    </li>)}
                </ul>

                <ul id="games-played">
                    <li>Games Played: {gamesPlayed}</li>
                    <li>Games won: {gamesWon}</li>
                    <li>Win Percentage: {perc}%</li>
                </ul>
            
            </div>}
        </section>
    )
}

export default Statistics