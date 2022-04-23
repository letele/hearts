import { useContext } from "react"
import { GameContext } from "../../../Context"

function ScoreTable() {
  
    const { currentScore, total, } = useContext(GameContext)

    return (
        currentScore.length &&
        <section id='score-table'>
            <table>
                <thead>
                    <tr>
                        <td className='col1'>Hand</td>
                        <td>South</td>
                        <td>West</td>
                        <td>North</td>
                        <td>East</td>
                    </tr>
                </thead>
                <tbody>
                    {currentScore.map((obj,j) => (
                        <tr key={j+1}>
                            <td className='col1'>{j+1}</td>
                            <td>{obj.southScore}</td>
                            <td>{obj.westScore}</td>
                            <td>{obj.northScore}</td>
                            <td>{obj.eastScore}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className='col1'></td>
                        <td className="lastrow">{total.southScore}</td>
                        <td className="lastrow">{total.westScore}</td>
                        <td className="lastrow">{total.northScore}</td>
                        <td className="lastrow">{total.eastScore}</td>
                    </tr>
                </tbody>
            </table>
        </section>
        
    )
}

export default ScoreTable