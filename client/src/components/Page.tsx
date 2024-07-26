import React, {ReactElement} from 'react';
import Header from "./common/Header";

const Page = ({children}: {children: ReactElement}) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default Page;