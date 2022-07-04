import { Form, Button, DatePicker, Checkbox } from "antd";
import React from "react";
import moment from "moment";

const ActionsTab = (props) => {
  const {
    rangeValue,
    message,
    selectable,
    draggable,
    resizeable,
    toggleSelectable,
    toggleDraggable,
    toggleResizable,
    zoomIn,
    zoomOut,
    reRender,
    // setState,
    //
    setStartDate,
    setEndDate
  } = props;
  console.log(props);

  const changeDatePickerValues = (startDate, endDate) => {
    if (setStartDate && setEndDate) {
      setStartDate(startDate);
      setEndDate(endDate);
    }
  };

  const dateTimeMoveBack = (dateTimeRange) => {
    const newStart = moment(dateTimeRange[0]).subtract(1, "hours");
    const newEnd = moment(dateTimeRange[1]).subtract(1, "hours");
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  const dateTimeMoveForward = (dateTimeRange) => {
    const newStart = moment(dateTimeRange[0]).add(1, "hours");
    const newEnd = moment(dateTimeRange[1]).add(1, "hours");
    setStartDate(newStart);
    setEndDate(newEnd);
  };

  return (
    <div style={{ margin: 24 }}>
      <Form layout="inline">
        <Form.Item label="Date Range">
          <DatePicker.RangePicker
            allowClear={false}
            value={rangeValue}
            showTime
            // onChange={e => {
            //   setState({ startDate: e[0], endDate: e[1] }, () => reRender());
            // }}
            onChange={(e) => {
              changeDatePickerValues(e[0], e[1]);
              reRender();
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => reRender()}>
            Regenerate
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={zoomIn}>Zoom in</Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={zoomOut}>Zoom out</Button>
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={toggleSelectable} checked={selectable}>
            Enable selecting
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={toggleDraggable} checked={draggable}>
            Enable dragging
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={toggleResizable} checked={resizeable}>
            Enable resizing
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => dateTimeMoveBack(rangeValue)}>{`<`}</Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => dateTimeMoveForward(rangeValue)}>{`>`}</Button>
        </Form.Item>
      </Form>
      <div style={{ width: "max-content", overflow: "visible" }}>
        <span>Debug: </span>
        {message}
      </div>
    </div>
  );
};

export default ActionsTab;
