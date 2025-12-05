import React from 'react'
import './loading.css'
import { ClimbingBoxLoader } from "react-spinners";

function Loading() {



    return (
        <div className='carregando'>
            <ClimbingBoxLoader
                color='#fff'
                cssOverride={{}}
                speedMultiplier={1.5}
            />
            Carregando...
        </div>
    )
}

export default Loading
