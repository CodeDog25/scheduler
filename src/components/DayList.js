import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const { days, day, setDay } = props;

  const dayListItems = days.map((dayObj) => (
    <DayListItem
      key={dayObj.id}
      name={dayObj.name}
      spots={dayObj.spots}
      selected={dayObj.name === day}
      setDay={() => setDay(dayObj.name)}
    />
  ));
  
  return (
    <ul>
      {dayListItems}
    </ul>
  );
}