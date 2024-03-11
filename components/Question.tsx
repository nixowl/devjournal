'use client';

import { FormEventHandler, useState } from 'react';
import { Button } from './ui/button';
import { askQuestion } from '@/utils/api';

//TODO: fix type

const Question = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const onChange = (e: any) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    console.log('handle submit....');
    e.preventDefault();
    setLoading(true);

    console.log('calling ask question')
    const answer = await askQuestion(question);
    console.log('askQuestion response: ', answer)
    setAnswer(answer);
    setQuestion('');
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          onChange={onChange}
          value={question}
          type="text"
          placeholder="ask a question"
          className="border border-black/20 p-2 text-lg rounded-lg"
        />
        <Button type="submit" disabled={loading}>
          Ask Question
        </Button>
      </form>
      {loading && <div>...loading</div>}
      {answer && <div>{answer}</div>}
    </div>
  );
};

export default Question;
