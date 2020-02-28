import React, { Component } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

class FormError extends Component {
    render() {
        return (
            <div className="error-container"><AiOutlineInfoCircle /><i></i></div>
        )
    }
}

export default FormError