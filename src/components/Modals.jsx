import { useContext } from "react"
import { UIContext } from "../context"

import * as modalsObject from "./modalComponents"

export function Modals(){

    const { toggle } = useContext(UIContext)
    
    const modalkeys = Object.keys(modalsObject).filter(i => i!=='withModal')

    // Wrap every modal with the withModal higher order component
    const wrappedModals = modalkeys.reduce((prev, key) => {
       prev[key] = modalsObject.withModal(key)(modalsObject[key])
       return prev
    },{})

    const WrappedModal = wrappedModals[toggle]

    return WrappedModal && <WrappedModal /> 
}