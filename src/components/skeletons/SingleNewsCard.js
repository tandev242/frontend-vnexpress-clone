import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Popover from '../includes/Popover'
import { useHistory } from 'react-router-dom'

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
    color: colors[Math.floor(Math.random() * colors.length)],
  }
}
const objToRange = (rangeStr) => {
  let range = document.createRange()

  range.setStart(
    document.querySelector('[data-key="' + rangeStr.startKey + '"]').childNodes[
      rangeStr.startTextIndex
    ],
    rangeStr.startOffset
  )
  range.setEnd(
    document.querySelector('[data-key="' + rangeStr.endKey + '"]').childNodes[
      rangeStr.endTextIndex
    ],
    rangeStr.endOffset
  )
  return range
}

const colors = [
  '#FDCF76',
  '#F6A7C1',
  '#89AEB2',
  '#F1CDB0',
  '#ECAD8F',
  '#C1CD97',
  '#E18D96',
  '#909090',
  '#9799BA',
]

export const SingleNewsCard = (props) => {
  const { news, setShowAddTopic } = props
  const [position, setPosition] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const [selectedArray, setSelectedArray] = useState([])
  const [currentHighlight, setCurrentHighlight] = useState({})

  useEffect(() => {
    const addKey = (element) => {
      if (element.children.length > 0) {
        Array.prototype.forEach.call(element.children, function (each, i) {
          each.dataset.key = key++
          addKey(each)
        })
      }
    }
    addKey(document.body)
  }, [])

  useEffect(() => {
    getHighLight()
  }, [selectedArray])

  const handleSelectedText = (e) => {
    const selectedText = window.getSelection()
    var element = document.getElementById('post-details')
    var clientRect = element.getBoundingClientRect()
    var clientX = clientRect.left
    var clientY = clientRect.top
    const left = e.pageX - clientX - document.documentElement.scrollLeft + 30
    const top = e.pageY - clientY - document.documentElement.scrollTop + 80
    // -----------------
    let range
    if (selectedText.toString().trim() != '') {
      range = selectedText.getRangeAt(0)
    } else {
      setShowPopup(false)
      setShowAddTopic(false)
      return
    }

    setCurrentHighlight(rangeToObj(range))
    console.log(rangeToObj(range))
    setShowPopup(true)
    setPosition({ top, left })
  }
  console.log(currentHighlight)
  const addHighlight = () => {
    undoCommand()
    setSelectedArray((prev) => [...prev, currentHighlight])
    setCurrentHighlight({})
  }
  const undoCommand = () => {
    document.designMode = 'on'
    for (let i = 0; i < selectedArray.length; i++) {
      document.execCommand('undo', false, null)
    }
    document.designMode = 'off'
  }
  const getHighLight = () => {
    document.designMode = 'on'
    var sel = getSelection()
    selectedArray.forEach(function (each) {
      sel.removeAllRanges()
      sel.addRange(objToRange(each))
      document.execCommand('hiliteColor', false, each.color)
    })
    document.designMode = 'off'
  }

  const handleAddTopic = () => {
    setShowAddTopic(true)
    document.designMode = 'on'
    document.execCommand(
      'hiliteColor',
      false,
      selectedArray[selectedArray.length - 1].color
    )
    document.designMode = 'off'
  }
  const deleteHighlight = () => {
    if (!selectedArray.length) return
    // const index = Math.floor(Math.random() * selectedArray.length)
    const index = 0
    let tempArray = [...selectedArray]
    const {
      startKey,
      startOffset,
      startTextIndex,
      endKey,
      endOffset,
      endTextIndex,
    } = tempArray[index]
    let currentStartIndex = startTextIndex
    for (let i = index + 1; i < tempArray.length; i++) {
      if (startKey === endKey) {
        if (startKey === tempArray[i].startKey) {
          if (tempArray[i].startTextIndex <= currentStartIndex) {
            if (
              currentStartIndex === tempArray[i].startTextIndex &&
              startOffset === tempArray[i].endOffset
            ) {
              currentStartIndex += 1
            } else {
              currentStartIndex += 2
            }
          } else {
            if (endOffset === tempArray[i].startOffset) {
              tempArray[i].startTextIndex -= 1
            } else {
              tempArray[i].startTextIndex -= 2
            }
            if (tempArray[i].startTextIndex - 2 < currentStartIndex) {
              tempArray[i].startOffset += endOffset
            }
            if (tempArray[i].startKey === tempArray[i].endKey) {
              tempArray[i].endTextIndex -= 2
              tempArray[i].endTextIndex -= 1
              tempArray[i].endOffset += endOffset
            }
          }
        }
      } else {
        if (endKey === tempArray[i].startKey) {
          console.log(1)
          tempArray[i].startTextIndex -= 1
          if (tempArray[i].startTextIndex < 2) {
            tempArray[i].startOffset += endOffset
          }
          if (tempArray[i].startKey === tempArray[i].endKey) {
            tempArray[i].endTextIndex -= 1
            tempArray[i].endOffset += endOffset
          }
        }
      }
    }
    tempArray.splice(index, 1)
    console.log(tempArray)
    undoCommand()
    setSelectedArray(tempArray)
  }

  return (
    <>
      <div className="entity_title">
        <button type="button" onClick={addHighlight}>
          add Highlight
        </button>
        <button type="button" onClick={deleteHighlight}>
          delete Highlight
        </button>
        <h1>
          <a href="#">{news.title}</a>
        </h1>
      </div>
      {/* entity_title */}
      <div className="entity_meta">
        <a href="#">
          {moment(news.createdAt).format('HH:mm [ngày] DD [tháng] MM')}
        </a>
        , Tác giả:
        <a href="#" target="_self">
          {' Tan Nguyen'}
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
          top={position.top}
          left={position.left}
          show={showPopup}
        />
      </div>
    </>
  )
}
