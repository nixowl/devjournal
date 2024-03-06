'use client';

import { useState } from "react";

// TODO: ts error

const Editor = ({ entry }) => {
    const [content, setContent] = useState(entry.content)

    return <div className='w-full h-full'>
        <textarea className='w-full h-full p-8 text-xl' value={content} onChange={(e) => setContent(e.target.value)} />
  </div>;
};

export default Editor;
