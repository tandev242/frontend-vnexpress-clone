import React from "react";
import { Link } from "react-router-dom";

export const TagItemSkeleton = (props) => {
    return (
        <>
            {props.tag.map((tag) => {
                return (
                    <span
                        className={props.css}
                        style={{ marginRight: 5 }}
                        key={tag}
                    >
                        <Link to={`/tag/${tag}`}>{tag}</Link>
                    </span>
                );
            })}
        </>
    );
};
