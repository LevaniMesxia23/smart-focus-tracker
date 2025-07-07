import { useFocusTracker } from "./useFocusTracker";
import React from "react";
export default function DemoForm() {
    const { report } = useFocusTracker();
    const handleClick = () => {
        const data = report();
        console.log(data);
    };
    return (React.createElement("div", null,
        React.createElement("input", { id: "email", placeholder: "Email" }),
        React.createElement("input", { id: "password", placeholder: "Password" }),
        React.createElement("button", { onClick: handleClick }, "\u10D2\u10D0\u10DB\u10DD\u10E2\u10D0\u10DC\u10D0")));
}
