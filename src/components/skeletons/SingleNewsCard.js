import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import moment from 'moment'
import Popover from '../includes/Popover'
import $ from 'jquery'
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

  if (!rangeStr.startKey || !rangeStr.endKey) {
    throw new Error('rangStr invalid')
  }

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
  const { news, setShowAddTopic, setNewTopicComment, topicComments } = props
  const [position, setPosition] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const [selectedArray, setSelectedArray] = useState([])
  const [currentHighlight, setCurrentHighlight] = useState({})
  console.log(topicComments)
  // can call this function from parent element
  useEffect(() => {
    console.log('update from server')
    const highlightArray = topicComments.map(
      (topicComment) => topicComment.position
    )
    setSelectedArray(highlightArray)
  }, [topicComments])

  useEffect(() => {
    const addKey = (element) => {
      if (element.children.length > 0) {
        Array.prototype.forEach.call(element.children, function (each) {
          each.dataset.key = key++
          addKey(each)
        })
      }
    }
    addKey(document.querySelector('#post-details'))
  }, [])

  useEffect(() => {
    removeHighlight()
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
      if (
        selectedArray[selectedArray.length - 1] &&
        selectedArray[selectedArray.length - 1].temp
      ) {
        return deleteHighlight()
      }
      range = selectedText.getRangeAt(0)
    } else {
      setShowPopup(false)
      setShowAddTopic(false)
      if (
        selectedArray[selectedArray.length - 1] &&
        selectedArray[selectedArray.length - 1].temp
      ) {
        //delete temporary highlight
        deleteHighlight()
      }
      return
    }
    setCurrentHighlight(rangeToObj(range))
    setShowPopup(true)
    setPosition({ top, left })
  }

  //push current highlight into selected Array temporary
  const addTempHighlight = () => {
    if (Object.keys(currentHighlight).length === 0) return
    let currentObject = { ...currentHighlight }
    setNewTopicComment((prev) => {
      return { ...prev, position: currentObject }
    })
    //temporary add to array
    currentObject.temp = true
    setSelectedArray((prev) => [...prev, currentObject])
    setCurrentHighlight({})
  }

  //last element in highlight in db and can not remove by clicking
  // const addHighlight = () => {
  //   setSelectedArray((prev) => {
  //     const clone = [...prev]
  //     const lastElement = clone[clone.length - 1]
  //     lastElement.temp = undefined
  //     return [...clone]
  //   })
  // }

  //remove on highlight is on the POST
  const removeHighlight = () => {
    $('.highlight').each(function (i) {
      const content = $(this)[0].innerHTML
      $(this).prop('outerHTML', content)
    })
  }

  // highlight all topic in post
  const getHighLight = () => {
    document.designMode = 'on'
    try {
      var sel = getSelection()
      selectedArray.forEach(function (each, index) {
        sel.removeAllRanges()
        sel.addRange(objToRange(each))
        document.execCommand('hiliteColor', false, each.color)
        const list = sel.baseNode.parentNode
          ? [sel.focusNode.parentNode, sel.baseNode.parentNode]
          : [sel.focusNode.parentNode]
        $(list).each(function () {
          $(this).addClass('highlight')
        })
      })
    } catch (error) {
      console.log(error)
    }
    document.designMode = 'off'
  }

  //push current topic in selected array and show topic comment
  const handleAddTopic = () => {
    addTempHighlight()
    setShowAddTopic(true)
  }

  //delete topic in array default last topic
  const deleteHighlight = (index = selectedArray.length - 1) => {
    if (!selectedArray[index]) return
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
    setSelectedArray(tempArray)
  }

  return (
    <>
      <div className="entity_title">
        {/* <button type="button">add Highlight</button>
        <button type="button" onClick={removeHighlight}>
          delete Highlight
        </button> */}
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
