import { getCurrentUser } from '@/features/user/actions/user'

export default async function DashboardPage() {
    //  let user = null
    // try {
    //     // Attempt to get the user
    //     user = await getCurrentUser(true)
    // } catch (error) {
    //     // If getCurrentUser throws 'UNAUTHORIZED', we just set user to null
    //     // This allows the Login page to render instead of crashing the app
    //     console.log('No active session found (User is logged out)')
    // }

    return (
        <div>
            <h1>Dashbaord 11</h1>
            <h3>Debug User Output:</h3>
            {/* <pre>
                {user ? JSON.stringify(user, null, 2) : 'User is NULL (Logged Out)'}
            </pre> */}
        </div>
    )
}
