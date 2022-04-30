import React from "react";

import './button.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
        const { name, onClick, title, isActive } = props;
        this.onClick = onClick;
        this.name = name;
        this.title = title;
        this.isActive = isActive === name;
    }

    setClass() {
        return `field ${this.isActive ? 'active' : ''}`
    }

    render() {
        return (<div
            className={this.setClass()}
            onClick={() => this.onClick(this.name)}>{this.title}</div>
        );
    }
}

export default Button;