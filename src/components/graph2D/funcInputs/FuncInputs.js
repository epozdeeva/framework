import React from "react";

class FuncInputs extends React.Component {
    constructor(props) {
        super(props);
        const { func, addFunction, run } = props;
        this.func = func;
        this.addFunction = addFunction;
        this.run = run;
    }

    setFunction(e) {
        try {
            let f;
            // eslint-disable-next-line no-use-before-define
            f = eval(`f=function(x) {return ${e.target.value}}`);
            this.func.f = f;
            this.run();
        } catch(a) { }
    }

    render() {
        return (
            <div>
                <input
                    placeHolder="y=f(x)"
                    defaultValue={this.funcs.f}
                    onKeyUp={(e) => this.setFunction(e)}
                ></input>
            </div>
        )
    }
}
export default FuncInputs;