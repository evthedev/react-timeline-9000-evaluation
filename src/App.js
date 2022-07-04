import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import _ from "lodash";
import Timeline from "react-timeline-9000";
import customGroupRenderer from "./customGroupRenderer";
import CustomItemRender from "./customItemRenderer";
import { parser, getRowLayer, gd } from "./utils";

const { TIMELINE_MODES } = Timeline;
const snapMinutes = 15;

const log = (...text) => console.log(text);

const App = () => {
  const [startDate, setStartDate] = useState(gd(-6));
  const [endDate, setEndDate] = useState(gd(6));
  const [selectedItems, setSelectedItems] = useState([]);
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");
  const [timelineMode, setTimelineMode] = useState(TIMELINE_MODES.SELECT);
  const [key, setKey] = useState();

  useEffect(() => {
    reRender();
  }, []);

  useEffect(() => {
    const currentStartDate = startDate;
    const currentEndDate = endDate;
    const crawlInterval = setInterval(() => {
      console.log(
        "timeline crawl triggered",
        currentStartDate.toLocaleString()
      );
      setStartDate(currentStartDate.add(1, "minute"));
      setEndDate(currentEndDate.add(1, "minute"));
    }, 10000);

    return () => clearInterval(crawlInterval);
  }, [startDate, endDate]);

  useEffect(() => {
    console.log("items tracker: ", items);
  }, [items]);
  const reRender = () => {
    const { items = [], groups = [], key } = parser();
    setItems(items);
    setGroups(groups);
    setKey(key);
  };

  const handleRowClick = (e, rowNumber, clickedTime, snappedClickedTime) => {
    log("handleRowClick", { rowNumber, clickedTime, snappedClickedTime });
    const message = `Row Click row=${rowNumber} @ time/snapped=${clickedTime.toString()}/${snappedClickedTime.toString()}`;
    // this.setState({ selectedItems: [], message });
    setMessage(message);
  };

  const zoomIn = () => {
    let currentMins = endDate.diff(startDate, "minutes");
    let newMins = currentMins / 2;
    setEndDate(startDate.clone().add(newMins, "minutes"));
  };

  const zoomOut = () => {
    let currentMins = endDate.diff(startDate, "minutes");
    let newMins = currentMins * 2;
    setEndDate(startDate.clone().add(newMins, "minutes"));
  };

  const toggleSelectable = () => {
    let newMode =
      timelineMode === TIMELINE_MODES.SELECT ? "" : TIMELINE_MODES.SELECT;
    setTimelineMode(newMode);
    setMessage("Timeline mode change: " + timelineMode + " -> " + newMode);
  };

  const toggleDraggable = () => {
    let newMode =
      timelineMode === TIMELINE_MODES.DRAG ? "" : TIMELINE_MODES.DRAG;
    setTimelineMode(newMode);
    setMessage("Timeline mode change: " + timelineMode + " -> " + newMode);
  };

  const toggleResizable = () => {
    let newMode =
      timelineMode === TIMELINE_MODES.RESIZE ? "" : TIMELINE_MODES.RESIZE;
    setTimelineMode(newMode);
    setMessage("Timeline mode change: " + timelineMode + " -> " + newMode);
  };

  const handleItemClick = (e, key) => {
    const message = `Item Click ${key}`;
    let newSelection = selectedItems.slice();

    // If the item is already selected, then unselected
    const idx = selectedItems.indexOf(key);
    if (idx > -1) {
      // Splice modifies in place and returns removed elements
      newSelection.splice(idx, 1);
    } else {
      newSelection.push(Number(key));
    }

    setSelectedItems(newSelection);
    setMessage(message);
  };

  const handleItemDoubleClick = (e, key) => {
    const message = `Item Double Click ${key}`;
    setMessage(message);
  };

  const handleItemContextClick = (e, key) => {
    const message = `Item Context ${key}`;
    setMessage(message);
  };

  const handleRowDoubleClick = (
    e,
    rowNumber,
    clickedTime,
    snappedClickedTime
  ) => {
    console.log("handleRowDoubleclick");
    // const message = `Row Double Click row=${rowNumber} time/snapped=${clickedTime.toString()}/${snappedClickedTime.toString()}`;

    // dont want to create on double click yet

    // const randomIndex = Math.floor(
    //   Math.random() * Math.floor(ITEM_DURATIONS.length)
    // );

    // let start = snappedClickedTime.clone();
    // let end = snappedClickedTime.clone().add(ITEM_DURATIONS[randomIndex]);
    // let newKey = key;
    // setKey(newKey++);

    // const item = {
    //   key: `item-${key}-row-${rowNumber}`,
    //   title: "New item",
    //   color: "yellow",
    //   row: rowNumber,
    //   start: start,
    //   end: end
    // };

    // const newItems = _.clone(items);
    // newItems.push(item);

    // setItems(newItems);
    // setMessage(message);
  };

  const handleRowContextClick = (
    e,
    rowNumber,
    clickedTime,
    snappedClickedTime
  ) => {
    const message = `Row Click row=${rowNumber} @ time/snapped=${clickedTime.toString()}/${snappedClickedTime.toString()}`;
    setMessage(message);
  };

  const handleInteraction = (type, changes, items) => {
    // console.log('handleInteration', items)
    /**
     * this is to appease the codefactor gods,
     * whose wrath condemns those who dare
     * repeat code beyond the sacred 5 lines...
     */
    const absorbChange = (itemList, selectedItems) => {
      itemList.forEach((item) => {
        let i = selectedItems.find((i) => {
          return i.key === item.key;
        });
        if (i) {
          item = i;
          item.title = moment.duration(item.end.diff(item.start)).humanize();
        }
      });
      return itemList;
    };

    switch (type) {
      case Timeline.changeTypes.dragStart:
        return selectedItems;

      case Timeline.changeTypes.dragEnd:
        const newItems = _.clone(items);
        const updatedItems = absorbChange(newItems, items);
        console.log("end of drag", items, updatedItems);

        // setItems(newItems);
        break;

      case Timeline.changeTypes.resizeStart:
        return selectedItems;

      case Timeline.changeTypes.resizeEnd:
        console.log("resize end");
        const newI = _.clone(items);
        // Fold the changes into the item list
        absorbChange(newI, items);
        setItems(newI);
        break;

      case Timeline.changeTypes.itemsSelected:
        setSelectedItems(_.map(changes, "key"));
        break;

      default:
        return changes;
    }
  };
  const rangeValue = [startDate, endDate];

  const selectable =
    (TIMELINE_MODES.SELECT & timelineMode) === TIMELINE_MODES.SELECT;
  const draggable =
    (TIMELINE_MODES.DRAG & timelineMode) === TIMELINE_MODES.DRAG;
  const resizeable =
    (TIMELINE_MODES.RESIZE & timelineMode) === TIMELINE_MODES.RESIZE;

  const rowLayers = getRowLayer({
    startDate,
    endDate,
    selectedItems,
    groups,
    items,
    message,
    timelineMode,
    key
  });

  const NewCustomTile = (props) => {
    let selected = selectedItems.includes(props.item.key);
    return <CustomItemRender {...props} isSelected={selected} />;
  };

  return (
    <div>
      <Timeline
        items={items}
        groups={groups}
        startDate={startDate}
        endDate={endDate}
        onInteraction={() => {}}
      />
    </div>
  );
};

export default App;
