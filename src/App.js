import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import Dashboard from './component/Dashboard/Dashboard';
import Header from './component/Layout/Header';
import Welcome from './component/Layout/Welcome';
import LayoutOld from './component/Layout/LayoutOld';

export default function App() {
	const { isAuthenticated } = useMoralis(); 

	return (
		<div className="App">
			 <Router>
				<Header />
				<Routes>
					<Route path="/" element={!isAuthenticated ? <Dashboard /> : <Welcome />} />
					<Route path="layoutold" element={<LayoutOld />} />
				
				</Routes>
			</Router>
		</div>
	);
}
