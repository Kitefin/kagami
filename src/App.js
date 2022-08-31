import './styles.css';
import { useMoralis } from 'react-moralis';
import Dashboard from './component/Dashboard/Dashboard';
import Header from './component/Layout/Header';
import Layout from './component/Layout/Layout';

export default function App() {
	const { isAuthenticated } = useMoralis();

	return (
		<div className="App">
			<Header />
			{!isAuthenticated ? <Dashboard /> : <Layout />}
		</div>
	);
}
