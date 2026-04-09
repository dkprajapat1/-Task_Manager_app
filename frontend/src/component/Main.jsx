import React, { useEffect, useState } from 'react'

const Main = () => {
    const [title, settitle] = useState("")
    const [date, setdate] = useState("")
    const [data, setdata] = useState(
        [{ title: "", date: "", mark: false, _id: null }]
    )

    const handle = (e) => {
        settitle(e.target.value)
    }
    const handle1 = (e) => {
        setdate(e.target.value)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await fetch('http://localhost:3000/');
                let data = await res.json();
                setdata(data);
            } catch (error) {
                console.log(error.message)
            }
        };

        fetchData();
    }, [])

    //add data to backend
    const btnclick = async () => {
        if (title == "" || title == null) {
            alert("Please enter a valid title")
        }
        else if (date == "" || date == null) {
            alert("Please enter a valid date")
        }
        else {
            await fetch("http://localhost:3000/task", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },  // data JSON hai
                body: JSON.stringify({ title: title, date: date, mark: false }) // data jo bhejna hai
            });
            let res = await fetch('http://localhost:3000/');
            let data = await res.json();
            setdata(data);
        }
    }

    return (
        <>
            <div className='bg-blue-200 p-5 w-[80%] m-auto mt-3 flex justify-around'>

                <input className='bg-white w-[40%] p-3 rounded' type="text" value={title} onChange={handle} placeholder='Enter a task...' />
                <input className='bg-white p-3 rounded' type="date" value={date} onChange={handle1} />
                <button className='bg-blue-500 px-5 py-2 rounded-2xl cursor-pointer' onClick={btnclick}>Add</button>
            </div>
            <div className='border w-[80vw] min-h-[70vh] bg-blue-300 m-auto mt-[2vh] p-5 rounded-2xl'>

                {data.map((item, index) => (
                    <div key={index} className="bg-white p-3 mb-2 rounded shadow flex justify-between">

                        <div>
                            <h2 className="font-bold">{item.title}</h2>
                            <p>{item.date}</p>
                        </div>

                        <div >
                            <input type="checkbox" checked={item.mark} onChange={
                                async () => {
                                    await fetch(`http://localhost:3000/edit_task/${item._id}`, {
                                        method: 'PATCH',
                                        headers: { "Content-Type": "application/json" },  // data JSON hai
                                        body: JSON.stringify({ mark: !item.mark }) // data jo bhejna hai
                                    });
                                    let res = await fetch('http://localhost:3000/');
                                    let data = await res.json();
                                    setdata(data);

                                }
                            } />

                            <button className='bg-red-500 border cursor-pointer px-2 rounded-2xl m-2 text-white ' onClick={async () => {
                                await fetch(`http://localhost:3000/delete/${item._id}`,
                                    { method: "DELETE" });
                                  setdata(prev => prev.filter(t => t._id !== item._id));
                            }

                            }>Delete</button>

                        </div>

                    </div>
                ))}


            </div>
        </>
    )
}

export default Main
