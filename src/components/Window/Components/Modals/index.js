import About from "./About";
import Appearance from "./Appearance";
import Exit from "./Exit";
import GameOver from "./GameOver";
import Help from "./Help";
import Statistics from "./Statistics";
import ScoreTable from "./ScoreTable";
import withModal from "./withModal";

const CompObjects =  Object.entries({
    About, 
    Appearance, 
    Exit, 
    GameOver,
    Help, 
    ScoreTable,
    Statistics,
})



const Modal = CompObjects
.reduce((prev, [key,value]) => {
    prev[key] = withModal(key)(value)
    return prev
},{})

export default Modal 