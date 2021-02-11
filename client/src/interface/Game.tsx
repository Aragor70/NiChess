import React, { Fragment, useEffect, useState } from 'react';
import { getInitialPosition } from '../store/actions/soldiers';
import Field from './Field';



const Game = () => {

    const [fields, setFields] = useState<any[]>([])

    useEffect(() => {
        setFields(getInitialPosition())
    }, [])

    const [selectedData, setSelectedData] = useState<any>({
        rules: null,
        position: {
        y: null,
        x: null
    }, figure: {
        player: 0,
        type: ''
    }})
    const [moved, setMoved] = useState(false)

    
    return (
        <Fragment>
            
            <div className="fields">
                {
                    fields.map((field: any, index: number) => <Field key={index} index={index} field={field} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} />)
                }
                
            </div>
            
        </Fragment>
    );
}
export default Game;