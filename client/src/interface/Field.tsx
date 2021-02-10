import React, { Fragment, useEffect, useState } from 'react';





const Field = ({ index }: any) => {

    const [row, setRow] = useState<number | null>(null)

    useEffect(() => {

        setRow(Math.floor((index * 8) / 64))

        return () => {
            setRow(null)
        }
    }, [setRow])
    console.log(row)

    return (
        row !== null && row % 2 === 0 ? <Fragment>
            <div className="field-content" style={ index % 2 === 0 ? { backgroundColor: '#fff' } : { backgroundColor: '#000' }}>
                {index}
            </div>
        </Fragment> : <Fragment>
            <div className="field-content" style={ index % 2 !== 0 ? { backgroundColor: '#fff' } : { backgroundColor: '#000' }}>
                {index}
            </div>
        </Fragment>
    );
}
export default Field;