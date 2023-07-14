export default function JobTile({
  completionStatus,
  task,
  handleCompletion,
  handleOnDeletion,
}) {
  return (
    <div className="job-tile">
      <button
        className={completionStatus ? "completion" : "unfinished"}
        onClick={handleCompletion}
      >
        {completionStatus && <img src="./images/icon-check.svg" />}
      </button>
      <p
        className="tasks"
        style={{
          textDecoration: completionStatus ? "line-through" : "",
          color: completionStatus ? "hsl(234, 11%, 52%)" : "hsl(236, 33%, 92%)",
        }}
      >
        {task}
      </p>
      <button className="deletion" onClick={handleOnDeletion}>
        <img src="./images/icon-cross.svg" />
      </button>
    </div>
  );
}
