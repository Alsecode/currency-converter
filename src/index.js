import ReactDOM from 'react-dom/client';
import init from './init';

const app = async () => {
  const vdom = await init();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(vdom);
};

app();
