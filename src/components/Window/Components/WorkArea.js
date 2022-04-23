import { useContext } from "react";
import HeartsBoard from "../../HeartsBoard";
import { UIContext } from "../../Context";
import { boardImgs } from "../../../imgs";

function WorkArea(){

    const{background} = useContext(UIContext)
    
    const img = boardImgs[background[1]]
    
    return (
        <section style={{backgroundImage:`url(${img})`}}>
            <HeartsBoard />
        </section>
    )
}

export default WorkArea