import React, { Fragment } from "react";

export const CommentForm = (props) => {
    const { handleSubmit, content, setContent } = props;

    const onChangeComment = (e) => {
        setContent(e.target.value);
    };

    return (
        <Fragment>
            {/*Entity Title */}
            <div className="entity_comment_from">
                <form onSubmit={handleSubmit} method="post">
                    <div className="form-group comment">
                        <textarea
                            onChange={onChangeComment}
                            className="form-control"
                            id="comment"
                            name="comment"
                            placeholder="Comment"
                            value={content}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-submit red">
                        Submit
                    </button>
                </form>
            </div>
            {/*Entity Comments From */}
        </Fragment>
    );
};
