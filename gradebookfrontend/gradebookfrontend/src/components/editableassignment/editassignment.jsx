export function EditAssignment(props) {
    let status = props.status;
    if(props.status === ""){
        status = " ";
    }
    return (
        <div>
            <h2>{ props.assignmentname }</h2>
            <h3>Status: { props.status }</h3>
            <h3>Grade: { props.grade }</h3>
            <a href={`http://localhost:3000/edit/${ props.assignmentname }/${ props.studentname }/${ props.classname }/${ status }/${ props.grade }`}>Edit</a>
        </div>
    );
  }