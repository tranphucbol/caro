import React from 'react'
import Main from './main'
import { Container, Row, Col, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import Box from '../components/Box'
import Room from '../components/Room'
import DBToolBar from '../components/dashboard-toolbar'
import Scrollbar from 'smooth-scrollbar'
import { list } from 'postcss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

const containerStyle = {
    display: 'inline',
    'align-items': 'center',
    'margin-top': 'auto',
    'margin-bottom': 'auto',
}

class DashBoard extends React.Component {

   

    render() {

        const listRoom = []

        for (var i = 0; i < 20; i++) {
            listRoom.push(<Room></Room>)
        }

        return (
            <Main>
                <Container className="min-vh-100 flex-center">
                    <div className="card">
                        <div className="db ">
                            <div className="db-leftbar" >
                                <DBToolBar />
                                <div className="db-listroomscroll ml-2 card">
                                <PerfectScrollbar >
                                    <div className="db-listroom">
                                        {listRoom}
                                    </div>
                                </PerfectScrollbar>
                                </div>
                            </div>
                            <div className="db-rightbar">
                                <div className="db-profile">Profile</div>
                                <div className="db-ranking">Ranking</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Main>
        )
    }
}


export default DashBoard