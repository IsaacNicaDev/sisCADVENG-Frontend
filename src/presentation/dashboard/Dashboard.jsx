import './App.css'
import Sidebar from './modules/components/Sidebar';

export default function Dashboard() {
    return (
        <div className='App' >
            <div className='AppGlass'>
                <Sidebar />
            </div>
        </div>
    )
}