import React from "react";
import { NewsCardOne } from "./NewsCardOne";
import { NewsCardTwo } from "./NewsCardTwo";


export default function NewsListCard(props) {
    const { catalogListOne, catalogListTwo, catalogListThree, catalogListFour } = props;
    return (
        <>
            <div className="category_section item">
                <NewsCardOne newsList={catalogListOne} />
            </div>
            <div className="category_section item">
                <NewsCardTwo newsList={catalogListTwo} />
            </div>
            <div className="category_section item">
                <NewsCardOne newsList={catalogListThree} />
            </div>
            <div className="category_section item">
                <NewsCardTwo newsList={catalogListFour} />
            </div>
        </>
    );
}
