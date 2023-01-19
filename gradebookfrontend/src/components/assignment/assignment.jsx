export function Assignment(props) {
    return (
        <div>
            <h2>{ props.assignmentname }</h2>
            <h3>Status: { props.status }</h3>
            <h3>Grade: { props.grade }</h3>
        </div>
    );
  }