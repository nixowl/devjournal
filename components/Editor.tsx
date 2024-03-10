'use client';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';

type editorProps = {
  entry: {
    id: string;
    content: string;
    analysis: {
      title: string;
      summary: string;
      topic: string;
      color: string;
    };
  };
};

const Editor = ({ entry }: editorProps) => {
  const [content, setContent] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { title, summary, topic, color } = analysis || entry.analysis;

  const analysisData = [
    { name: 'Topics', value: topic },
    { name: 'Summary', value: summary },
  ];

  useAutosave({
    data: content,
    onSave: async (_content) => {
      if (_content === entry.content) return;
      setIsLoading(true);
      const data = await updateEntry(entry.id, _content);
      setAnalysis(data.analysis);
      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>...loading</div>}
        <textarea
          className="w-full h-full p-8 text-xl"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="border-l border-gray/35">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">{title}</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between px-4 py-2 border-b border-gray/35"
              >
                <span className="text-md font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;
