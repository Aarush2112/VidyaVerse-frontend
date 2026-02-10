import React from "react";
import { getUsers } from "@/app/actions/admin";
import { UserTable } from "@/components/admin/users/UserTable";

export default async function UserManagementPage() {
    const users = await getUsers();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Directory</h1>
                <p className="text-slate-500">Manage students, teachers, and administrators.</p>
            </div>

            <UserTable data={users} />
        </div>
    );
}
