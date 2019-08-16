import React from 'react'

class Room extends React.Component {
    
    render() {
        return (
            <div className="db-room">
                <div className="db-room-point mx-3 ">
                    <p>200</p>
                </div>
                <div className="db-room-info">
                    <h3>Room name</h3>
                    <p>Host username</p>
                </div>
                
            </div>
        )
    }
}

export default Room