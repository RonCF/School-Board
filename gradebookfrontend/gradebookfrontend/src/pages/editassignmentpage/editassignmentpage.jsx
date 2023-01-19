import { useParams } from 'react-router-dom';
import React, { useRef } from 'react';

export function EditAssignmentPage() {
    const { classname } = useParams();
    const { studentname } = useParams();
    const { assignmentname } = useParams();
    const { currentGrade } = useParams();
    const { currentStatus } = useParams("None");
    let assignmentStatus = useRef();
    let grade = useRef();

    async function editAssignment(){
            const response = await fetch('http://127.0.0.1:8000/editassignment/', { 
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({ 
                    assignment_name: assignmentname,
                    student_name: studentname,
                    class_name: classname,
                    assignment_status: assignmentStatus.current.value,
                    grade: grade.current.value
                })
            });
    
            const json = await response.json();
    
            alert(json.message);

            window.history.back()
        }
    return (
        <div>
            <h1>Edit Assignment</h1>

            <div>
                <h1>{ assignmentname } in { classname } Class</h1>
                <h2>Assignment for: { studentname }</h2>
                <h2>Current Status: { currentStatus }</h2>
                <h2>Current Grade: { currentGrade }</h2>
                <input placeholder="Enter Assignment Status..." ref={ assignmentStatus }/>
                <input placeholder="Enter Grade..." ref={ grade } required/>
                <button onClick={ editAssignment }>Update</button>
            </div>
        </div>
    );
  }