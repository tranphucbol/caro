import React from 'react'
import GameUserInfo from './game-user-info';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class GameInfo extends React.Component {
    render() {
        console.log(this.props.user)
        return (
          <div className="game-info h-50 bg-gradient d-flex flex-column justify-content-between">
            <GameUserInfo {...this.props.user} />
            <div className="d-flex justify-content-between align-items-center px-3">
                <h1 className="text-white">0</h1>
              <img
                src={`${process.env.PUBLIC_URL}/images/gaming.svg`}
                width="64px"
                alt="caro"
              />
              <h1 className="text-white">2</h1>
            </div>
            <GameUserInfo right={true} {...this.props.opponent} />
          </div>
        );
    }
}

GameInfo.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        point: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
        ratioWinning: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired,
    opponent: PropTypes.shape({
        username: PropTypes.string.isRequired,
        point: PropTypes.number.isRequired,
        rank: PropTypes.number.isRequired,
        ratioWinning: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired
}

const mapStateToProps = state => ({
    user: state.user,
    opponent: state.room.opponent
})

export default connect(mapStateToProps)(GameInfo)