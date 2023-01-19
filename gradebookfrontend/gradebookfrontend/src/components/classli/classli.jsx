export function ClassLi(props) {
    let link = "";

    if(props.user_type === "Student"){
        link = `http://localhost:3000/assignments/${props.studentname}/${props.classname}`;
    }
    else{
        link = "http://localhost:3000/admin/" + props.classname + "/" + props.class_id;
    }

    return (
        <div>
            <div>
                <a href={ link }>{ props.classname }</a>
                <p>{ props.teacher_name }</p>
            </div>
            <div className="gradeDiv">
                <h1>{ props.grade }</h1>
            </div>
        </div>
    );
  }