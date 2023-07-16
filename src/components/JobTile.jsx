export default function JobTile({
  id,
  completionStatus,
  task,
  handleCompletion,
  handleOnDeletion,
  theme,
}) {
  return (
    <div
      className="job-tile"
      style={{ backgroundColor: theme ? "" : "hsl(236, 33%, 92%)" }}
    >
      <button
        className={completionStatus ? "completion" : "unfinished"}
        onClick={() => handleCompletion(id)}
      >
        {completionStatus && <img src="./images/icon-check.svg" />}
      </button>
      <p
        className="tasks"
        style={{
          textDecoration: completionStatus ? "line-through" : "",
          color: theme
            ? completionStatus
              ? "hsl(234, 11%, 52%)"
              : "hsl(236, 33%, 92%)"
            : completionStatus
            ? "hsl(236, 9%, 61%)"
            : "hsl(235, 19%, 35%)",
        }}
      >
        {task}
      </p>
      <button className="deletion" onClick={() => handleOnDeletion(id)}>
        <img src="./images/icon-cross.svg" />
      </button>
    </div>
  );
}
