import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div>
      <button onClick={() => navigate('/signin')}>Go to Sign In</button>
    </div>
  );
}