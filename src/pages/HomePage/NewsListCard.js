import React, { Component } from "react";
import { NewsCardOne } from "./NewsCardOne";
import { NewscardTwo } from "./NewsCardTwo";

export default class NewsListCard extends Component {
    render() {
        return (
            <>
                <div className="category_section mobile">
                    <NewscardTwo newslist={this.props.news_catalog_one} />
                </div>
                <div className="category_section tablet">
                    <NewsCardOne newslist={this.props.news_catalog_two} />
                </div>
                <div className="category_section gadget">
                    <NewsCardOne newslist={this.props.news_catalog_three} />
                </div>
                <div className="category_section camera">
                    <NewscardTwo newslist={this.props.news_catalog_four} />
                </div>
                <div className="category_section design">
                    <NewsCardOne newslist={this.props.news_catalog_five} />
                </div>
            </>
        );
    }
}
