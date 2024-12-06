'use client'
import React, { useEffect, useState } from 'react'

const Container = () => {

    const [input, setInput] = useState('')
    const [output, setOutput] = useState('Hola!!')
    const [language, setLanguage] = useState('spanish')
    const [pending, setPending] = useState(false)




    const handleTranslate = async () => {
        setPending(true)

        const messages = [
            {
                role: 'system',
                content: `I want you to translate the input you get directly to ${language}`
            },
            {
                role: 'user',
                content: input
            },
        ]

        try {
            console.log('Hallo?')
            const response = await fetch('https://twilight-firefly-43fe.frojak4.workers.dev/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(messages)
            })
            const message = await response.json()
            console.log(message)
            setOutput(message)
        } catch (err) {
            const error = await err.json()
            setOutput(error)
        }

        setPending(false)
    }

    return (
        <div className="bg-emerald-500 p-4 rounded-xl w-3/5 mx-auto mt-8 flex flex-col items-center">
            <span className="flex flex-col mx-auto items-center">
                <input type="text" className="text-black p-2" value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={handleTranslate} disabled={pending} className="bg-orange-600 disabled:bg-orange-700 p-2 rounded-full mt-2">Translate</button>
            </span>
            <select name="languages" className="text-black text-center my-4" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="norwegian">Norwegian</option>
                <option value="english">English</option>
                <option value="german">German</option>
                <option value="how a sophisticated english man would say it">Fancy English</option>
                <option value="how kanye west would say this sentence">Kanye West</option>
            </select>
            <div className="w-1/5 mx-auto">
                <h3 className="bg-white text-black p-2 mt-4 text-center">{output}</h3>
            </div>
        </div>
    )
}

export default Container