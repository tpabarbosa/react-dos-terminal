import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { OutputTypewriter, UseOutputHandler } from "../hooks/useOutputHandler";
import { OutputContainer, OutputContent, PrintContainer, PrintContent, PrintLine } from "../styles/styles";
import { TerminalColors } from "./Terminal";

interface OutputProps {
    children: React.ReactNode;
    colors?: Partial<TerminalColors>;
}

const Output = ({children, colors, ...rest}: OutputProps & React.HTMLAttributes<HTMLDivElement>) => {

    return (
        <OutputContainer colors={colors} {...rest}>
            <OutputContent >
                {children}
            </OutputContent>
        </OutputContainer>
    )
}

interface PrintProps {
    output: string | string[];
    flashing?: boolean;
    colors?: Partial<TerminalColors>
}

const Print = ( { output, flashing=false, colors, ...rest }: PrintProps & React.HTMLAttributes<HTMLDivElement>) => {

    const divRef = useRef<HTMLDivElement | null>(null)
    
    return (
        <PrintContainer {...rest} colors={colors} flashing={flashing} ref={divRef}>
        { typeof output === 'object' && output.length > 0 && 
            output.map((line, index) => {
                return (
                <PrintContent key={`${index}|${line}`} >
                    { line !== '' ? <PrintLine dangerouslySetInnerHTML={{__html: line}}></PrintLine> : <br />}
                </PrintContent>
                )
            })
        }
        { typeof output === 'string' && output.length > 0 && 
                <PrintContent >
                    { output !== '' ? <PrintLine dangerouslySetInnerHTML={{__html: output}}></PrintLine> : <br />}
                </PrintContent>
        }
        </PrintContainer>
    )
}

interface PrintWithTypewriterProps {
    output: string | string[];
    flashing?: boolean;
    typewriter: OutputTypewriter;
    colors?: Partial<TerminalColors>
}

const PrintWithTypewriter = ( { output, typewriter, flashing=false, colors, ...rest }: PrintWithTypewriterProps & React.HTMLAttributes<HTMLDivElement>) => {

    const divRef = useRef<HTMLDivElement | null>(null)
    const [lastOutput, setLastOutput] = useState<string|string[]>([]);

    const handleTypewrite = useCallback(async ( text: string, el: any) => {
        
        return await new Promise((resolve) => {
            
            const word = text ? text.split('') : [];
            
            const type = () => {
                if (word.length > 0) {
                    if (el.textContent) {
                        el.textContent += word.shift() ?? '';
                    } else {
                        el.textContent = word.shift() ?? '';
                    }
                }
                if (word.length===0) {
                    clearInterval(id);
                    resolve(true);
                }
            }

            const id = setInterval (type, typewriter.typeInterval);
            if(!text) {
                clearInterval(id);
                resolve(true);
            }
        })
    }, [typewriter])

    useEffect( () => {
        const typewrite = async (children:HTMLCollection) => {
            const text: string[] = [];
            for (let i = 0; i < children.length; i++) {
                text.push(children[i].children[0].textContent ?? '');
                children[i].children[0].textContent = '';
            }
            for (let j = 0; j < children.length; j++) {
                const el = children[j].children[0];
                await handleTypewrite(text[j], el).then();
                if ((j === children.length -1) && typewriter.isTypewriting) {
                    typewriter.endTypewriting();
                }
            }
        }

        if (divRef.current && typewriter.isTypewriting && !_.isEqual(output, lastOutput) && output.length > 0 ) {
            const children = divRef.current.children;
            typewrite(children)
            setLastOutput(output)
        }

        if (!typewriter.isTypewriting && lastOutput.length !== 0) {
            setLastOutput([])
        }
        
    },[lastOutput, handleTypewrite, typewriter.isTypewriting, output, divRef]);


    return (
        <PrintContainer {...rest} colors={colors} flashing={flashing} ref={divRef}>
        { typeof output === 'object' && output.length > 0 && 
            output.map((line, index) => {
                return (
                <PrintContent key={`${index}|${line}`} >
                    { line !== '' ? <PrintLine dangerouslySetInnerHTML={{__html: line}}></PrintLine> : <br />}
                </PrintContent>
                )
            })
        }
        { typeof output === 'string' && output.length > 0 && 
                <PrintContent >
                    { output !== '' ? <PrintLine dangerouslySetInnerHTML={{__html: output}}></PrintLine> : <br />}
                </PrintContent>
        }
        </PrintContainer>
    )
}

interface TypewriterProps {
    output: UseOutputHandler,
    flashing?: boolean;
    colors?: Partial<TerminalColors>
}

const Typewriter = ({output, flashing=false, colors, ...rest}: TypewriterProps) => {

    return (
        <>
        <Output.Print 
            output={output.outputHistory} 
            {...rest} 
            colors={colors} 
            flashing={flashing}
        />
        <PrintWithTypewriter 
            typewriter={output.typewriter} 
            output={output.lastOutput}
            {...rest} 
            colors={colors} 
            flashing={flashing} 
        />
        </>
    )
}

Output.Typewriter = Typewriter;
Output.Print = Print;

export default Output;