import { 
    createContext,  useEffect, 
    useRef, useState 
} from "react";
import {randomElement as rand} from '../../utilities'
import {boardImgs, cardImgs } from "../../imgs";


export const UIContext = createContext();

export const withUIContext = Component => props => {

   
    
    const [cardBackground, setCardBackground] = useState('Cubid')

    const [boardBackground, setBoardBackground] = useState('Classic')

    const [background, setBackground] = useState(
        [cardBackground,boardBackground]
    )
    
    const [checked, setChecked] = useState(false);

    const [toggled, setToggled] = useState(null)
    
    const [tab, setTab] = useState(true)

    const ref = useRef(null)

    const resetToggle = () => setToggled(null)
    
    const toggle = val => 
    val===toggled ? resetToggle():setToggled(val)

    const mouseOver = val => toggled && setToggled(val)

    const handleAppearance = () => {
        const randCardImg = rand(Object.keys(cardImgs))
        const randBoardImg = rand(Object.keys(boardImgs))
        setBackground( checked ?
            [randCardImg ,randBoardImg] :
            [cardBackground,boardBackground]
        )
        if(checked){
            setCardBackground(randCardImg)
            setBoardBackground(randBoardImg)
        }
        setToggled(false)
        setChecked(false)
        
    }

   

    useEffect(() => {
        const clickOutside = e => 
        ref.current && !ref.current.contains(e.target) &&  resetToggle()
        
 
        document.addEventListener("mousedown", clickOutside)
        
        const cleanup = () => 
        document.removeEventListener("mousedown", clickOutside)
        
        return cleanup
    }, [ref])

    const children = {
        boardBackground, setBoardBackground,
        cardBackground, setCardBackground,
        background, setBackground,
        toggled, setToggled,
        checked, setChecked,
        handleAppearance,
        tab, setTab,
        resetToggle,
        toggle,
        mouseOver,
        ref,
    }

    return(
        <UIContext.Provider value={{...children}} >
            <Component {...props} />    
        </UIContext.Provider>
    )
}