import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { initBoard } from '../store/actions/board/board';
import Field from './Field';



const Game = ({ board, initBoard }: any) => {


    useEffect(() => {
        initBoard()

        return () => {
            initBoard()
        }
    }, [initBoard])

    const [selectedData, setSelectedData] = useState<any>(null)
    const [moved, setMoved] = useState(false)

    
    return (
        <Fragment>
            
            <div className="fields">
                {
                    board.fields && board.fields.map((field: any, index: number) => <Field key={index} index={index} field={field} selectedData={selectedData} setSelectedData={setSelectedData} moved={moved} setMoved={setMoved} />)
                }
                
            </div>
            
        </Fragment>
    );
}
const mapStateToProps = (state: any) => ({
    board: state.board
})
export default connect(mapStateToProps, { initBoard })(Game);