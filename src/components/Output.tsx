import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
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
    typewriter?: boolean;
    typeInterval?: number;
    toggleTypewriting?: (value: boolean) => void;
    isTypewriting?: boolean;
    colors?: Partial<TerminalColors>
}

const Print = ( { output, typewriter=false, toggleTypewriting, isTypewriting, typeInterval=40, flashing=false, colors, ...rest }: PrintProps & React.HTMLAttributes<HTMLDivElement>) => {

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
            const id = setInterval (type, typeInterval);
            if(!text) {
                clearInterval(id);
                resolve(true);
            }
        })
    }, [typeInterval])

    useEffect( () => {
        const typewrite = async (children:HTMLCollection, actual: string | string[]) => {
            const text: string[] = [];
            for (let i = 0; i < children.length; i++) {
                text.push(children[i].children[0].textContent ?? '');
                children[i].children[0].textContent = '';
            }
            for (let j = 0; j < children.length; j++) {
                const el = children[j].children[0];
                await handleTypewrite(text[j], el).then();
                if (j === children.length -1 && _.isEqual(output, actual) && isTypewriting) {
                    toggleTypewriting && toggleTypewriting(false);
                    setLastOutput([]);
                }
            }
        }

        if (divRef.current && _.isEqual(output, lastOutput) && output.length > 0 && typewriter) {
            const children = divRef.current.children;
            typewrite(children, output)
        }
    },[lastOutput, handleTypewrite, isTypewriting, output, toggleTypewriting, typewriter]);

    useEffect(() => {
        if (!_.isEqual(output, lastOutput) && output.length > 0) {
            setLastOutput(output)
        }
    }, [output, lastOutput])

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

Output.Print = Print;

export default Output;