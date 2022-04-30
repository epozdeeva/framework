import React from 'react';
import Button from "../button/Button";

class Header extends React.Component {
    constructor(props) {
        super(props);
        const { activeButton, setActiveButton } = props;
        this.state = { activeButton };
        this.setActiveButtonCb = setActiveButton;
    }

    setActiveButton(name) {

        console.log(name);

        this.setState({ activeButton: name });
        this.setActiveButtonCb(name);
    }
    
    render() {
        return (
            <div key={this.state.activeButton}>
                <h1>Реакт</h1>
                <Button
                    name="calculator"
                    title="Калькулятор"
                    onClick={(name) => this.setActiveButton(name)}
                    isActive={this.state.activeButton}
                ></Button>
                <Button 
                    name="graph2D"
                    title="Графика 2D"
                    onClick={(name) => this.setActiveButton(name)}
                    isActive={this.state.activeButton}
                ></Button>
                <Button 
                    name="graph3D"
                    title="Графика 3D"
                    onClick={(name) => this.setActiveButton(name)}
                    isActive={this.state.activeButton}
                ></Button>
            </div>
        );
    }
}
export default Header