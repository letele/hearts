import { useContext } from "react"
import { heartScores } from "../../../cardUtilities"
import { HeartsContext } from "../../Context"

function StatusBar(){

    const {southAcc } = useContext(HeartsContext)
    const {cardScores} = heartScores()

    const points = cardScores(southAcc)===26 ?
    0 : cardScores(southAcc)

    return (
        <span>
            Points taken in this hand: {points}
        </span>
    )
}

export default StatusBar