import Dashboard from './Dashboard'
import Order from './Order'
import Report from './Report'
import User from './User'
import Logout from './Logout'

function GetIcon({ icon }) {
    const icons = new Map();

    icons.set("Dashboard", <Dashboard />)
    icons.set("Job Orders", <Order />)
    icons.set("Reports", <Report />)
    icons.set("Users", <User />)
    icons.set("Logout", <Logout />)

    return icons.get(icon)
}

export default GetIcon