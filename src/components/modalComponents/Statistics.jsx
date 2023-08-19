import { useContext } from "react"
import { UIContext , GameContext} from "../../context"

export function Statistics(){
    
    const { tab, setTab,} =  useContext(UIContext)

    const {
        currentScore,total,
        gamesWon, gamesPlayed,
        bestScores        
    } = useContext(GameContext)

    const perc = gamesPlayed ? 
    Math.round(gamesWon/gamesPlayed*100) : 0

    const divClasses = "p-0-5px w-fcnt mt--7px ml--10px bg-ececec"



    return (
        <article className='pt-10px w-500px flex'>
            <ul className="bd-aaaaaa bg-fff h-65px w-150px mr-6px hov-cdef">
                <li 
                    onClick={() => setTab(true)}
                    className={tab && 'bg-0078d7 c-fff'}
                >Current game score</li>
                <li 
                    onClick={() => setTab(false)}
                    className={!tab && 'bg-0078d7 c-fff'}
                >Overall staistics</li>
            </ul>

            {tab && 
            <table className="txt-center bcol-collapse w-300px ml-30px">
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
                      <td className="bdt-aaaaaa">{total.southScore}</td>
                      <td className="bdt-aaaaaa">{total.westScore}</td>
                      <td className="bdt-aaaaaa">{total.northScore}</td>
                      <td className="bdt-aaaaaa">{total.eastScore}</td>
                    </tr>
                    :<tr>
                        <td className="bdt-aaaaaa">0</td>
                        <td className="bdt-aaaaaa">0</td>
                        <td className="bdt-aaaaaa">0</td>
                        <td className="bdt-aaaaaa">0</td>
                    </tr>}

                </tbody>
            </table>}
            
            
            {!tab && 
            <div className="flex">
                <ul className="h-90px w-180px bd-0000001c pl-12px mt-6px mr-10px">
                    <div className={divClasses}>Best Scores</div>
                    {bestScores.length>0 && bestScores.map( (score,i) =>
                    <li key={i} className="flex jus-btwn pr-5px mb-2px">
                        <span>{score[0]}</span>
                        <span>{score[1]}</span>
                    </li>)}
                </ul>

                <ul>
                    <li className="mb-2px">Games Played: {gamesPlayed}</li>
                    <li className="mb-2px">Games won: {gamesWon}</li>
                    <li>Win Percentage: {perc}%</li>
                </ul>
            
            </div>}
        </article>
    )
}

