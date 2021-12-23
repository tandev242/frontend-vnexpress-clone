import React from "react";
import moment from "moment";
export const SingleNewsCard = (props) => {
    const { news } = props;
    return (
        <>
            <div className="entity_title">
                <h1>
                    <a href="#">{news.title}</a>
                </h1>
            </div>
            {/* entity_title */}
            <div className="entity_meta">
                <a href="#">
                    {moment(news.createdAt).format(
                        "HH:mm [ngày] DD [tháng] MM"
                    )}
                </a>
                , Tác giả:
                <a href="#" target="_self">
                    {" Tan Nguyen"}
                </a>
            </div>
            <div className="entity_content">
                <section
                    className="not-found-controller"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                />
            </div>
        </>
    );
};
