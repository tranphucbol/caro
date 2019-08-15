import React from 'react'
import Main from './main'
import {Container, Row, Col, Button, ButtonGroup, ButtonToolbar} from  'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import Box from '../components/Box'
import Room from '../components/Room'

const containerStyle = {
    display: 'inline',
    'align-items': 'center',
    'margin-top' : 'auto',
    'margin-bottom' : 'auto',
}

class DashBoard extends React.Component{
    render(){
        return (
            <Main>
                <Container className="min-vh-100 flex-center">
                    <div className="db">
                    <div className="db-leftbar"  >
                        <h1 className="db-title">Caro Game</h1>
                        <div className="db-toolbar">
                            <div className="db-toolbar-point">
                                <p className="mr-4">Point</p>
                                <ButtonGroup>
                                    <Button>Asc</Button>
                                    <Button>Des</Button>
                                </ButtonGroup>
                            </div>
                            <button className="db-toolbar-create card-bg-ui">
                                <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                                Create Room
                            </button>
                        </div>
                        <div className="db-listroom">
                            <Room></Room>
                        </div>
                    </div>
                    <div className="db-rightbar">
                        <div className="db-profile">Profile</div>
                        <div className="db-ranking">Ranking</div>
                    </div>
                    </div>
                </Container>
            </Main>
        )
    }
}


export default DashBoard