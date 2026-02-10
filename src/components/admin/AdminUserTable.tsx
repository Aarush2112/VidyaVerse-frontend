"use client"

import { useState } from "react"
import { updateUserRole } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Role } from "@prisma/client"

export function AdminUserTable({ initialUsers }: { initialUsers: any[] }) {
    const [users, setUsers] = useState(initialUsers)
    const [loading, setLoading] = useState<string | null>(null)

    const handleRoleUpdate = async (userId: string, newRole: Role) => {
        setLoading(userId)
        try {
            await updateUserRole(userId, newRole)
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
            toast.success(`User role updated to ${newRole}`)
        } catch (error) {
            toast.error("Failed to update role")
        } finally {
            setLoading(null)
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="border-slate-800 hover:bg-transparent">
                    <TableHead className="text-slate-400 font-mono">User</TableHead>
                    <TableHead className="text-slate-400 font-mono">Email</TableHead>
                    <TableHead className="text-slate-400 font-mono">Role</TableHead>
                    <TableHead className="text-slate-400 font-mono text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id} className="border-slate-800 hover:bg-slate-800/50 transition-colors">
                        <TableCell className="font-medium text-white font-mono">
                            {user.name || "Unknown"}
                        </TableCell>
                        <TableCell className="text-slate-400">{user.email}</TableCell>
                        <TableCell>
                            <RoleBadge role={user.role} />
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                            {user.role !== "ADMIN" && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-green-800/50 text-green-500 hover:bg-green-950 hover:text-green-400 hover:border-green-700 bg-transparent"
                                    disabled={loading === user.id}
                                    onClick={() => handleRoleUpdate(user.id, "ADMIN")}
                                >
                                    Make Admin
                                </Button>
                            )}
                            {user.role !== "TEACHER" && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-blue-800/50 text-blue-500 hover:bg-blue-950 hover:text-blue-400 hover:border-blue-700 bg-transparent"
                                    disabled={loading === user.id}
                                    onClick={() => handleRoleUpdate(user.id, "TEACHER")}
                                >
                                    Make Teacher
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function RoleBadge({ role }: { role: string }) {
    const styles = {
        ADMIN: "bg-red-950/30 text-red-500 border-red-900",
        TEACHER: "bg-blue-950/30 text-blue-500 border-blue-900",
        STUDENT: "bg-slate-800 text-slate-400 border-slate-700"
    }

    return (
        // @ts-ignore
        <Badge variant="outline" className={styles[role] || styles.STUDENT}>
            {role}
        </Badge>
    )
}
