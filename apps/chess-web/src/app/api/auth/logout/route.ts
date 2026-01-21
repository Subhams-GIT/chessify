import { ProjectError } from "@/Components/messages/Error";
import { authClient } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await authClient.signOut({
        });

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Sign out failed:", error);

        return NextResponse.json(
            new ProjectError({
                name: "SIGNOUT_ERROR",
                message: "Cannot sign out",
                cause: error,
            }),
            { status: 500 }
        );
    }
}
