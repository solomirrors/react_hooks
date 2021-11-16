import React, {useContext} from "react";

const MyContext = React.createContext();

const TestingUseContext = () => {
    return (
        <MyContext.Provider value='Hello React Context'>
            <Child/>
        </MyContext.Provider>
    )
}

const Child = () => {
    const value = useContext(MyContext);
    return <p>{value}</p>;
}