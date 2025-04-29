import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div>
      <div>
        <button onClick={() => navigate('/signin')}>Go to Sign In</button>
      </div>
      <Sidebar/>
    </div>
  );
}