'use client'
import OpenAI from 'openai'
import React, { useEffect, useState } from 'react'

const Container = () => {

    const [input, setInput] = useState('')
    const [output, setOutput] = useState('Hola!!')
    const [language, setLanguage] = useState('spanish')
    const [pending, setPending] = useState(false)
    const api_key = 'hahahaahahah'

    const messages = [
        {
            role: 'system',
            content: 'I want you to translate the input you get directly to spanish'
        },
        {
            role: 'user',
            content: { input }
        },
    ]


    const handleTranslate = async () => {
        setPending(true)
        const client = new OpenAI({
            dangerouslyAllowBrowser: true,
            apiKey: api_key
        })

        try {
            const response = await client.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `I want you to translate the input you get directly to ${language}`
                    },
                    {
                        role: 'user',
                        content: input
                    },
                ],
                temperature: 1
            })
            setOutput(response.choices[0].message.content)
        } catch (err) {
            console.log(err)
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
                <option value="how kanye west would say this sentence">Kanye West</option>
            </select>
            <div className="w-1/5 mx-auto" onClick={() => console.log(language)}>
                <h3 className="bg-white text-black p-2 mt-4 text-center">{output}</h3>
            </div>
        </div>
    )
}

export default Container