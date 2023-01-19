import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Assignment } from '../../components/assignment/assignment';

export function AssignmentPage() {
    const { studentname } = useParams();
    const { classname } = useParams();
    let [assignments, setAssignments] = useState([]);

    async function fetchAssignments(){
        const response = await fetch('http://127.0.0.1:8000/getassignments/?' + new URLSearchParams({
            classname: classname,
            studentname: studentname
        }));

        const json = await response.json();

        let assignmentList = [];
        
        if(json.data.length !== 0) {
            json.data.map(data => {
                assignmentList.push(data);
            });
            
            
        }
        setAssignments(assignmentList);
    }

    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div>
            <h1>Assignments for { studentname } in { classname } class.</h1>
                {
                    assignments.map(assignment => <Assignment 
                        key={ assignment.id } 
                        assignmentname={ assignment.assignment_name } 
                        status={ assignment.assignment_status } 
                        grade={ assignment.grade }/>
                    )
                }
        </div>
    );
  }