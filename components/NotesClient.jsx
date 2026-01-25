"use client"
import React, { useState } from 'react'

const NotesClient = ({initialNotes}) => {
    const [notes, setNotes] = useState(initialNotes);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const createNote = async(e) => {
        e.preventDefault();
        if(!title.trim() || !content.trim()) return;
        setLoading(true);

        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body:JSON.stringify({title, content})
            });

            const result = await response.json();
            //console.log(result);
            if(result.success){
                setNotes([result.data, ...notes]);
                setTitle("");
                setContent("");
            }
            setLoading(false);

        } catch (error) {
            console.error("Error creating error", error);
        }
    }
    return (
        <div className="space-y-6">
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={createNote}>
                <h2 className="text-xl font-semibold">Create new Note</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />

                    <textarea
                        placeholder="Note Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                    >
                        {loading ? "Creating..." : "Create Note"}
                    </button>
                </div>
            </form>

            <div className='space-y-4 '>
                <h2 className='text-xl font-semibold'>Your notes ({notes.length})</h2>
                {
                    notes.length === 0 ? (<p>No Notes yet, Create your first Notes</p>): (
                        notes.map((note) => (
                            <div key={note._id} className='shadow-md rounded-lg'>
                                <div className='flex justify-between items-start mb-2'>
                                    <h3>{note.title}</h3>
                                    <div className='flex gap-2'>
                                        <button className='text-blue-200 hover:text-blue-600 text-sm'>
                                            Edit
                                        </button>

                                        <button className='text-red-300 hover:text-red-400 text-sm'>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className='text-gray-400 mb-2'>{note.content}</p>
                            </div>
                        ))
                    )
                }
            </div>
        </div>

    )
}

export default NotesClient
