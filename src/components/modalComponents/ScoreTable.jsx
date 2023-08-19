import { useContext } from "react"
import { GameContext } from "../../context"

export function ScoreTable() {
  
    const { currentScore, total, } = useContext(GameContext)

    return (
        currentScore.length &&
        <table className="txt-center bcol-collapse w-210px">
            <thead>
                <tr>
                    <td className="p-2px-5px">Hand</td>
                    <td>South</td>
                    <td>West</td>
                    <td>North</td>
                    <td>East</td>
                </tr>
            </thead>
            <tbody>
                {currentScore.map((obj,j) => (
                <tr key={j+1}>
                    <td className="fw-bold p-2px-5px">{j+1}</td>
                    <td>{obj.southScore}</td>
                    <td>{obj.westScore}</td>
                    <td>{obj.northScore}</td>
                    <td>{obj.eastScore}</td>
                </tr>))}
                <tr>
                    <td className="pt-20px"></td>
                    <td className="bdt-aaaaaa">{total.southScore}</td>
                    <td className="bdt-aaaaaa">{total.westScore}</td>
                    <td className="bdt-aaaaaa">{total.northScore}</td>
                    <td className="bdt-aaaaaa">{total.eastScore}</td>
                </tr>
            </tbody>        
        </table>
    )
}