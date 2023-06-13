import React, { useState } from "react";

import ShowcaseGenderBtn from "../ShowcaseGenderBtn"
import ShowcaseSection from "../ShowCaseSection"
import ProductData from "../../fakedata/showcaseContent/"

const ShowcaseContainer = () => {
    const [filter, setFilter] = useState(null);

    const updateFilterState = (filter) => {
        setFilter(filter);
    }

    return (
        <>
            <ShowcaseGenderBtn updateFilterState={updateFilterState} />
            <ShowcaseSection filter={filter} />
        </>
    );
}

export default ShowcaseContainer;


