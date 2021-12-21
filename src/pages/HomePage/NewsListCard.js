import React from "react";
import { NewsCardOne } from "./NewsCardOne";
import { NewscardTwo } from "./NewsCardTwo";


export default function NewsListCard(props) {
    const { catalogListOne, catalogListTwo } = props;
    return (
        <>
            <div className="category_section item">
                <NewscardTwo newslist={catalogListTwo} />
            </div>
            <div className="category_section item">
                <NewsCardOne newslist={catalogListOne} />
            </div>
            <div className="category_section item">
                <NewsCardOne newslist={catalogListOne} />
            </div>
            <div className="category_section item">
                <NewscardTwo newslist={catalogListTwo} />
            </div>
            <div className="category_section item">
                <NewsCardOne newslist={catalogListOne} />
            </div>
        </>
    );
}
