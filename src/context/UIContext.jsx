import { createContext, useState } from "react";
import {randomElement} from '@letele/ecmascripts'
import {useToggle} from '@letele/hook-me-up'
import {boardImgs, cardImgs } from "../imgs";


export const UIContext = createContext();

export const withUIContext = Component => props => {

    const  {mouseOver, ref, setToggle, toggle } = useToggle()

    const [tab, setTab] = useState(true)
    
    const [cardBackground, setCardBackground] = useState('Cubid')

    const [boardBackground, setBoardBackground] = useState('Classic')

    const [background, setBackground] = useState(
        [cardBackground,boardBackground]
    )
    
    const [checked, setChecked] = useState(false);

    const handleAppearance = () => {
        const randCardImg = randomElement(Object.keys(cardImgs))
        const randBoardImg = randomElement(Object.keys(boardImgs))
        setBackground( checked ?
            [randCardImg ,randBoardImg] :
            [cardBackground,boardBackground]
        )
        if(checked){
            setCardBackground(randCardImg)
            setBoardBackground(randBoardImg)
        }
        setToggle(false)
        setChecked(false)
        
    }

    const children = {
        setToggle, toggle,
        mouseOver, ref,
        tab, setTab,
        boardBackground, setBoardBackground,
        cardBackground, setCardBackground,
        checked, setChecked,
        handleAppearance,
        background, 
        setBackground,
    }

    return(
        <UIContext.Provider value={{...children}} >
            <Component {...props} />    
        </UIContext.Provider>
    )
}