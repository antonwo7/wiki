import React from 'react';
import Page from "../Page";
import Search from "../common/Search";
import BarChart from "../common/BarChart";
import Revisions from "../common/Revisions";
import {getRev} from "../../utils/parsing";

const Main = () => {
    return (
        <Page>
            <div className="mt-4 w-full inline-table">
                <Search />
                <BarChart />
                <Revisions />
            </div>
        </Page>
    );
};

export default Main;