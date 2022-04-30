import React from "react";
import Panel from '../panel/Panel';
//import './UI.css'

class UI extends React.Component {
    constructor(props) {
        super(props);
        const { funcs, addFunction, run } = props;
        this.funcs = funcs;
        this.addFunction = addFunction;
        this.run = run;
        this.state = { showPanel: false }
    }

    render() {
        return (
            <div>
                {this.state.showPanel ?
                    <Panel
                        funcs={this.funcs}
                        addFunction={() => this.addFunction()}
                        run={() => this.run()}></Panel> : ''}
                <button onClick={() => this.togglePanel()}>Добавить</button>
            </div>
        )
    }

    togglePanel() {
        this.setState({
            showPanel:
                !this.state.showPanel
        });
    }
}
export default UI;