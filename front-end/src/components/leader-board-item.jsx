import React from 'react'

class LeaderBoardItem extends React.Component {
    render() {
        return (
            <div className="db-ranking-item px-3">
                    <div className="db-ranking-item-rank d-flex align-items-center">
                        {this.props.rank}
                    </div>
                    <div className="db-ranking-item-a">
                        <p className="db-ranking-item-username">
                            {this.props.username}
                        </p>
                        <div className="db-ranking-item-info d-flex align-items-center">
                            <img
                            className="mr-1"
                                src={`${process.env.PUBLIC_URL}/images/coin.png`}
                                alt="caro"
                            />
                            {this.props.point}
                        </div>
                    </div>
                    <div className="db-ranking-item-b">
                        <img
                            className="db-ranking-item-avatar"
                            alt=""
                            src={this.props.avatar}
                        />

                        <div className="db-ranking-item-info">
                            <img
                                src={`${process.env.PUBLIC_URL}/images/trophy.gif`}
                                alt="caro"
                            />
                            <span>{this.props.ratioWinning}</span>
                        </div>
                    </div>
                </div>
        )
    }
}

export default LeaderBoardItem