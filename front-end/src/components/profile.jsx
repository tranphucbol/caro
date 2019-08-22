import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

class Profile extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <div className="db-profile">
                <FontAwesomeIcon
                    className="db-profile-logout"
                    icon={faPowerOff}
                />
                <span>Meme_cute</span>
                <div className="db-profile-avatar">
                    <img
                        id="avatar-profile"
                        alt=""
                        src={`${process.env.PUBLIC_URL}/images/avatar.svg`}
                    />
                </div>
                <div className="db-profile-info">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/coin.png`}
                        alt="caro"
                    />
                    <span>2000</span>
                </div>
                <div className="db-profile-info">
                    <div className="db-profile-info-el">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/star.gif`}
                            alt="caro"
                        />
                        <span>1</span>
                    </div>
                    <div className="db-profile-info-el">
                        <img
                            src={`${process.env.PUBLIC_URL}/images/trophy.gif`}
                            alt="caro"
                        />
                        <span>89%</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
