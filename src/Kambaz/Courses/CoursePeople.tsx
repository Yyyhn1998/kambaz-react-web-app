import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PeopleTable from "./People/Table";
import * as client from "./client";

export default function CoursePeople() {
    const { cid } = useParams();
    // eslint-disable-next-line
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        if (cid) {
            const response = await client.findUsersForCourse(cid);
            setUsers(response);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [cid]);

    return <PeopleTable users={users} />;
}
