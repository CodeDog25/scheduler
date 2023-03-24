import React from 'react';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  
  const interviewerClass = selected ? "interviewers__item--selected" : "";
  
  return (
    <li className={`interviewers__item ${interviewerClass}`} onClick={() => setInterviewer(id)}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}