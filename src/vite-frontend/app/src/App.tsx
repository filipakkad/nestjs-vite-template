import { memo, Suspense, use, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const fetchMessage = async () => {
  const res = await fetch('/api/hello');
  return res.json() as Promise<{ message: string }>;
};

const HelloFromApi = (
  { messagePromise }: { messagePromise: Promise<{ message: string }>})=> {
  const { message } = use(messagePromise)
  return <p>{message}</p>;
}

const ApiMessage = memo(() => {
  const messagePromise = fetchMessage();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <HelloFromApi messagePromise={messagePromise} />
    </Suspense>
  );
});

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <ApiMessage />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
