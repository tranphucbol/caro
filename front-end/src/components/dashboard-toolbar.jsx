import React from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { faPlus, faSlidersH, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DBToolBar extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			filter : "Default",
			order : "asc"
		}
	}


	render() {

		let btnOrder;

		if(this.state.order === "asc"){
			btnOrder = <FontAwesomeIcon icon={faChevronUp}/>
		}
		else{
			btnOrder = <FontAwesomeIcon icon={faChevronDown}/>
		}

		return (
			<div className="db-toolbar px-3 my-4">
				<div className="d-flex align-items-center">
					<h1 className="db-title">Caro Game</h1>

					<Dropdown className="ml-4">
						<Dropdown.Toggle className="db-tool-button" >
							<FontAwesomeIcon icon={faSlidersH}></FontAwesomeIcon>
						</Dropdown.Toggle>
						
						<Dropdown.Menu>
							<Dropdown.Item>Point</Dropdown.Item>
							<Dropdown.Item>Name</Dropdown.Item>
							<Dropdown.Item>Host</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					<Button className="">
						{btnOrder}
					</Button>



				</div>
				
				<Button>
					<FontAwesomeIcon icon={faPlus} className="mr-2" />
					Create Room
				</Button>
			</div>
		);
	}
}

export default DBToolBar;
