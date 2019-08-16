import React from 'react'
import Main from './main'
import { Container} from 'react-bootstrap'
import Room from '../components/Room'
import DBToolBar from '../components/dashboard-toolbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

// const containerStyle = {
//     display: 'inline',
//     'align-items': 'center',
//     'margin-top': 'auto',
//     'margin-bottom': 'auto',
// }

class DashBoard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            heightFooter: 0
        }
    }  

    componentDidMount() {
        let height = document.querySelector('.db-leftbar').clientHeight
        let heightToolbar = document.querySelector('.db-toolbar').clientHeight
        let heightListRoom = document.querySelector('.db-listroomscroll').clientHeight

        this.setState({heightFooter: height - (heightToolbar + heightListRoom)})

    }

    render() {

        const listRoom = []

        for (var i = 0; i < 20; i++) {
            listRoom.push(<Room key={i}></Room>)
        }

        return (
            <Main>
                <Container className="min-vh-100 flex-center">
                    <div className="card db-border">
                        <div className="db ">
                            <div className="db-leftbar" >
                                <DBToolBar />
                                <div className="db-listroomscroll position-relative">
                                <PerfectScrollbar >
      
                                    <div className="db-listroom">
                                        {listRoom}
                                    </div>
                                </PerfectScrollbar>
                                </div>
                                <div className="db-leftbar-footer" style={{height: this.state.heightFooter}}>

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