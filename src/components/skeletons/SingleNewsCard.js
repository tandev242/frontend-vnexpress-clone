import React, { useState } from "react"
import moment from "moment"
import Popover from "../includes/Popover"

export const SingleNewsCard = (props) => {
    const { news, setShowAddTopic } = props
    const [position, setPosition] = useState({})
    const [showPopup, setShowPopup] = useState(false)

    const handleSelectedText = (e) => {
        const selectedText = window.getSelection()
        var element = document.getElementById("post-details")
        var clientRect = element.getBoundingClientRect()
        var clientX = clientRect.left
        var clientY = clientRect.top
        const left = e.pageX - clientX - document.documentElement.scrollLeft + 30
        const top = e.pageY - clientY - document.documentElement.scrollTop + 50
        if (selectedText.toString().trim()) {
            setShowPopup(true)
            setPosition({ top, left })
        } else {
            setShowPopup(false)
            setShowAddTopic(false)
        }
    }

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
                    id="post-details"
                    className="not-found-controller"
                    onMouseUp={handleSelectedText}
                    dangerouslySetInnerHTML={{ __html: news.content }}

                />
                <Popover
                    setShowAddTopic={setShowAddTopic}
                    top={position.top} left={position.left}
                    show={showPopup}
                />
            </div>
        </>
    )
}
