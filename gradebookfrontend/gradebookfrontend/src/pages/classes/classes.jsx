import React, { useEffect, useState } from 'react';
import { ClassLi } from '../../components/classli/classli';
import { useParams } from 'react-router-dom';

export function Classes(){
    const { classId: classIds } = useParams();
    const { user_type } = useParams();
    const { username } = useParams();
    const { studentname } = useParams();
    let [classes, setClasses] = useState([]);

    async function fetchUserClasses(){
        let ids = classIds.split(',');
        let classData = [];
        for(let i = 0; i < ids.length; i++){
            classData.push(await fetchClassData(ids[i]));
        }

        setClasses(classData);
    }
    
    async function fetchClassData(id){
        const response = await fetch(`http://127.0.0.1:8000/getclass/?class_id=${ id }`);

        const json = await response.json();
        
        return json.data;
    }
    
    useEffect(() => {
        fetchUserClasses();
    }, []);
    
    return(
        <div>
            <h2>Welcome { studentname }! You're a { user_type }!</h2>
            <ul>
                {
                    classes.map(classData => <ClassLi key={ classData.id } user_type={ user_type } studentname={ studentname } username={ username } classname={ classData.class_name } teacher_name={ classData.teacher_name } grade={ classData.grade } class_id={ classData.id }/>)
                }
            </ul>
        </div>
    );
}