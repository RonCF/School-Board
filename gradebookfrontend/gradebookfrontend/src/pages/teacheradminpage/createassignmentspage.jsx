import { EditAssignment } from '../../components/editableassignment/editassignment';
import { useParams } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';

export function Admin() {
    const { classname } = useParams();
    const { class_id } = useParams();
    const studentName = useRef();
    let assignmentName = useRef();
    let assignmentStatus = useRef();
    let grade = useRef();
    let [assignments, setAssignments] = useState([]);
    let [studentNames, setNames] = useState([]);
    let [currentName, setCurrentName] = useState("");

    async function createAssignment(e){
        e.preventDefault();

        if(currentName !== ""){
            const response = await fetch('http://127.0.0.1:8000/addassignment/', { 
                method: 'POST',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({ 
                    assignment_name: assignmentName.current.value,
                    student_name: currentName,
                    class_name: classname,
                    assignment_status: assignmentStatus.current.value,
                    grade: grade.current.value
                })
            });
    
            const json = await response.json();
    
            alert(json.message);
    
            if(json.message === 'Assignment Added!'){
                window.location.reload();
            }
        }
        else{
            alert("No Student Selected!");
        }
    }

    async function getStudentsFromClassName(){
        let names = [];

        const response = await fetch('http://127.0.0.1:8000/getstudents/?' + new URLSearchParams({
            class_id: class_id,
        }));
        
        const json = await response.json();

        for(let i = 0; i < json.data.length; i++){
            let name = json.data[i].name + " " + json.data[i].last_name;
            names.push(name);
        }
        setNames(names);
    }
    
    async function fetchAssignments(){
        const response = await fetch('http://127.0.0.1:8000/getassignments/?' + new URLSearchParams({
            classname: classname,
            studentname: studentName.current.value
        }));

        const json = await response.json();
        
        let assignmentList = [];
        
        if(json.data.length !== 0) {
            json.data.map((data) => {
                assignmentList.push(data);
            });
        }

        setAssignments(assignmentList);
        setCurrentName(studentName.current.value);
    }

    useEffect(() => {
        getStudentsFromClassName();
    }, []);

    return (
        <div>
            <h1>{ classname } Class</h1>
            <select ref={ studentName }>
                {studentNames.map(name => <option key={ name }>{ name }</option>)}
            </select>
            <button onClick={ fetchAssignments }>Get Assignments</button>

            <div>
                {
                    assignments.map(assignment => <EditAssignment 
                        key={ assignment.id } 
                        assignmentname={ assignment.assignment_name } 
                        studentname={ currentName } 
                        classname={ classname }
                        status={ assignment.assignment_status } 
                        grade={ assignment.grade }
                        />
                        )
                    }
                        <div>
                        </div>
            </div>

            <form onSubmit={ createAssignment }>
                <h2>Add Assignments For { currentName }</h2>
                <input placeholder="Enter Assignment Name..." ref={ assignmentName } required/>
                <input placeholder="Enter Assignment Status..." ref={ assignmentStatus }/>
                <input placeholder="Enter Grade..." ref={ grade } required/>
                <button type="submit">Create</button>
            </form>
        </div>
    );
  }