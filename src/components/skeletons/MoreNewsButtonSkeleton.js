import React from "react";
import { Link } from "react-router-dom";
export const MoreNewsSkeleton = (props) => {
    const { news, index, slug } = props;
    return (
        <>
            {index === news.length - 1 ? (
                <p className="divider" style={{ marginTop: 20 }}>
                    <Link to={`/category/${slug}`}>More News&nbsp;&raquo;</Link>
                </p>
            ) : (
                ""
            )}
        </>
    );
};
