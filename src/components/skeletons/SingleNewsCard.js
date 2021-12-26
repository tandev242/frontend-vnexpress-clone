import React, { useState, useEffect } from "react"
import moment from "moment"
import Popover from "../includes/Popover"

export const SingleNewsCard = (props) => {
    const { news, setShowAddTopic } = props
    const [position, setPosition] = useState({})
    const [showPopup, setShowPopup] = useState(false)
    const [selectedArray, setSelectedArray] = useState([])

    const colors = [
        "#FDCF76",
        "#F6A7C1",
        "#89AEB2",
        "#F1CDB0",
        "#ECAD8F",
        "#C1CD97",
        "#E18D96",
        "#909090",
        "#9799BA",
    ]

    var key = 0


    const rangeToObj = (range) => {
        return {
            startKey: range.startContainer.parentNode.dataset.key,
            startTextIndex: Array.prototype.indexOf.call(
                range.startContainer.parentNode.childNodes,
                range.startContainer
            ),
            endKey: range.endContainer.parentNode.dataset.key,
            endTextIndex: Array.prototype.indexOf.call(
                range.endContainer.parentNode.childNodes,
                range.endContainer
            ),
            startOffset: range.startOffset,
            endOffset: range.endOffset,
            color: colors[Math.floor(Math.random() * colors.length)]
        }
    }

    const handleSelectedText = (e) => {
        const selectedText = window.getSelection()
        var element = document.getElementById("post-details")
        var clientRect = element.getBoundingClientRect()
        var clientX = clientRect.left
        var clientY = clientRect.top
        const left = e.pageX - clientX - document.documentElement.scrollLeft + 30
        const top = e.pageY - clientY - document.documentElement.scrollTop + 50
        // -----------------
        let range
        if (selectedText.toString().trim()) {
            range = selectedText.getRangeAt(0)
            setSelectedArray([...selectedArray, rangeToObj(range)])
            console.log(rangeToObj)
            setShowPopup(true)
            setPosition({ top, left })
        }
        else {
            setShowPopup(false)
            setShowAddTopic(false)
        }
    }

    const handleAddTopic = () => {
        setShowAddTopic(true)
        document.designMode = "on"
        document.execCommand("hiliteColor", false, selectedArray[selectedArray.length - 1].color)
        document.designMode = "off"
    }



    const objToRange = (rangeStr) => {
        let range = document.createRange()
        range.setStart(
            document.querySelector('[data-key="' + rangeStr.startKey + '"]')
                .childNodes[rangeStr.startTextIndex],
            rangeStr.startOffset
        )
        range.setEnd(
            document.querySelector('[data-key="' + rangeStr.endKey + '"]')
                .childNodes[rangeStr.endTextIndex],
            rangeStr.endOffset
        )
        return range
    }

    const getHighLight = () => {
        document.designMode = "on"
        var selArr = JSON.parse('[{"startKey":"85","startTextIndex":0,"endKey":"85","endTextIndex":0,"startOffset":180,"endOffset":206,"color":"#C1CD97"}]');
        var sel = getSelection()
        selArr.forEach(function (each) {
            console.log(each)
            sel.removeAllRanges()
            sel.addRange(objToRange(each))
            document.execCommand("hiliteColor", false, each.color)
        })
        document.designMode = "off"
    }

    const addKey = (element) => {
        if (element.children.length > 0) {
            Array.prototype.forEach.call(element.children, function (each, i) {
                each.dataset.key = key++
                addKey(each)
            })
        }
    }

    addKey(document.body)

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
                    handleAddTopic={handleAddTopic}
                    top={position.top} left={position.left}
                    show={showPopup}
                />
            </div>
        </>
    )

}
