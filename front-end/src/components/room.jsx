import React from "react";

function random() {
    return Math.floor(Math.random() * 4) + 1;
}

class Room extends React.Component {
    componentDidMount() {
        document.querySelectorAll(".db-room").forEach(room =>
            room.addEventListener("mouseenter", () => {
                let img = room.querySelector(".db-room-point img");
                img.src = `${process.env.PUBLIC_URL}/images/coin.gif`;
            })
        );

        document.querySelectorAll(".db-room").forEach(room =>
            room.addEventListener("mouseleave", () => {
                let img = room.querySelector(".db-room-point img");
                img.src = `${process.env.PUBLIC_URL}/images/coin.png`;
            })
        );
    }

    render() {
        let { point, host, name } = this.props.data;

        return (
            <div onDoubleClick={() => this.props.onJoinRoom(this.props.data.roomId)} className="db-room px-3 py-4 hover-shadow position-relative">
                <div
                    className="bg-holder bg-card"
                    style={{
                        backgroundImage: `url(${
                            process.env.PUBLIC_URL
                        }/images/corner-${random()}.png)`
                    }}
                />

                <div className="db-room-info">
                    <div className="db-room-name">{name}</div>
                    <div className="d-flex">
                        <div className="db-room-host-name d-flex align-items-center">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/gaming.svg`}
                                alt="caro"
                            />
                            <p>{host}</p>
                        </div>
                        <div className="db-room-point d-flex align-items-center mx-2">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/coin.png`}
                                alt="caro"
                            />
                            {point}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Room;
