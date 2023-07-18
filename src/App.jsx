import viteLogo from '/vite.svg';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { apiCall } from './utils/axios.js';

function App() {
  const [count, setCount] = useState(0);
  const [postId, setPostId] = useState(0);
  const [isAppReadyToSendNewPost, setIsAppReadyToSenNewPost] = useState(false);

  async function requestPostNewContent() {
    return await apiCall.post('/posts', {
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
    });
  }

  async function requestPostNewerContent() {
    return await apiCall.post('/posts', {
      body: JSON.stringify({
        title: 'spam',
        body: 'ham',
        userId: 2,
      }),
    });
  }

  const mutatePostNewContent = useMutation(
    ['postNewContent'],
    () => requestPostNewContent().then((res) => {
      setPostId(res.data.id);
      console.log(res.data)
      setIsAppReadyToSenNewPost(true);
    }),
    {
      onError: (err) => console.log(err),
    }
  )

  const mutatePostNewerContent = useMutation(
    ['postNewerContent'],
    () => requestPostNewerContent(),
    {
      onSuccess: (res) => console.log(res.data),
      onError: (err) => console.log(err),
    }
  )

  useEffect(() => {
    console.log(`isAppReadyToSendNewPost: ${isAppReadyToSendNewPost}`)
    if(isAppReadyToSendNewPost === true){
      mutatePostNewerContent.mutate()
    }
  },[isAppReadyToSendNewPost])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <button onClick={() => mutatePostNewContent.mutate()}>
        Send new request
      </button>
    </>
  );
}

export default App;
