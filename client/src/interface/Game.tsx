import React, { Fragment, useEffect, useState } from 'react';
import Field from './Field';





const Game = () => {

    const [fields, setFields] = useState<any[]>([])

    useEffect(() => {
        setFields(new Array(64).fill(0))
    }, [])



    console.log(fields)
    return (
        <Fragment>
            
            <div className="fields">
                {
                    fields.map((field: any, index: number) => <Field key={index} index={index} />)
                }
                
            </div>




        </Fragment>
    );
}
export default Game;