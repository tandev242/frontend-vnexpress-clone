import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createtNewsComment} from "../../redux/actions/NewsComment";
// import { Loading } from "./Loading";
// import { LOADING_REQUEST } from "../../redux/actions/actionTypes";
// import { Comments } from "./Comments";
// import { toast } from "react-toastify";

export const CommentForm = (props) => {
    const { news, slug } = props;
    const [data, setData] = useState({
        post: "",
        comment: "",
    });
    // const {isCreated} = useSelector(state => state.newCommentReducer)
    // console.log(isCreated);
    const dispatch = useDispatch();

    const onChangeComment = (e) => {
        setData({ post: news, comment: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(createtNewsComment(data));
        setData({ post: "", comment: "" });
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
                            value={data.comment}
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
